import React, { Component } from 'react'
import Swing from 'react-swing'

import './styles.css'

export default class Match extends Component {
	constructor(props) {
		super(props)

		this.state = {
			matches: [
				{
					id: '390390390',
					name: 'Clare',
					age: 19,
					distance: 20,
					interests: 42,
					photo: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=5000',
				}
			]
		}
	}
	
	_load() {
		// Matches empty, load more
		this.setState({ loading: true })
	}

	_like() {

	}

	_dislike() {

	}

	_renderCards() {
		const { matches } = this.state

		return matches.map(({ id, name, age, distance, interests, photo }) => {
			return (
				<div key={ id } className="card" throwoutleft={ e => this._dislike(id) } throwoutright={ e => this._like(id) }>
					<img src={ photo } className="photo" />
					<div className="name-age">{ name }, { age } </div>
					<div className="distance">
						<i className="fas fa-map-marker-alt"></i> { distance } mi
					</div>&nbsp;
					<div className="interests">
						<i className="far fa-thumbs-up"></i> { interests }
					</div>
				</div>
			)
		})
	}

	render() {
		return (
			<div className="match">
				<Swing className="stack" tagName="div" setStack={stack => this.setState({ stack: stack })} ref="stack" throwout={e => console.log('throwout', e)}>
					{ this._renderCards() }
				</Swing>
			</div>
		)
	}
}