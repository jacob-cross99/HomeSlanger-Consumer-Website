import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery'

import './styles.css'

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Tyler',
      age: 32,
      bio: `This is an example bio for my example profile. This is a test on how to display a profile.
      This is an example bio for my example profile. This is a test on how to display a profile.
      This is an example bio for my example profile. This is a test on how to display a profile.
      This is an example bio for my example profile. This is a test on how to display a profile.`,
      photos: [
        {
          original: 'https://media.istockphoto.com/photos/fashion-is-a-serious-business-picture-id469339032?k=6&m=469339032&s=612x612&w=0&h=UT82hbIOyGNFYqsCeTwtUsDCpBqigGiNz46Oc0-c3Gk=',
        },
        {
          original: 'https://i.redd.it/6onq25y0sh311.jpg'
        }
      ],
      interests: {
        pages: [
          {
            image: 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p100x100/50813627_10157101876612509_8264332807757627392_n.jpg?_nc_cat=1&_nc_ht=scontent-lax3-2.xx&oh=576fc28717f1f33924cc060d87a3ec45&oe=5D267398',
            name: 'Forbes'
          }
        ]
      },
      distance: 30
    }
  }

  componentDidMount() {
  }

  _renderPages() {
    const { interests } = this.state
    const { pages } = interests

    return pages.map(({ image, name }) => {
      return (
        <li className="interest">
          <img className="logo" src={ image } />
          <div className="name">{ name }</div>
        </li>
      )
    })
  }

  render() {
    const { age, bio, distance, name, photos } = this.state
    return (
      <div className="profile">
        <div className="row">
          <ImageGallery className="photos" items={ photos } lazyLoad={ true } showThumbnails={ false } showPlayButton={ false } showBullets={ true } showNav={ false } showFullscreenButton={ false } />
        </div>
        <div className="row body">
          <div className="name">{ name }, { age }</div>
          <div className="location">
            <i className="fa fa-map-marker-alt"></i>
            &nbsp;{ distance }+ mi
          </div>
          <div className="bio">
            { bio }
          </div>
        </div>
        <div className="row interests">
          <div className="header">
            <i class="fab fa-facebook"></i> &nbsp; Pages
          </div>
          <ul className="list">
            { this._renderPages() }
          </ul>
          <div className="header">
            <i class="fas fa-gamepad"></i> &nbsp; Games
          </div>
          <div className="list"></div>
          <div className="header">
            <i class="fas fa-music"></i> &nbsp; Music
          </div>
          <div className="list"></div>
          <div className="header">
            <i class="fas fa-film"></i> &nbsp; Movies
          </div>
          <div className="list"></div>
          <div className="header">
            <i class="fas fa-book"></i> &nbsp; Books
          </div>
          <div className="list"></div>
        </div>
      </div>
    )
  }
}
