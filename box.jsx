var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

var Box = React.createClass({

	getInitialState: function() {
		return {active: false, aliveBoxes: []};
	},

	zeroPad: function(num) {
		num = num.toString();
		if (num.length < 2) {
			num = '0' + num;
		}
		return num;
	},

	handleClick: function(e) {
		var id = this.zeroPad(e.target.dataset.x) + this.zeroPad(e.target.dataset.y);
		var activeArray = this.state.aliveBoxes;
		console.log(activeArray);
		this.setState({active: !this.state.active});
		document.getElementById(id).className += " " + this.state.active;
		var newActiveArray = activeArray.concat([id])
		this.setState({aliveBoxes: newActiveArray});
	},

	render: function() {
		var coords = this.props.rowIndex + this.props.colIndex;
		var boxClasses = classNames({
			'box': 'box',
			'active': this.state.active
		});
		return (
			<td 
			  className={boxClasses}
			  data-y={this.props.rowIndex} 
			  data-x={this.props.colIndex} 
			  onClick={this.handleClick}
			  id={coords}
		 	/>
		);
	}

});

module.exports = Box;