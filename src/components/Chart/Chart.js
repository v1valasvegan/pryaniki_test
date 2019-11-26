import React from 'react';
import { Line } from 'react-chartjs-2';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import moment from 'moment';
import './Chart.css';

const mapStateToProps = state => {
  const { rates, view } = state;
  const formatDate = date => {
    moment.updateLocale('ru', {
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ]
    });
    moment.locale('ru');
    switch (view) {
      case 'monthly':
        return moment(date).format('MMMM YYYY');
      case 'yearly':
        return moment(date).format('YYYY');
      default:
        return date;
    }
  };
  const normalizedRates = Object.entries(rates).map(([date, { USD }]) => ({
    date: formatDate(date),
    rate: USD
  }));

  const props = { ...state, rates: normalizedRates };
  return props;
};

const actionCreators = {
  updateRates: actions.updateRates
};

class Chart extends React.Component {
  componentDidUpdate = prevProps => {
    if (prevProps.view !== this.props.view) {
      const { updateRates, view } = this.props;
      updateRates(view);
    }
  };

  render() {
    const { ratesFetchingState, rates } = this.props;
    if (ratesFetchingState === 'requesting') {
      return (
        <div className='loader-container'>
          <img className='loader' src={require('../loader.svg')} alt='' />
        </div>
      );
    }
    if (ratesFetchingState === 'failure') {
      return (
        <div className='failed-message-container'>
          <h1 className='failed-message'>
            Что-то пошло не так, попробуйте перезагрузить страницу
          </h1>
        </div>
      );
    }
    const labels = rates.map(({ date }) => date);
    const datasets = [{ data: rates.map(({ rate }) => rate) }];
    const chartData = { labels, datasets };
    return (
      <div className='chart-container'>
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: true,
            title: {
              display: true,
              text: 'Курс EU/USD'
            },
            legend: {
              display: false
            }
          }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Chart);
