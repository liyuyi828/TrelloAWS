import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      cardContent: this.props.card
    }
  }
 
  toggleEditing() {
    this.setState( { editing: ! this.state.editing } );
  }

  handleContentChange(e) {
    this.setState( { cardContent: e.target.value });
  }
  
  changeCardContent() {
    this.props.updateCard(this.props.cardId, this.state.cardContent); 
  }

  deleteCard() {
    this.props.deleteCard(this.props.cardId); 
  }

  render() {
    if(this.state.editing){
      return (
        <div className="card">
          <input value={this.state.cardContent} onChange={this.handleContentChange.bind(this)}/>
          <button onClick={() => {
            this.toggleEditing();
            this.changeCardContent(); 
          }}>Change</button>
          <button onClick={()=>{ 
            this.toggleEditing();
            this.deleteCard();
          }}>Delete Card</button> 
        </div> 
      ) 
    } else {
      return (
        <div className="card" onClick={this.toggleEditing.bind(this)}>
          <p>{this.props.key}</p>
          { this.state.cardContent }
        </div>
      )  
    }
  }
}

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);

