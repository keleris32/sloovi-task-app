import { authActionType } from '../../../constants/actionTypes';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActionType.loading:
      return {
        ...state,
        loading: true,
      };

    case authActionType.success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case authActionType.error:
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
