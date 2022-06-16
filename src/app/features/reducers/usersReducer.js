import { usersActionType } from '../../../constants/actionTypes';

const initialState = {
  data: [],
  loading: false,
  error: false,
};

function getUsersReducer(state = initialState, action) {
  switch (action.type) {
    case usersActionType.loading:
      return {
        ...state,
        loading: true,
      };

    case usersActionType.success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case usersActionType.error:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default getUsersReducer;
