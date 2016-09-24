import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Row from './row.js'
import './style.scss'

class Grid extends Component {

	constructor(props) {
		super(props);
		this.state = {
			aliveBoxes: []
		};
	}

	zeroPad(num) {
		num = num.toString();
		if (num.length < 2) {
			num = '0' + num;
		}
		return num;
	}

	render() {
		let table = [];
		for (let i = 1; i <= 16; i++){
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
			</div>
		);
	}

}
const render = () => {
	ReactDOM.render(
		<Grid />, document.getElementById('container')
	)
}

render();