import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';

import axios from '../../auth';

import Listing from '../../components/listing';

import './styles.css';

export default class Properties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingSearch: false,
      loadingResults: false,
      ...this.props.location.state
    };

    this.search = this.search.bind(this);
  }

  update(prop, e) {
    this.setState({ [prop]: e.target.value });
  }

  view(mlsId) {
    let data;

    console.log(mlsId);

    this.state.properties.map(property => {
      if(property.mlsId === mlsId)
        data = property;
    });

    this.props.history.push(`/properties/${ mlsId }`, data);
  }

  componentDidMount() {
  }

  renderProperties() {
    return this.state.properties.map(property => {
      return (
        <span onClick={ e => this.view(property.mlsId)}>
          <Listing key={ property.mlsId } { ...property } />
        </span>
      );
    });
  }

  search() {
    this.setState({ loadingSearch: true });

    axios().get('properties', {
      params: {
        type: this.state.type,
        location: this.state.location,
        bedrooms: this.state.bedrooms,
        bathrooms: this.state.bathrooms,
        minPrice: this.state.minPrice,
        maxPrice: this.state.maxPrice
      }
    }).then(res => {
      const { data } = res;

      if(data.error) {
        this.setState({ loadingSearch: false });
        return alert(data.error.message);
      }

      this.setState({ properties: data, loadingSearch: false });
    }).catch(err => {
      this.setState({ loadingSearch: false });
      alert('Failed to connect with server, please try again');
    });
  }

  render() {
    const button = () => {
      if(this.state.loadingSearch)
        return (
          <div className="button disabled">
            <i className="fa fa-spinner fa-pulse"></i>
          </div>
        );

      return (
        <div className="button" onClick={ this.search }>
          <i className="fa fa-search"></i>
        </div>
      );
    };

    return (
      <div className="properties">
        <div className="search">
          <div className="input-group location">
            <span className="input-group-addon">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
            </span>
            <input type="text" placeholder="Enter a location..." defaultValue={ this.state.location } onChange={ e => this.update('location', e) } />
          </div>

          <div className="input-group beds hide-1200">
            <span className="input-group-addon">
              <i className="fa fa-bed" aria-hidden="true"></i>
            </span>
            <input type="number" placeholder="Beds" onChange={ e => this.update('bedrooms', e) } />
          </div>

          <div className="input-group baths hide-1200">
            <span className="input-group-addon">
              <i className="fa fa-bath" aria-hidden="true"></i>
            </span>
            <input type="number" placeholder="Baths" onChange={ e => this.update('bathrooms', e) } />
          </div>

          <div className="input-group budget hide-1200">
            <span className="input-group-addon">
              <i className="fa fa-usd" aria-hidden="true"></i>
            </span>
            <input type="number" placeholder="Min Price" onChange={ e => this.update('minPrice', e) } />
          </div>

          <div className="input-group budget hide-1200">
            <span className="input-group-addon">
              <i className="fa fa-usd" aria-hidden="true"></i>
            </span>
            <input type="number" placeholder="Max Price" onChange={ e => this.update('maxPrice', e) } />
          </div>

          { button() }
        </div>
        <ul className="results">
          { this.renderProperties() }
        </ul>
      </div>
    );
  }
}
