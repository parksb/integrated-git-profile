import React from 'react';
import Header from './Header';
import Content from './Content';

class Renderer extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Header />
        <Content />
      </div>
    );
  }
}

export default Renderer;
