import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Row from './row.js'
import lifeApp from './reducers/life.js'
import { createStore } from 'redux'
import './style.scss'

const store = createStore(lifeApp);

let stateGet = () => {
	store.getState().forEach(item => {
		document.getElementById(item.loc).className = "box active";
		// setTimeout(clearFunc, 1000, item.loc)
	});
}

let addBox = (id) => {
	document.getElementById(id).className = "box active";
	store.dispatch({
		type: 'ADD_LIFE',
		loc: id
	})
}

let clearBox = (id) => {
	document.getElementById(id).className = "box";
	store.dispatch({
		type: 'REMOVE_LIFE',
		loc: id
	})
}

let zeroPad = (num) => {
	num = num.toString();
	if (num.length < 2) {
		num = '0' + num;
	}
	return num;
}

let checkGrid = () => {
	var bigGrid = [];
	var gridCounts = [];
	for (let i = 1; i <= 16; i++) {
		let x = zeroPad(i);
		for (let j = 1; j <= 16; j++) {
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

	console.log(activeBoxes)

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

	function checkEmpty(id) {
		for (let k = 0; k < activeBoxes.length; k++) {
			if (activeBoxes[k].loc === id) {
				return false;
			}
		}
		return true;
	}

	//Remove boxes with less than 1 or 0 neighbors
	let counter = 0;
	for (let i = 1; i <= 16; i++) {
		let x = zeroPad(i);
		for (let j = 1; j <= 16; j++) {
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
	console.log(store.getState());
}

class Grid extends Component {

	firstClick() {
		addBox('0813');
		addBox('0712');
		addBox('0812');
		addBox('0912')
		addBox('0711');
		addBox('0911');
		addBox('0810');
	}

	secondClick() {
		checkGrid();
	}

	render() {

		let table = [];
		for (let i = 16; i > 0; i--){
			i = zeroPad(i)
			table.push(<Row store={this.props.store} key={i} colIndex={i} lives={this.props.lives} />);
		}
		return (
			<div className='row'>
				<table>
					<tbody>
						{table}
					</tbody>
				</table>
				<button onClick={this.firstClick}>Step 1</button>
				<button onClick={this.secondClick}>Step 2</button>

			</div>
		);
	}

}
const render = () => {
	ReactDOM.render(
		<Grid store={store}/>, document.getElementById('container')
	)
}

store.subscribe(stateGet);

render();