import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Row from './row.js'
import lives from './reducers/life.js'
import { createStore } from 'redux'
import { Button } from 'react-bootstrap'
import './style.sass'

const store = createStore(lives);

const stateGet = () => {
	store.getState().forEach(item => {
		document.getElementById(item.loc).className = "box active";
	});
}

const addBox = (id) => {
	document.getElementById(id).className = "box active";
	store.dispatch({
		type: 'ADD_LIFE',
		loc: id
	})
}

const clearBox = (id) => {
	document.getElementById(id).className = "box";
	store.dispatch({
		type: 'REMOVE_LIFE',
		loc: id
	})
}

const zeroPad = (num) => {
	num = num.toString();
	if (num.length < 2) {
		num = '0' + num;
	}
	return num;
}

const checkGrid = (count) => {
	const bigGrid = [];
	const gridCounts = [];
	store.dispatch({
		type: 'INC_COUNT',
		count: count
	})
	for (let i = 1; i <= 32; i++) {
		let x = zeroPad(i);
		for (let j = 1; j <= 32; j++) {
			let y = zeroPad(j);
			let miniGrid = [];
			miniGrid.push(zeroPad(i) + zeroPad(j+1));
			miniGrid.push(zeroPad(i+1) + zeroPad(j));
			miniGrid.push(zeroPad(i+1) + zeroPad(j+1));
			miniGrid.push(zeroPad(i-1) + zeroPad(j));
			miniGrid.push(zeroPad(i) + zeroPad(j-1));
			miniGrid.push(zeroPad(i+1) + zeroPad(j-1));
			miniGrid.push(zeroPad(i-1) + zeroPad(j+1));
			miniGrid.push(zeroPad(i-1) + zeroPad(j-1));
			bigGrid.push(miniGrid);
		}
	}
	let activeBoxes = store.getState()

	bigGrid.forEach(pBox => {
	let counter = 0;
		pBox.forEach(item => {
			activeBoxes.forEach(boxes => {
				if (boxes.loc === item) {
					counter++
				}
			})
		})
		gridCounts.push(counter);
	})

	const checkEmpty = (id) => {
		for (let k = 0; k < activeBoxes.length; k++) {
			if (activeBoxes[k].loc === id) {
				return false;
			}
		}
		return true;
	}

	let counter = 0;
	for (let i = 1; i <= 32; i++) {
		let x = zeroPad(i);
		for (let j = 1; j <= 32; j++) {
			let y = zeroPad(j);
			if (gridCounts[counter] < 2 || gridCounts[counter] > 3) {
				clearBox(x+y);
			}

			let loc = x + y;

			if (checkEmpty(loc) && gridCounts[counter] === 3) {
				addBox(loc);
			}
			counter++;
		}
	}
}

class Grid extends Component {

	constructor(props) {
	  super(props)
	  this.state = {
	    autoRun: true,
	    intId: 0,
	    genId: 0,
	    gen: 0,
	    buttonValue: 'Pause'
	  };
	  this.autoRun = this.autoRun.bind(this);
	  this.clearBoard = this.clearBoard.bind(this);
	}

	componentDidMount() {
		this.generateSeed();
		this.autoRun();
	}

	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	generateSeed() {
		let seedArr = [];
		for (let i = 0; i < 256; i++) {
			let randomX = zeroPad(this.getRandomInt(1, 32));
			let randomY = zeroPad(this.getRandomInt(1, 32));
			addBox(randomX + randomY)
		}
	}

	clearBoard() {
		this.autoRun()
		this.setState({gen: 0, buttonValue: 'Start'})
		store.getState().forEach(box => {
			clearBox(box.loc);
		})
	}

	autoRun() {
		if (this.state.intId === 0) {
			this.setState({autoRun: true, intId: setInterval(checkGrid, 250), gen: this.state.gen, buttonValue: 'Pause'});
			this.setState({genId: setInterval(() => { this.setState({gen: this.state.gen < 1000 ? this.state.gen + 1 : 0})}, 250)});
		} else {
			this.setState({autoRun: false, intId: 0, buttonValue: 'Resume'});
			clearInterval(this.state.intId);
			clearInterval(this.state.genId);
		}
	}

	render() {
		let table = [];
		for (let i = 32; i > 0; i--){
			i = zeroPad(i)
			table.push(<Row store={this.props.store} key={i} colIndex={i} lives={this.props.lives} />);
		}
		return (
			<div className='row'>
				<div className="title">
					<h1><a href='https://bitstorm.org/gameoflife/'>Conway's Game of Life</a></h1>
				</div>
				<div className="author">
					<h2><a href='https://johnrobertwood.github.io'>By John Wood</a></h2>
				</div>
					<table>
						<tbody>
							{table}
						</tbody>
					</table>
					<div className='controlBar'>
						<Button className="button" bsStyle="info" onClick={this.autoRun}>{this.state.buttonValue}</Button>
						<p className="counter">Generation: </p><span>{zeroPad(this.state.gen)}</span>
						<Button className="button" bsStyle="danger" onClick={this.clearBoard}>Clear</Button>
					</div>
				</div>
		);
	}

}
const render = () => {
	ReactDOM.render(
		<Grid store={store} />, document.getElementById('container')
	)
}

store.subscribe(stateGet);

render();