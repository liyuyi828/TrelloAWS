import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListEntry from '../components/ListEntry';
import AddList from '../container/AddList';

class Lists extends Component {
  render() {
    return (
      <div className="lists">
        {this.props.lists.map((list, index) => 
          <ListEntry key ={index} list={list} /> 
        )}
        <AddList />
      </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    lists: state.Lists.lists
  }
}

export default connect(mapStateToProps)(Lists);