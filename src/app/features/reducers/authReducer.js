import { actionType } from '../../../constants/actionTypes';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.loading:
      return {
        ...state,
        loading: true,
      };

    case actionType.success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case actionType.error:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default authReducer;
