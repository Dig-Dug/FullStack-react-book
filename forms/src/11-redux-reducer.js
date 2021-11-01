import {
  FETCH_PEOPLE_REQUEST, FETCH_PEOPLE_SUCCESS,
  SAVE_PEOPLE_REQUEST, SAVE_PEOPLE_FAILURE, SAVE_PEOPLE_SUCCESS
} from './11-redux-actions.js';
// up 5 different action types
//when starting request only info needed is action type for reducer
const initialState = {
  people: [],
  isLoading: false,
  saveStatus: 'READY',
  person: {
    name: '',
    email: '',
    course: null,
    department: null
  },
};
//reducer knows when to turn type to false
export function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_PEOPLE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
  //people list needed for automatization of boolean
    case FETCH_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        people: action.people,
        isLoading: false
      });
    case SAVE_PEOPLE_REQUEST:
      return Object.assign({}, state, {
        saveStatus: 'SAVING'
      });
    case SAVE_PEOPLE_FAILURE:
      return Object.assign({}, state, {
        saveStatus: 'ERROR'
      });
    case SAVE_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        people: action.people,
        person: {
          name: '',
          email: '',
          course: null,
          department: null
        },
        saveStatus: 'SUCCESS'
      });
    default:
      return state;
  }
}
