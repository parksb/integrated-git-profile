import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Renderer from './components/Renderer';

const rootElement = $('#root')[0];

ReactDOM.render(
  <Renderer />,
  rootElement
);
