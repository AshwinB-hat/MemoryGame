import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Card from './Card'
import shuffle from 'shuffle-array';
import Navbar from './NavBar';


const CardState={
  HIDING:0,
  SHOWING:1,
  MATCHING:2
}




export default class App extends Component {
  constructor(props){
    super(props);
    let cards =[
      {id:1, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id:2, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id:3, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id:4, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id:5, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id:6, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id:7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id:8, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id:9, cardState: CardState.HIDING, backgroundColor: 'blue'},
      {id:10, cardState: CardState.HIDING, backgroundColor: 'blue'},
      {id:11, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id:12, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id:13, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id:14, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id:15, cardState: CardState.HIDING, backgroundColor: 'white'},
      {id:16, cardState: CardState.HIDING, backgroundColor: 'white'}


    ];
    cards = shuffle(cards);
    this.state = {cards, noClick:false};
    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleNewGame(){
    let cards = this.state.cards.map(c =>({
      ...c,
      cardState: CardState.HIDING
    }));
    cards = shuffle(cards);
    this.setState({cards});
  }

  handleClick(id){
    const mapCardState = (cards, idstoChange, newCardState) =>{
      return cards.map(c=>{
        if(idstoChange.includes(c.id)){
          return{
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    }
    const foundCard = this.state.cards.find(c=>c.id == id);

    if(this.state.noClick || foundCard.cardState !== CardState.HIDING){
      return;
    }
    let noClick = false;
    let cards = mapCardState(this.state.cards,[id],CardState.SHOWING);

    const showingCards = cards.filter(c => c.cardState == CardState.SHOWING);
    
    const ids = showingCards.map(c => c.id);

    if(showingCards.length ==  2 && 
        showingCards[0].backgroundColor == showingCards[1].backgroundColor){
        cards = mapCardState(cards, ids, CardState.MATCHING);
    }else if(showingCards.length==2){
      let hinding = mapCardState(cards,ids, CardState.HIDING);

      noClick=true;

      this.setState({cards,noClick},()=>{
        setTimeout(() => {
          this.setState({cards:hinding, noClick:false});
        },1300); 
      });
      return;
    }
    this.setState({cards,noClick});

    // this.setState(prevState => {
    //   let cards = prevState.cards.map(c =>(
    //     c.id==id?{
    //       ...c,
    //       cardState: c.cardState == CardState.HIDING? CardState.MATCHING : CardState.HIDING
    //     }: c
    //     ));
    //   return {cards};
    // });
  }

  render() {

    const cards = this.state.cards.map((card)=>(
      <Card 
        key = {card.id} 
        showing={ card.cardState !== CardState.HIDING} 
        backgroundColor={card.backgroundColor} 
        onClick={() => this.handleClick(card.id)}
      />
      ));      
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>

      <div>
      <Navbar onNewGame = {this.handleNewGame}/>
        {cards}
      
      </div>




    );
  }
}
