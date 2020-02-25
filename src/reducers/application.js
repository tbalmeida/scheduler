const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const CANCEL_INTERVIEW = "CANCEL_INTERVIEW";
const UPDATE_SPOTS = "UPDATE_SPOTS";

export default function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
