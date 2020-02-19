import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Sami Bordokan",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: "last",
    time: "5pm",
  }
];

export default function Application(props) {
  const listAppointments = appointments.map(appointment => <Appointment key={appointment.id} {...appointment} /> );
  
  const [days, setDays] = useState([]);
  const [selectedDay, setDay] = useState(days[0]);
  
  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
    .then((res) => {
      setDays(res.data); 
    });
  }, []);
  
  console.log("Days length:", days.length)
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

        <DayList days={days} day={selectedDay} setDay={setDay} />
        {/* <DayList days={days} day={selectedDay} setDay={day => console.log(day)} /> */}

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
