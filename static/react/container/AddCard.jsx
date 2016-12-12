import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AddCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false, 
      contents: ''
    } 
  }

  toggleEditing() {
    this.setState( { editing: ! this.state.editing } );
  }

  handleContentChange(e) {
    this.setState( { contents: e.target.value });
  }

  addCard() {
    let cards = this.props.cards;
    if(this.state.contents.length > 0){
      cards.push(this.state.contents);    
    }
    this.props.updateParentList('cards', cards);
  }

  render() {
    if(this.state.editing){
      return (
        <div className="add_card">
          <input value={this.state.contents} onChange={this.handleContentChange.bind(this)}/>
          <button onClick={() => {
            this.toggleEditing();
            this.addCard(); 
          }}>Add</button>
        </div>
        )
    } else {
      return (
        <div className="add_card" onClick={this.toggleEditing.bind(this)}>
          add a card
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

