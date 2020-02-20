import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import getAppointmentsForDay from "helpers/selectors";

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState(prev => ({ ...prev, day }));
  
  useEffect(() => {
    const pmsDays = axios.get("/api/days");
    const pmsAppt = axios.get("/api/appointments");
    Promise.all([pmsDays, pmsAppt])
    .then((all) => {
      console.log("Appt", all[1].data)
      setState(prev => ({ day: state.day, days: all[0].data, appointments: all[1].data}));
    });
  }, []);
  
  const appointments = getAppointmentsForDay(state, state.day)
  console.log("apts", state.appointments)
  const listAppointments = appointments.map(appointment => <Appointment key={appointment.id} {...appointment} /> );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

        <DayList days={state.days} day={state.day} setDay={setDay} />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {listAppointments}
      </section>
    </main>
  );
}
