import React from 'react';
import autobind from 'autobind-decorator'; // not allowed stick to bind

export default class App extends React.Component {
  
  constructor() {
  	super();
  	
  	this.state = {
  		// keep list and object so that new items can be added to the top
  		// filtered for search.
  		lists : {},
  		keys : [],
  		filteredKeys : []
  	}
  }
  
  renderList(string) {
  	if (this.state.lists[string] === false) {
  		return <div key={"div" + string} className="listDiv">
  				<li className="newList" key={string}><p>{string}</p></li>
  				<button onClick={this.toggle.bind(this, string)} className="toggle">O</button>
  			   </div>
  	}

  	return <div key={"div" + string} className="listDiv">
			<li className="openList" key={string}><p>{string}</p></li>
			<button onClick={this.toggle.bind(this, string)} className="toggle">&times;</button>
		   </div>
  }

  prompt() {
  	var inputBox = window.prompt("What list item would you like to add?");
  	if (this.state.keys.indexOf(inputBox) === -1 && inputBox !== "") {
  		// check if the new value has already been inputted, and it is non-empty.
  		// set toggled value to false at the beginning
		this.state.lists[inputBox] = false;
		this.state.keys.unshift(inputBox);
		this.search();
		this.setState({
			lists : this.state.lists,
			keys : this.state.keys
		});
	}
  }

  /* toggle, close, and open could have been concatenated into
   * one function but I was having trouble with functions that 
   * had more than one parameter because of autobind errors.
   */

  toggle(string) {
  	console.log("clicked");
  	this.state.lists[string] = !this.state.lists[string];
  	this.setState({
  		lists : this.state.lists
  	});
  }

  close(string) {
  	this.state.lists[string] = false;
  	this.setState({
  		lists : this.state.lists
  	});
  }

  open(string) {
  	this.state.lists[string] = true;
  	this.setState({
  		lists : this.state.lists
  	})
  }

  toggleAll() {
  	this.state.keys.map(this.toggle.bind(this));
  }

  closeAll() {
  	this.state.keys.map(this.close.bind(this));
  }

  openAll() {
  	this.state.keys.map(this.open.bind(this));
  }

  search(event) {
  	/* could have used Trie, but implementation could take long and
  	 * plain text performance not too bad. 
  	 */
   	var filteredKeys = [];
  	var comparison = this.refs.inputBox.value;
  	for (var i in this.state.keys) {
  		if (this.state.keys[i].indexOf(comparison) > -1) {
  			filteredKeys.push(this.state.keys[i]);
  		}
  	}
  	this.setState({
  		filteredKeys : filteredKeys
  	});
  }

  render() {
    return (
    	<div id="verbling-challenge">
    		<h1>Verbling Challenge</h1>
    		<form autoComplete="off">
	    		<input onKeyUp={this.search.bind(this)} ref="inputBox" id="input-box" 
	    		type="text" placeholder="Search" required/>
	    	</form>
    		<div id="display-div">
    			<ul className="list-of-objects">
    				{this.state.filteredKeys.map(this.renderList.bind(this))}
    			</ul>
    		</div>
    		<button className="endButtons" onClick={this.openAll.bind(this)} >Open All</button>
    		<button className="endButtons" onClick={this.closeAll.bind(this)} >Close All</button>
    		<button className="endButtons" onClick={this.toggleAll.bind(this)} >Toggle All</button>
    		<button className="endButtons" id="add" onClick={this.prompt.bind(this)} >Add</button>
    	</div>
    	)
  }

}
