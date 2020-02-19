import React from 'react'

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time={props.time} />
    {props.interview ? 
      <Show
        name={props.interview.student} 
        interviewer={props.interview.interviewer}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      /> 
    : <Empty time={props.time}/>}
    </article>
  );
}