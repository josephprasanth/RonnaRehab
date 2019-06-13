import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled, {css}from 'styled-components';
import UserGrid, { MiniUserGrid } from './Profile/UserGrid';
import {Modal} from './Modal/Modal'
import {Posts} from './Posts'

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

const Image = styled.div` 
width: 305px;
height: 305px;
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

const PhotoGrid = styled.div`
display: grid;
grid-template-columns: repeat(3,305px);
justify-content: center;
gap: 20px;
margin-bottom: 50px;
`

function Gallery() {
  return (
      <div>
   <UserGrid/>
    <PhotoGrid>
      {Posts.map(i => (
        <Link
          key={i.id}
          to={{
            pathname: `/img/${i.id}`,
            // this is the trick!
            state: { modal: true }
          }}
        >
          <Image index={i.id} />
          </Link>
      ))}
    </PhotoGrid>
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
