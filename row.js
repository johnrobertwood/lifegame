import React, { Component } from 'react'
import Box from './box.js'
import './style.scss'

class Row extends Component {

	render() {
		const row = [];
		for (let i = 1; i <= 32; i++){
			if (i < 10) {
				i = '0' + i.toString();
			} else {
				i = i.toString();
			}
			row.push(<Box key={i} lives={this.props.lives} store={this.props.store} colIndex={this.props.colIndex} rowIndex={i} />);
		}
		return (<tr>{row}</tr>);
	}

}

export default Row