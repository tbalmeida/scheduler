import React, { useEffect } from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
/* 
  We need to perform a transition. 
  When the user clicks on the add appointment button, it should transition to the CREATE mode.
  Our useVisualMode Hook returns an object that contains a transition function. 
  If we start in the EMPTY mode and call transition(CREATE) then the mode will be changed, and React will render the component.
  Update the onAdd function we pass to our Empty component to transition to the CREATE mode when the user clicks the add 
  appointment button.
 */

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    console.log(props);

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
      {mode === CREATE  && (
        <Form interviewers={[]} onCancel={() => transition(EMPTY)} />
      )}
      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      )}
    </article>
  );
}
// {props.interview ?
//   <Show
//     name={props.interview.student}
//     interviewer={props.interview.interviewer}
//     onDelete={props.onDelete}
//     onEdit={props.onEdit}
//   />
// : <Empty time={props.time}/>}
