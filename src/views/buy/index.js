import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import Slider from 'react-slick';

import axios from '../../auth';

import Listing from '../../components/listing';

import buy from '../../videos/buy.mp4';

import './styles.css';

export default class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      featured: [],
      type: 'buy',
      loading: false
    };

    this.search = this.search.bind(this);
  }

  update(prop, e) {
    this.setState({ [prop]: e.target.value });
  }

  search() {
    this.setState({ loading: true });

    axios().get('properties', {
      params: {
        type: this.state.type,
        location: this.state.location
      }
    }).then(res => {
      const { data } = res;

      if(data.error) {
        this.setState({ loading: false });
        return alert(data.error.message);
      }

      this.setState({ loading: false });
      this.props.history.push('/properties', { properties: data, location: this.state.location, type: this.state.type });
    }).catch(err => {
      this.setState({ loading: false });
      alert('Failed to connect with server, please try again');
    });
  }

  render() {
    const button = () => {
      if(this.state.loading)
        return (
          <button className="btn btn-primary" disabled>
            <i className="fa fa-spinner fa-pulse"></i>
          </button>
        );

      return (
        <button className="btn btn-primary" onClick={ this.search }>
          <i className="fa fa-search"></i>
        </button>
      )
    };

    return (
      <div className="buy">
        <div className="search">
          <h2>Browse Properties</h2>

          <div className="segmented" onChange={ e => this.update('type', e) }>
            <label>
              <input type="radio" name="type" value="buy" defaultChecked />
              <span className="label">Buy</span>
            </label>
            <label>
              <input type="radio" name="type" value="rent" />
              <span className="label">Rent</span>
            </label>
            <label>
              <input type="radio" name="type" value="invest" />
              <span className="label">Invest</span>
            </label>
          </div>

          <div className="location">
            <div className="input-group">
              <Autocomplete
                onPlaceSelected={ e => {} }
                onChange={ e => this.update('location', e) }
                placeholder="Search by address, city, or zip code"
              />
              <span className="input-group-btn">
                { button() }
              </span>
            </div>
          </div>
        </div>
        {/*<div className="content">
          <h3>Featured Properties Near You</h3>
          <Slider dots={ false } arrows={ false } autoplay={ true } autoplaySpeed={ 2750 } infinite={ true } speed={ 500 } slidesToShow={ 5 } slidesToScroll={ 1 } responsive={[ { breakpoint: 1200, settings: { slidesToShow: 3 } }, { breakpoint: 700, settings: { slidesToShow: 2 } }, { breakpoint: 500, settings: { slidesToShow: 1 } } ]}>
            <div className="property">
              <Listing { ...this.state.featured[0] } />
            </div>
            <div className="property">
              <Listing { ...this.state.featured[0] } />
            </div>
            <div className="property">
              <Listing { ...this.state.featured[0] } />
            </div>
            <div className="property">
              <Listing { ...this.state.featured[0] } />
            </div>
            <div className="property">
              <Listing { ...this.state.featured[0] } />
            </div>
            <div className="property">
              <Listing { ...this.state.featured[0] } />
            </div>
          </Slider>
        </div>*/}
      </div>
    );
  }
}
