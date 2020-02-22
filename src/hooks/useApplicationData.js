import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {
function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return Promise.resolve( axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState( {...state, appointments} ))
  );
}

function cancelInterview(id) {
console.log("Application.js_cancelInterview", id)

// delete on memory
const appointment = { ...state.appointments[id], interview: null };
const appointments = { ...state.appointments, [id]: appointment };

// delete on actual DB
return Promise.resolve( axios.delete(`/api/appointments/${id}` )
  .then( ( () => setState({...state, appointments}))) )
}

const setDay = day => setState(prev => ({ ...prev, day }));

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

useEffect(() => {
  const pmsDays = axios.get("/api/days");
  const pmsAppt = axios.get("/api/appointments");
  const pmInter = axios.get("/api/interviewers");
  
  Promise.all([pmsDays, pmsAppt, pmInter]).then(all => {
    setState(() => ({
      day: state.day,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data
    }));
  });

}, []);

return {
  state, setDay, bookInterview, cancelInterview }

}