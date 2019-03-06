import React, { Component } from 'react';
import './App.css';
import { kingdomList, nameMap } from './cardList.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kingdom: { basic: 0, nocturne: 0 }, supplies: [], errors: []
    };
  }

  onChangeKingdom = (name) => {
    return e => {
      let kingdom = Object.assign({}, this.state.kingdom);
      kingdom[name] = parseInt(e.target.value, 10);
      this.setState({ kingdom: kingdom });
    };
  }

  onGenerate = _ => {
    // validate state
    let errors = this.validateForGenerate();
    if (errors.length !== 0) {
      this.setState({ errors: errors });
      return;
    }

    let supplies = null;
    let maxTry = 100;

    for (let i = 0; i < maxTry; i++) {
      supplies = this.selectSupply();
      if (supplies !== null) {
        break;
      }
    }

    this.setState({ supplies: supplies, errors : []});
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
    let supplies = [];
    let numberOfSupplies = this.state.numberOfSupplies

    for (let i = 0; i < numberOfSupplies; i++) {
      supplies.push({ kingdom: {}, events: [], landmarks: [] });
    }

    let rest = [];
    let baneNeeded = -1;
    Object.entries(this.state.kingdom).forEach(kv => {
      let [name, num] = kv;

      if (num < 1) {
        return;
      }

      let cards = this.shuffleArray(kingdomList[name]);
      for (let i = 0; i < numberOfSupplies; i++) {
        supplies[i].kingdom[name] = cards.slice(i * num, (i + 1) * num);
        if (name === "cornucopia" && supplies[i].kingdom[name].find(card => card.name === "魔女娘") !== undefined) {
          baneNeeded = i;
        }
      }

      rest.push(...cards.slice(numberOfSupplies * num));
    });

    if (baneNeeded >= 0) {
      let bane = this.shuffleArray(rest).find(card => card.bane);

      if (bane === undefined) {
        return null;
      }

      supplies[baneNeeded].bane = bane;
    }

    return supplies;
  }

  shuffleArray(ary) {
    let copied = ary.slice();
    for (let i = copied.length - 1; i>= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    return copied;
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
      let cards = Object.keys(supply.kingdom).map(ex => supply.kingdom[ex].map(card => card.name).join(' ')).join(' ');
      let bane = typeof supply.bane === 'object' ? `災い: ${supply.bane.name}` : '';
      let landscapes = supply.events.concat(supply.landmarks).map(card => card.name).join(' ')

      return (
        <div className="panel panel-default" key={i}>
          <div className="panel-body">
            <div>{cards}</div>
            <div>{landscapes}</div>
            <div>{bane}</div>
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
