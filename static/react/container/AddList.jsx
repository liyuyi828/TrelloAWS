import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateList } from '../actions';
import axios from 'axios';

class AddList extends Component {
  constructor(){
    super();
    this.state = {
      listname: '', 
      position: ''
    } 
  }

  handleListNameChange(e) {
    this.setState({listname: e.target.value})
  }

  handlePositionChange(e) {
    this.setState({position: e.target.value})
  }

  createNewList(){
    let newList = {
      name: this.state.listname,
      pos: this.state.position,
      cards: []
    }
    const updateList = this.props.updateList;
    axios.post('/api/lists', newList)
      .then(res => {
        // console.log(res.data);
        updateList(res.data);
      }); 
    this.setState({ listname: '', position: ''});
  }

  render() {
    return (
      <div className="list">
        <h3>New List</h3>
        List Name:
        <br/>
        <input onChange={this.handleListNameChange.bind(this)} value={this.state.listname}/>
        <br/>
        Position:
        <br/> 
        <input onChange={this.handlePositionChange.bind(this)} value={this.state.position}/>
        <br/>
        <button onClick={this.createNewList.bind(this)}>Create</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddList);

