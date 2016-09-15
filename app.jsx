var React = require('react');
var ReactDOM = require('react-dom');
var Row = require('./row.jsx');
require('./style.scss');

var Grid = React.createClass({

	getInitialState: function() {
		return({aliveBoxes: []})
	},

	zeroPad: function(num) {
		num = num.toString();
		if (num.length < 2) {
			num = '0' + num;
		}
		console.log(num);
		return num;
	},

	render: function() {
		var table = [];
		for (var i = 1; i <= 16; i++){
			if (i < 10) {
				i = '0' + i.toString();
			} else {
				i = i.toString();
			}
			table.push(<Row key={i} rowIndex={i} />);
		}
		return (
			<div className='row'>
				<table>
					<tbody>
						{table}
					</tbody>
				</table>
				<button onClick={this.boxChecker}>Click Me!!!</button>
			</div>
		);
	}

});

ReactDOM.render(
	<Grid />, document.getElementById('container')
)