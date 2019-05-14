import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import styles from './workoutEditor.scss';

// Initialize highcharts exporting module
Exporting(Highcharts);


const getDateRange = (workoutData) => {
  const dates = workoutData.map(({ date: { date } }) => date);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  return { minDate, maxDate };
};

const getWorkoutSeries = (workoutData) => {
  const exerciseKeys = Object.keys(workoutData[0]).filter(key => key !== 'date');

  // Loop over the exercise keys to create an array of series' for the highchart
  const chartData = exerciseKeys.reduce((acc, key) => {
    const series = {
      name: workoutData[0][key].name,
      data: []
    };

    // Add data to the series
    workoutData.forEach((workout) => {
      const { date } = workout.date;
      const { value } = workout[key];
      series.data.push([date.getTime(), parseInt(value, 10)]);
    });

    // Push to and return the new accumulator
    acc.push(series);
    return acc;
  }, []);

  return chartData;
};

const createChart = (workoutData) => {
  if (!workoutData.length) {
    Highcharts.chart('workoutChartContainer', {
      title: {
        text: 'No data to display'
      }
    });
    return;
  }

  const { minDate, maxDate } = getDateRange(workoutData);
  const workoutSeries = getWorkoutSeries(workoutData);

  // Remember to not use UTC time
  Highcharts.setOptions({
    time: {
      useUTC: false
    }
  });

  Highcharts.chart('workoutChartContainer', {

    title: {
      text: 'Workout Progress'
    },

    subtitle: {
      text: `${minDate.toDateString()} - ${maxDate.toDateString()}`
    },

    xAxis: {
      type: 'datetime'
    },

    yAxis: {
      title: {
        text: 'Values'
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    tooltip: {
      xDateFormat: '%A, %B %d, %l:%M%P',
      shared: true
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: workoutSeries,

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  });
};

const WorkoutEditorChart = (props) => {
  const { workoutData } = props;

  // Initialize the highchart
  useEffect(() => createChart(workoutData), []);

  return (
    <div id="workoutChartContainer" className={styles.workoutChart} />
  );
};

export default memo(WorkoutEditorChart);

WorkoutEditorChart.propTypes = {
  workoutData: PropTypes.arrayOf(PropTypes.object).isRequired
};
