import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { slide as Menu } from 'react-burger-menu';

import MapViewContainer from '../../map/containers/MapViewContainer';
import StaticView from './StaticView';
import EbayItemsContainer from '../../ebay-item/containers/EbayItemsContainer';

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = { isMenuOpen: false };
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.goTo = this.goTo.bind(this);
  }

  openMenu() {
    this.setState({ isMenuOpen: true });
  }

  closeMenu(state) {
    if (!state.isOpen) this.setState({ isMenuOpen: false });
  }

  goTo(anchor, event) {
    event.preventDefault();
    if (anchor) {
      let node = ReactDOM.findDOMNode(this.refs[anchor]);
      if (node) node.scrollIntoView();
    }
  }

  render() {
    return (
      <div id="outer-container">
        <Menu onStateChange={ this.closeMenu } isOpen={this.state.isMenuOpen} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
          <a className="menu-item" href="#" onClick={(event) => this.goTo('geolocation', event)} title="Geolocation">Geolocation</a>
          <a className="menu-item" href="#" onClick={(event) => this.goTo('business', event)} title="Business fields">Business fields</a>
          <a className="menu-item" href="#" onClick={(event) => this.goTo('products', event)} title="Products on the market">Products on the market</a>
          <a className="menu-item" href="#" onClick={(event) => this.goTo('team', event)} title="Team">Team</a>
        </Menu>
        <div className="content-container">
          <div className="menu-container">
            <ul>
              <li>
                <button className="link" onClick={this.openMenu}>
                  <i className="ion-navicon" /> <span>Menu</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div id="page-wrap">
          <div className="banner">
            <h1>VR Technologies</h1>
            <h2>A project outcome of the COSE module</h2>
            <div className="network-left" />
            <div className="network-right" />
          </div>
          <div ref="geolocation" id="geolocation" name="geolocation" className="dark-bg-container">
            <div className="content-container">
              <h2>Geolocations of VR technologies</h2>
              <h3>Where to find and buy VR products</h3>
              <MapViewContainer />
            </div>
          </div>
          <div ref="business" className="white-bg-container">
            <div className="content-container business">
              <h2>Business fields</h2>
              <h3>Possible use of VR technologies in the future</h3>
              <StaticView />
            </div>
          </div>
          <div ref="products" className="light-bg-container">
            <div className="content-container">
              <h2>Products on the market</h2>
              <h3>What products are sold on Ebay, where and how much</h3>
              <EbayItemsContainer />
            </div>
          </div>
          <div ref="team" className="white-bg-container">
            <div className="content-container team">
              <h2>Team</h2>
              <h3>The team behind the results</h3>
              <div className="row">

                <div className="col-xxs-12 col-xs-6 col-md-4">
                  <div className="image-container">
                    <img src="/assets/images/profile/Andreas.jpg" alt="Andreas" />
                  </div>
                  <p>
                    <span className="name">Andreas Gasser</span>
                    iCompetence <br />
                    Windisch, CH
                  </p>
                </div>


                <div className="col-xxs-12 col-xs-6 col-md-4">
                  <div className="image-container">
                    <img src="/assets/images/profile/martin.jpg" alt="Martin" />
                  </div>
                  <p>
                    <span className="name">Martin Lüpold</span>
                    iCompetence <br />
                    Windisch, CH
                  </p>
                </div>

                <div className="col-xxs-12 col-xs-6 col-md-4">
                  <div className="image-container">
                    <img src="/assets/images/profile/matthias.jpg" alt="Matthias" />
                  </div>
                  <p>
                    <span className="name">Matthias Langhard</span>
                    iCompetence <br />
                    Windisch, CH
                  </p>
                </div>

                <div className="col-xxs-12 col-xs-6 col-md-4">
                  <div className="image-container">
                    <img src="/assets/images/profile/Lukas.jpg" alt="Lukas" />
                  </div>
                  <p>
                    <span className="name">Lukas Klier</span>
                    iCompetence <br />
                    Windisch, CH
                  </p>
                </div>

                <div className="col-xxs-12 col-xs-6 col-md-4">
                  <div className="image-container">
                    <img src="/assets/images/profile/Florian.jpg" alt="Florian" />
                  </div>
                  <p>
                    <span className="name">Florian Häfliger</span>
                    iCompetence <br />
                    Windisch, CH
                  </p>
                </div>

                <div className="col-xxs-12 col-xs-6 col-md-4">
                  <div className="image-container">
                    <img src="/assets/images/profile/Devin.jpg" alt="Devin" />
                  </div>
                  <p>
                    <span className="name">Devin Baumsteiger</span>
                    Information Systems <br />
                    Cologne, DE
                  </p>
                </div>


                <div className="col-xxs-12 col-xs-6 col-md-4">
                  <div className="image-container">
                    <img src="/assets/images/profile/yin.jpg" alt="Yin" />
                  </div>
                  <p>
                    <span className="name">Yin Wai</span>
                    Information Systems <br />
                    Cologne, DE
                  </p>
                </div>

                <div className="col-xxs-12 col-xs-6 col-md-4">
                  <div className="image-container">
                    <img src="/assets/images/profile/Leo.jpg" alt="Leo" />
                  </div>
                  <p>
                    <span className="name">Zhe Liu</span>
                    Computer Science <br />
                    Jilin, HK
                  </p>
                </div>


                <div className="col-xxs-12 col-xs-6 col-md-4">
                  <div className="image-container">
                    <img src="/assets/images/profile/gakki.jpg" alt="Gakki" />
                  </div>
                  <p>
                    <span className="name">Yang Wang</span>
                    Marketing <br />
                    Jilin, HK
                  </p>
                </div>

              </div>
            </div>
          </div>

          <div className="footer">
            <div className="left">COSE 2017</div>
            <div className="right">VR Technologies</div>
          </div>
        </div>
      </div>
    );
  }
}

MainView.propTypes = {
  children: PropTypes.node,
  navigateToPath: PropTypes.func.isRequired,
};


export default MainView;
