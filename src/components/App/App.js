import React from 'react';
import Chart from '../Chart/Chart';
import Buttons from '../Buttons/Buttons';
import { cn } from '@bem-react/classname';
import './App.css';

export default class App extends React.Component {
  render() {
    const classes = cn('App')();
    return (
      <div className={classes}>
        <Buttons />
        <Chart />
      </div>
    );
  }
}
