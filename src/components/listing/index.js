import React, { Component } from 'react';
import currency from 'currency-formatter';

import './styles.css';

export default class Listing extends Component {
  constructor(props) {
    super(props);

    this.state = props;
    this.favorite = this.favorite.bind(this);
  }

  favorite() {
    this.setState({ favorite: !this.state.favorite });
  }

  renderFavorite() {
    if(!this.state.favorite)
      return <i className="fa fa-heart-o"></i>;

    return <i className="fa fa-heart"></i>;
  }

  render() {
    return (
      <li className="listing">
        <img src={ this.state.photos[0] } />
        <div className="filter"></div>

        <div className="details">
          <div className="status active">
            ACTIVE
          </div>
          <div className="favorite" onClick={ this.favorite }>
            { this.renderFavorite() }
          </div>
          <div className="price">
            { currency.format(this.state.listPrice, { code: 'USD' }) }
          </div>
          <div className="stats">
            <i className="em em-bed"></i> { this.state.property.bedrooms }  <i className="em em-toilet"></i> { this.state.property.bathsFull + ( this.state.property.bathsHalf / 2 ) } <i className="em em-triangular_ruler"></i> { this.state.property.area }
          </div>
        </div>
      </li>
    );
  }
}
