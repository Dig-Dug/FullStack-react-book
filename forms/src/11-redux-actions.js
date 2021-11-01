/* eslint-disable no-use-before-define */
export const FETCH_PEOPLE_REQUEST = 'FETCH_PEOPLE_REQUEST';
function fetchPeopleRequest () {
  return {type: FETCH_PEOPLE_REQUEST};
}

export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
function fetchPeopleSuccess (people) {
  return {type: FETCH_PEOPLE_SUCCESS, people};
}
// 3 different const to create actions for saving list to server
export const SAVE_PEOPLE_REQUEST = 'SAVE_PEOPLE_REQUEST';
//starts whit request, provide only action type
function savePeopleRequest () {
  //save status to "saving"
  return {type: SAVE_PEOPLE_REQUEST};
}
//depending of the const before "success or failure" used in 
//savePeople function
export const SAVE_PEOPLE_FAILURE = 'SAVE_PEOPLE_FAILURE';
function savePeopleFailure (error) {
  return {type: SAVE_PEOPLE_FAILURE, error};
}

export const SAVE_PEOPLE_SUCCESS = 'SAVE_PEOPLE_SUCCESS';
function savePeopleSuccess (people) {
  return {type: SAVE_PEOPLE_SUCCESS, people};
}
//asynchronous action creator
export function fetchPeople () {
  //returning of function dispatching actions
  return function (dispatch) {
    dispatch(fetchPeopleRequest())
    apiClient.loadPeople().then((people) => {
      dispatch(fetchPeopleSuccess(people))
    })
  }
}
//asyn action creator
export function savePeople (people) {
  return function (dispatch) {
    dispatch(savePeopleRequest())
    //delegate work to apiClient
    apiClient.savePeople(people)
      .then((resp) => { dispatch(savePeopleSuccess(people)) })
      .catch((err) => { dispatch(savePeopleFailure(err)) })
  }
}

const apiClient = {
  loadPeople: function () {
    return {
      then: function (cb) {
        setTimeout( () => {
          cb(JSON.parse(localStorage.people || '[]'))
        }, 1000);
      }
    }
  },

  savePeople: function (people) {
    const success = !!(this.count++ % 2);

    return new Promise(function (resolve, reject) {
      setTimeout( () => {
        if (!success) return reject({success});

        localStorage.people = JSON.stringify(people);
        resolve({success});
      }, 1000);
    })
  },

  count: 1
}
