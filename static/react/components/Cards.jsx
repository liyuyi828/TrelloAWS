import React, { Component } from 'react';
import Card from '../container/Card';

export default class Cards extends Component {
  constructor(props) {
    super(props)
  }

  updateOneCard(index, newContents){
    let cards = this.props.cards; 
    cards[index] = newContents;
    console.log("new cards", cards);
    this.props.updateParentList('cards', cards)
  }

  deleteOneCard(index){
    let cards = this.props.cards; 
    cards.splice(index, 1); 
    this.props.updateParentList('cards', cards);
  }

  render (){
    return (
      <div>
        {this.props.cards.map((card, index) => 
          <Card key={index} 
                card={card}
                cardId = {index} 
                updateCard = {this.updateOneCard.bind(this)}
                deleteCard = {this.deleteOneCard.bind(this)}
                />
          )}
      </div>
      )
  }
}