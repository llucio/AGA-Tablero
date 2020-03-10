import React from 'react';
import moment from '../utils/moment';
import './CalendarIcon.css';

const CalendarIcon = ({ date }) => {
  const momentDate = moment(date).utc();

  return (
    <time className="CalendarIcon" datetime="2014-09-20">
      <em>{momentDate.format('MMMM')}</em>
      <strong>{momentDate.format('YYYY')}</strong>
      <span>{momentDate.format('D')}</span>
    </time>
  );
};

export default CalendarIcon;
