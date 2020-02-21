export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(appointmentId => {
        filteredAppointments.push(state.appointments[appointmentId]);
      });
    }
  });
  return filteredAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
}

export function getInterviewersByDay(state, day) {
  let result = [];
  let today = state.days.filter(val => val.name === day);
  if (today.length === 0) return result;
  result = today[0].interviewers.map(someGuy => state.interviewers[someGuy]);
  return result;
}
