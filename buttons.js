import React, { Component } from 'react'

class Buttons extends Component {
	render() {
		if (this.props.autoRun) {
			return (
				<div>
					<button onClick={this.props.clearBoard}>Clear</button>
					<button onClick={this.props.autoRun}>Pause</button>
				</div>
			)
		} else {
			return (
				<div>
					<button onClick={this.props.clearBoard}>Clear</button>
					<button onClick={this.props.autoRun}>Start</button>
				</div>
			)
		}
	}
}

export default Buttons