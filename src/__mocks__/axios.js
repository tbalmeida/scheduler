const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 }
    },
    "4": { id: 4, time: "3pm", interview: null }
  },
  interviewers: {
    "1": {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png"
    },
    "4": {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg"
    }
  }
};

const GET_STATUS_CODE = 200,
  GET_STATUS_MSG = "Ok",
  PUT_STATUS_CODE = 204,
  PUT_STATUS_MSG = "No Content",
  DEL_STATUS_CODE = 200,
  DEL_STATUS_MSG = "Ok";

export default {
  defaults: { baseURL: "" },

  get: jest.fn(url => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: GET_STATUS_CODE,
        statusText: GET_STATUS_MSG,
        data: fixtures.days
      });
    }

    if (url === "/api/appointments") {
      /* Resolve appointments data */
      return Promise.resolve({
        status: GET_STATUS_CODE,
        statusText: GET_STATUS_MSG,
        data: fixtures.appointments
      });
    }

    if (url === "/api/interviewers") {
      /* Resolve interviewers data */
      return Promise.resolve({
        status: GET_STATUS_CODE,
        statusText: GET_STATUS_MSG,
        data: fixtures.interviewers
      });
    }
  }),

  put: jest.fn(url => {
      return Promise.resolve({
        status: PUT_STATUS_CODE,
        statusText: PUT_STATUS_MSG
      });
  }),

  delete: jest.fn(url => {
    return Promise.resolve({
      status: DEL_STATUS_CODE,
      statusText: DEL_STATUS_MSG
    });
  })

}
