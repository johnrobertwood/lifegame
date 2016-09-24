import React, { Component } from 'react'
import Box from './box.js'
import './style.scss'

class Row extends Component {

	render() {
		const row = [];
		for (let i = 1; i <= 16; i++){
			if (i < 10) {
				i = '0' + i.toString();
			} else {
				i = i.toString();
			}
			row.push(<Box key={i} colIndex={i} rowIndex={this.props.rowIndex} />);
		}
		return (<tr>{row}</tr>);
	}

}

export default Row