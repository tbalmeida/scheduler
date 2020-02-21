import React, { useEffect } from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function deleteInterview(id) {
    console.log("deleteInterview", id);

    transition(DELETING);
    props.cancelInterview(props.id).then( () => transition(EMPTY) );
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onCancel={() => transition(EMPTY)}
        onSave={save}
        />
        )}
      {mode === SHOW && (
        <Show
        name={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={props.onEdit}
        interviewers={props.interviewers}
        onDelete={() => transition(CONFIRM)}
        id={props.id}
        onEdit={() => transition(CREATE, true)}
        /> )}
      {mode === EMPTY && (<Empty onAdd={() => { transition(CREATE); }} /> )}
      {mode === CONFIRM && ( <Confirm message="Delete?" onConfirm={deleteInterview} onCancel={() => back()} /> )}
      {mode === SAVING && (<Status message="Saving" />)}
      {mode === DELETING && (<Status message="Deleting" />)}
    </article>
  );
}
