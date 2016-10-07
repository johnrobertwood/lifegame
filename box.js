import React, { Component } from 'react'
import classNames from 'classnames'
import lifeApp from './reducers/life.js'

class Box extends Component {

	zeroPad(num) {
		num = num.toString();
		if (num.length < 2) {
			num = '0' + num;
		}
		return num;
	}

	handleClick = (e) => {
		const id = this.zeroPad(e.target.dataset.x) + this.zeroPad(e.target.dataset.y);
		if (document.getElementById(id).className === "box active") {
			document.getElementById(id).className = "box";
			this.props.store.dispatch({
				type: 'REMOVE_LIFE',
				loc: id
			})
		} else {
			document.getElementById(id).className = "box active"
			this.props.store.dispatch({
				type: 'ADD_LIFE',
				loc: id
			})
		}		
	}

	render() {
		const coords = this.props.rowIndex + this.props.colIndex;
		const boxClasses = classNames({
			'box': 'box',
			'active': ''
		});
		return (
			<td 
			  className={boxClasses}
			  data-y={this.props.colIndex} 
			  data-x={this.props.rowIndex} 
			  onClick={this.handleClick}
			  id={coords}

		 	/>
		);
	}

}

export default Box