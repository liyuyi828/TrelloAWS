import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListName from '../container/ListName';
import AddCard from '../container/AddCard';
import Cards from './Cards';
import axios from 'axios';
import { updateList } from '../actions';

class ListEntry extends Component {
  constructor() {
    super()
  } 

  updateThisList(key, newValue){
    const updateList = this.props.updateList; 
    let list = this.props.list;
    console.log('old', list);
    list[key] = newValue;
    console.log('new', list);
    axios.post('api/lists/:id', list)
      .then(res => {
        console.log(res.data);
        updateList(res.data);    
      })
  }

  render() {
    return (
      <div className="list">
        <ListName listName={this.props.list.name} updateParentList={this.updateThisList.bind(this)}/>
        <Cards cards={this.props.list.cards} updateParentList={this.updateThisList.bind(this)}/>
        <AddCard cards={this.props.list.cards} updateParentList={this.updateThisList.bind(this)}/>
      </div>
      )
  }
}

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateList: updateList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEntry);