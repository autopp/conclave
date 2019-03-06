import React, { Component } from 'react';
import './App.css';
import { kingdomList, nameMap } from './cardList.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kingdom: { basic: 5, nocturne: 5 }, supplies: [], errors: []
    };
  }

  onChangeKingdom = (name) => {
    return e => {
      let kingdom = Object.assign({}, this.state.kingdom);
      let n = parseInt(e.target.value, 10);
      kingdom[name] = parseInt(e.target.value, 10);
      let other = name === 'basic' ? 'nocturne' : 'base';
      kingdom[other] = 10 - n;
      this.setState({ kingdom: kingdom });
    };
  }

  onGenerate = _ => {
    // validate state
    // let errors = this.validateForGenerate();
    // if (errors.length !== 0) {
    //   this.setState({ errors: errors });
    //   return;
    // }

    this.state.supplies.push(this.selectSupply())

    this.setState({ supplies: this.state.supplies, errors : []});
  }

  validateForGenerate() {
    let errors = [];
    let kingdom = this.state.kingdom;
    let numberOfSupplies = this.state.numberOfSupplies;

    if (Object.values(kingdom).reduce((acc, x) => acc + x) !== 10) {
      errors.push("王国カードの数が10ではありません");
    }

    Object.entries(kingdom).forEach(kv => {
      let [name, num] = kv;

      if (num * numberOfSupplies > kingdomList[name].length) {
        errors.push(`${nameMap[name]}のカード枚数が足りません`)
      }
    })

    return errors;
  }

  selectSupply() {
    let kingdom = { };

    let restCards = this.restCards();
    Object.entries(restCards).forEach(([expansion, cards]) => {
      kingdom[expansion] = this.shuffleArray(cards).slice(0, this.state.kingdom[expansion]);
    });

    return { kingdom: kingdom };
  }

  shuffleArray(ary) {
    let copied = ary.slice();
    for (let i = copied.length - 1; i>= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    return copied;
  }

  restCards() {
    let rest = {};
    Object.entries(kingdomList).forEach(([expansion, cards]) => {
      let usedCards = [].concat(...this.state.supplies.map((supply) => supply.kingdom[expansion]));
      rest[expansion] = cards.filter((card) => {
        return !usedCards.some((usedCard) => usedCard.name === card.name)
      });
    });
    return rest
  }

  render() {
    let errors = '';
    if (this.state.errors.length !== 0) {
      let messages = this.state.errors.map((error, i) => <div key={i}>{error}</div>)
      errors = <div className="alert alert-danger">
        {messages}
      </div>;
    }
    let supplies = this.state.supplies.map((supply, i) => {
      let kingdom = Object.keys(supply.kingdom).map(ex => `${nameMap[ex]} : ${supply.kingdom[ex].map(card => card.name).join(' ')}`).map((cards, i) => <div key={i}>{cards}</div>);

      return (
        <div className="panel panel-default" key={i}>
          <div className="panel-body">
            <div>{kingdom}</div>
          </div>
        </div>
      )
    })
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1>Conclave</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h2>王国カード</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div>基本:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.basic} min="0" max="10" step="1" onChange={this.onChangeKingdom("basic")} />
          </div>
          <div className="col-lg-2">
            <div>夜想曲:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.kingdom.nocturne} min="0" max="10" step="1" onChange={this.onChangeKingdom("nocturne")} />
          </div>
          <div className="col-lg-2">
            <button type="button" className="btn btn-info btn" onClick={this.onGenerate}>生成</button>
          </div>
        </div>
        <div className="row" id="errors">
          <div className="col-lg-12">
            {errors}
          </div>
        </div>
        <div className="row" id="supplies">
          <div className="col-lg-12">
            {supplies}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
