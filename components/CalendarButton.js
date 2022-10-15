import * as Add2Calendar from "add2calendar";
import React from 'react';
import moment from 'moment';

class CalendarButton extends React.Component {
  componentDidMount () {
    const singleEvent = new Add2Calendar({
      title: "Emily and Pete's Wedding",
      start: moment("2022-07-30 13:00","YYYY-MM-DD HH:mm").toDate(),
      end: moment("2022-07-30 23:59","YYYY-MM-DD HH:mm").toDate(),
      location: 'Bartholomew Barn, Kirdford, West Sussex, RH14 0LN'
    })
    singleEvent.createWidget('#single-normal')
  }

  render() {
    return (
      <div id="single-normal"></div>
    );
  }
}

export default CalendarButton