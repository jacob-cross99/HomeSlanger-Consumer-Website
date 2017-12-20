import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import GoogleMapReact, { Marker } from 'google-map-react';
import currency from 'currency-formatter';

import RoboChat from '../../components/robochat';

import './styles.css';

export default class Property extends Component {
  constructor(props) {
    super(props);

    if(this.props.location.state.photos)
      for(let x = 0; x < this.props.location.state.photos.length; x++)
        this.props.location.state.photos[x] = { original: this.props.location.state.photos[x], thumbnail: this.props.location.state.photos[x] };

    this.state = {
      loading: true,
      ...this.props.location.state
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.robochat.sendBotMessage('Hello Jake! Let me know if there\'s any questions about this property at 1901 W Germann St.');
      this.robochat.open();
    }, 2000);
  }

  render() {
    return (
      <div className="property">
        <div className="white-bg padding-5">
          <div className="row">
            <div className="col col-xl-8 col-lg-12">
              <ImageGallery items={ this.state.photos } />
            </div>
            <div className="col col-xl-4 col-lg-12">
              <div className="row">
                <ul className="details">
                  <li className="price">
                    { currency.format(this.state.listPrice, { code: 'USD' }) }
                  </li>
                  <li>
                    <i className="em em-bed icon"></i>
                    <div className="label">
                      { this.state.property.bedrooms } Beds
                    </div>
                  </li>
                  <li>
                    <i className="em em-bathtub icon"></i>
                    <div className="label">
                      { this.state.property.bathsFull + ( this.state.property.bathsHalf / 2 ) } Baths
                    </div>
                  </li>
                  <li>
                    <i className="em em-triangular_ruler icon"></i>
                    <div className="label">
                      { this.state.property.area } Sqft.
                    </div>
                  </li>
                  <li>
                    <i className="fa fa-heart-o icon"></i>
                    <div className="label">
                      Add to Favorites
                    </div>
                  </li>
                  <li>
                    <i className="fa fa-share-alt icon"></i>
                    <div className="label">
                      Share
                    </div>
                  </li>
                  <li>
                    <i className="em em-straight_ruler icon"></i>
                    <div className="label">
                      { currency.format(this.state.listPrice / this.state.property.area, { code: 'USD' }) }/Sqft.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="seperator"></div>
        <div className="padding-5">
          <div className="row">
            <div className="col col-xl-7 offset-xl-1">
              <div className="body">
                <div className="header">Additional Details</div>

                <div className="row">
                  <div className="col col-xl-6">
                    <div className="detail">
                      <span className="label">Price:</span>
                      <span className="value">$150,000</span>
                    </div>

                    <div className="detail">
                      <span className="label">Price:</span>
                      <span className="value">$150,000</span>
                    </div>

                    <div className="detail">
                      <span className="label">Price:</span>
                      <span className="value">$150,000</span>
                    </div>
                  </div>
                  <div className="col col-xl-6">
                    <div className="detail">
                      <span className="label">Street Address:</span>
                      <span className="value">1901 W Germann St</span>
                    </div>

                    <div className="detail">
                      <span className="label">Street Address:</span>
                      <span className="value">1901 W Germann St</span>
                    </div>

                    <div className="detail">
                      <span className="label">Street Address:</span>
                      <span className="value">1901 W Germann St</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-xl-3">
              <div className="body">
                <div className="header">Connect with a Realtor</div>

                <button className="btn btn-primary btn-block">
                  Book Showing
                </button>

                <button className="btn btn-primary btn-block">
                  Message Realtor
                </button>
              </div>

              <div className="body">
                <div className="header">Location</div>
                <div className="map">
                  <GoogleMapReact apiKey={'AIzaSyCUny6mM-L5PjmzvZCnn_wxqIbBNshOhOQ'}  defaultCenter={{ lat: this.state.geo.lat, lng: this.state.geo.lng }} defaultZoom={ 17 }>
                    <i className="fa fa-map-marker fa-3x primary" text={'Property'} lat={ this.state.geo.lat } lng={ this.state.geo.lng }></i>
                  </GoogleMapReact>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RoboChat ref={ robochat => this.robochat = robochat } />
      </div>
    );
  }
}
