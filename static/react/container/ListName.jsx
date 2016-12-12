import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ListName extends Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      listName: this.props.listName
    } 
  }

  toggleEditing() {
    this.setState( { editing: ! this.state.editing } );
  }

  handleNameChange(e){
    this.setState( {listName: e.target.value });
  }

  saveListName(){
    this.props.updateParentList('name', this.state.listName);
  }

  render() {

    if(this.state.editing){
      return (
        <div className="list_name">
          <input value={this.state.listName} onChange={this.handleNameChange.bind(this)} />
          <button onClick={() => {  
            this.toggleEditing();
            this.saveListName(); 
          }}>Save</button>
        </div>
        )
    } else {
      return (
        <div className="list_name" onClick={this.toggleEditing.bind(this)}>
          {this.state.listName}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListName);

