import axios from 'axios';

export const FETCH_DATA_REQUEST = '@app/FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = '@app/FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = '@app/FETCH_DATA_FAILURE';

function requestDataStart() {
  return { type: FETCH_DATA_REQUEST };
}

function gotRequestData(data) {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
}

function failedToGetData(err) {
  return {
    type: FETCH_DATA_FAILURE,
    error: err.response.status,
  };
}

export const getAppData = () => {
  return dispatch => {
    dispatch(requestDataStart());
    return axios.get('http://jsonplaceholder.typicode.com/posts')
      .then(res => {
        const { data } = res;
        return dispatch(gotRequestData(data));
      })
      .catch(err => dispatch(failedToGetData(err)));
  };
};

const initialState = {
  data: null,
  isFetching: false,
  error: null,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default appReducer;
