import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled, {css}from 'styled-components';
import UserGrid from './Profile/UserGrid';
import {Modal} from './Modal/Modal'
import Posts from './Posts'
import { Gallery } from './Gallery/Gallery';

class ModalSwitch extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    let { location } = this.props;

    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    let { location } = this.props;

    let isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render

    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/img/:id" component={ImageView} />
        </Switch>
        {isModal ? <Route path="/img/:id" component={Modal} /> : null}
      </div>
    );
  }
}

export const Image = styled.div`
  width: 305px;
  height: 305px;
  @media(max-width:990px){
    width: 100%;
  }
  background: no-repeat center/150% url(/img/${({index}) => index}.jpg);
  ${({inModal}) => !inModal && css`
    :hover {
      opacity: .7; 
    }
  `}
`



function Home() {
  return (
    <div>
      <h1>
        <Link to="/gallery">Värmt Välkommen Till Ronna Rehab</Link>
      </h1>
      <h2>Ronna Rehab Logo</h2>
     </div>
  );
}





function ImageView({ match }) {
  let image = Posts[parseInt(match.params.id, 10) - 1];

  if (!image) return <div>Image not found</div>;

  return (
    <div>
      <h1>{image.title}</h1>
      <Image index={image.id} />
    </div>
  );
}



function ModalGallery() {
  return (
    <Router>
      <Route component={ModalSwitch} />
    </Router>
  );
}

export default ModalGallery;
