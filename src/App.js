import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from 'styled-components';

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
background: no-repeat center/150% url(/img/${({index}) => index}.jpg);`

const IMAGES = [
  { id: 1, title: "Office"},
  { id: 2, title: "Reception"},
  { id: 3, title: "Gymn - View1"},
  { id: 4, title: "Gymn - View2"}, 
  { id: 5, title: "Dumbells"  },
  { id: 6, title: "Woman Training"  },
  { id: 7, title: "Woman Training"  },
  { id: 8, title: "Woman Training"  },
  { id: 9, title: "Woman Training"  }
];

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
width: 950px;
margin:auto;
gap: 20px;
margin-top: 80px;
`

function Gallery() {
  return (
    <PhotoGrid>
      {IMAGES.map(i => (
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
  );
}

function ImageView({ match }) {
  let image = IMAGES[parseInt(match.params.id, 10) - 1];

  if (!image) return <div>Image not found</div>;

  return (
    <div>
      <h1>{image.title}</h1>
      <Image index={image.id} />
    </div>
  );
}

function Modal({ match, history }) {
  let image = IMAGES[parseInt(match.params.id, 10) - 1];

  if (!image) return null;

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div
      onClick={back}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)"
      }}
    >
      <div
        className="modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
        <h1>{image.title}</h1>
        <Image index={image.id} />
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
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
