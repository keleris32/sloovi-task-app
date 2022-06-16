import { allTasksActionType } from '../../../constants/actionTypes';

const initialState = {
  data: [],
  loading: false,
  error: false,
};

function getAllTasksReducer(state = initialState, action) {
  switch (action.type) {
    case allTasksActionType.loading:
      return {
        ...state,
        loading: true,
      };

    case allTasksActionType.success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case allTasksActionType.error:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default getAllTasksReducer;
