import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Lists from '../components/Lists';
import { updateList } from '../actions';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    //initialize the state for the App
    const updateList = this.props.updateList;
    axios.get('/api/lists')
      .then(res => {
        console.log('lists', res.data.rows);
        if(res.data.rows.length) {
          updateList(res.data.rows);
        } else {
          console.log('No lists found, please add a lists'); 
        }
      })
  }

  render() {
    return (
      <div>
        <h1>HorizonEllo</h1>
        <div>
          <Lists />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);