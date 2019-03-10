import React, { Component } from 'react';
import './App.css';
import { kingdomList, nameMap, extraMap, boonList } from './cardList.js'

class App extends Component {
  constructor(props) {
    super(props);
    let { supplies, errors } = this.parseQuery(window.location.search.substring(1));
    this.state = {
      kingdom: { basic: 5, nocturne: 5 }, supplies: supplies, errors: errors
    };
  }

  parseQuery(qry) {
    let supplies = [];

    let params = {};
    qry.split('&').forEach(kv => {
      let [k, v] = kv.split('=');
      params[k] = v;
    });

    if (!params['sn']) {
      return { supplies: [], errors: [] };
    }

    for (let i = 0; i < parseInt(params['sn']); i++) {
      let supply = {};
      let kingdom = {};
      ['basic', 'nocturne'].forEach(ex => {
        let cards = [];
        for (let j = 0; j < parseInt(params[`s${i}${ex[0]}n`]); j++) {
          let id = parseInt(params[`s${i}${ex[0]}${j}`]);
          let card = kingdomList[ex].find(c => c.id === id);

          if (!card) {
            return { supplies: [], errors: [`invalid parameter: s${i}${ex[0]}${j}}=${id}`] }
          }
          cards.push(card);
        }
        kingdom[ex] = cards;
      });
      supply.kingdom = kingdom;

      if (params[`s${i}d0`]) {
        supply.druidBoons = [];
        for (let j = 0; j < 3; j++) {
          let id = parseInt(params[`s${i}d${j}`])
          let boon = boonList.find(b => b.id === id);
          if (!boon) {
            return { supplies: [], errors: [`invalid parameter: s${i}d${j}=${id}`] }
          }
          supply.druidBoons.push(boon);
        }
      }

      supplies.push(supply);
    }

    return { supplies: supplies, errors: [] };
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
    let errors = this.validateForGenerate();
    if (errors.length !== 0) {
      this.setState({ errors: errors });
      return;
    }

    this.state.supplies.push(this.selectSupply())

    this.setState({ supplies: this.state.supplies, errors : []});
  }

  validateForGenerate() {
    let errors = [];
    let kingdom = this.state.kingdom;

    if (Object.values(kingdom).reduce((acc, x) => acc + x) !== 10) {
      errors.push("王国カードの数が10ではありません");
    }

    let restCards = this.restCards()
    Object.entries(kingdom).forEach(([name, num]) => {
      if (num > restCards[name].length) {
        errors.push(`${nameMap[name]}のカード枚数が足りません`)
      }
    })

    return errors;
  }

  selectSupply() {
    let supply = {};
    let kingdom = {};

    let restCards = this.restCards();
    Object.entries(restCards).forEach(([expansion, cards]) => {
      kingdom[expansion] = this.shuffleArray(cards).slice(0, this.state.kingdom[expansion]);
    });
    supply.kingdom = kingdom
    if (kingdom['nocturne'].some((card) => card.druid)) {
      supply.druidBoons = this.shuffleArray(boonList).slice(0, 3);
    }

    return supply;
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

  genQuery() {
    let ary = [`sn=${encodeURIComponent(this.state.supplies.length)}`];
    this.state.supplies.forEach((supply, i) => {
      ['basic', 'nocturne'].forEach(ex => {
        ary.push(`s${i}${ex[0]}n=${encodeURIComponent(supply.kingdom[ex].length)}`)
        supply.kingdom[ex].forEach((card, j) => {
          ary.push(`s${i}${ex[0]}${j}=${encodeURIComponent(card.id)}`)
        });
      });
      if (supply.druidBoons) {
        supply.druidBoons.forEach((boon, j) => {
          ary.push(`s${i}d${j}=${encodeURIComponent(boon.id)}`);
        });
      }
    });
    return `?${ary.join('&')}`;
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
      let kingdom = Object.keys(supply.kingdom).map(ex => `${supply.kingdom[ex].map(card => card.name).join(' ')}`).map((cards, i) => <div key={i}>{cards}</div>);
      let heirlooms = [];
      supply.kingdom['nocturne'].forEach((card) => {
        if (card.heirloom) {
          heirlooms.push(card.heirloom);
        }
      });
      heirlooms = heirlooms.length > 0 ? <div>{`家宝: ${heirlooms.join(' ')}`}</div> : undefined;
      let druidBoons = supply.druidBoons ? <div>{`ドルイドの恵み: ${supply.druidBoons.map(card => card.name).join(' ')}`}</div> : undefined;
      let extraCards = [];
      ['boon', 'hex', 'imp', 'ghost', 'wish', 'bat', 'zombie' ].forEach(name => {
        if (supply.kingdom['nocturne'].some(card => card[name])) {
          extraCards.push(extraMap[name]);
        }
      });
      if (supply.kingdom['nocturne'].some(card => (card['will_o_wisp']) || (supply.druidBoons && supply.druidBoons.some(boon => boon['will_o_wisp'])))) {
        extraCards.push(extraMap['will_o_wisp']);
      }
      extraCards = extraCards.length > 0 ? <div>{`サプライ外: ${extraCards.join(' ')}`}</div> : undefined;
      return (
        <div className="panel panel-default" key={i}>
          <div className="panel-body">
            <div>{kingdom}</div>
            {druidBoons}
            {heirlooms}
            {extraCards}
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
            {supplies.reverse()}
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(_prevProps, _prevState) {
    let qry = this.genQuery();
    window.history.replaceState('', '', qry);
  }
}

export default App;
