import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const CANCEL_INTERVIEW = "CANCEL_INTERVIEW";
  const UPDATE_SPOTS = "UPDATE_SPOTS";

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Promise.resolve(
      axios
        .put(`/api/appointments/${id}`, appointment)
        .then(() => dispatch({ type: SET_INTERVIEW, interview: appointments }))
        .then ( () => dispatch({ type: UPDATE_SPOTS })
      )
    );
  }

  function cancelInterview(id) {
    // delete on memory
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    // delete on actual DB
    return Promise.resolve(
      axios
        .delete(`/api/appointments/${id}`)
        .then(() => dispatch({ type: CANCEL_INTERVIEW, interview: appointments }))
        .then (() => dispatch({ type: UPDATE_SPOTS }))
    );
  }

  function reducer(state, action) {

    const spotsRemaining = function () {
      let spots = 0;
      for (let day in state.days) {
        if ((state.days[day].name === state.day)) {
          for (let id of state.days[day].appointments) {
            if (state.appointments[id].interview === null) {
              spots++
            }
          }
        }
      }
      return state.days.map((day) => { return day.name !== state.day ? day : { ...day, spots }})
    }

    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return {
          day: state.day,
          days: action.value[0].data,
          appointments: action.value[1].data,
          interviewers: action.value[2].data
        };
      case SET_INTERVIEW: {
        return { ...state, appointments: action.interview };
      }
      case CANCEL_INTERVIEW: {
        return { ...state, appointments: action.interview };
      }
      case UPDATE_SPOTS: {
        return { ...state, days: spotsRemaining() }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  const [state, dispatch] = useReducer(reducer, {
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
      dispatch({ type: SET_APPLICATION_DATA, value: all });
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
