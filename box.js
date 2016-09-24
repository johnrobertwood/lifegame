import React, { Component } from 'react'
import classNames from 'classnames'
import { addTodo } from './actions'

class Box extends Component {

	constructor(props) {
		super(props);
		this.state = {
			active: false,
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

	handleClick = (e) => {
		const id = this.zeroPad(e.target.dataset.x) + this.zeroPad(e.target.dataset.y);
		const activeArray = this.state.aliveBoxes;
		this.setState({active: !this.state.active});
		document.getElementById(id).className += " " + this.state.active;
		const newActiveArray = activeArray.concat([id])
		this.setState({aliveBoxes: newActiveArray});
		dispatch(addLife(i))
	}

	render() {
		const coords = this.props.rowIndex + this.props.colIndex;
		const boxClasses = classNames({
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

}

export default Box