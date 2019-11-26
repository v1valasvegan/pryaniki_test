import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { cn } from '@bem-react/classname';
import './Buttons.css';

const mapStateToProps = state => {
  const { view } = state;
  return { view };
};

const actionCreators = {
  switchView: actions.switchView
};

class Buttons extends React.Component {
  handleSwitchView = view => () => {
    const { switchView } = this.props;
    switchView(view);
  };

  render() {
    const { view } = this.props;
    const componentCN = cn('Buttons');

    const makeButtonCN = modifier =>
      componentCN('button', { [modifier]: true });

    const isActive = modifier => modifier === view;

    const activeString = modifier => (isActive(modifier) ? ' active' : '');

    const makeButtonClassList = modifier =>
      `${makeButtonCN(modifier)}${activeString(modifier)}`;

    return (
      <div className={componentCN()}>
        <button
          className={makeButtonClassList('yearly')}
          disabled={isActive('yearly')}
          onClick={this.handleSwitchView('yearly')}
        >
          25 лет
        </button>
        <button
          className={makeButtonClassList('monthly')}
          disabled={isActive('monthly')}
          onClick={this.handleSwitchView('monthly')}
        >
          1 год
        </button>
        <button
          className={makeButtonClassList('daily')}
          disabled={isActive('daily')}
          onClick={this.handleSwitchView('daily')}
        >
          30 дней
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Buttons);
