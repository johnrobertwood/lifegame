var React = require('react');
var ReactDOM = require('react-dom');
var Box = require('./box.jsx');
require('./style.scss');

var Row = React.createClass({

	render: function() {
		var row = [];
		for (var i = 1; i <= 16; i++){
			if (i < 10) {
				i = '0' + i.toString();
			} else {
				i = i.toString();
			}
			row.push(<Box key={i} colIndex={i} rowIndex={this.props.rowIndex} />);
		}
		return (<tr>{row}</tr>);
	}

});

module.exports = Row;