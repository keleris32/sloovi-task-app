import { authActionType } from '../../../constants/actionTypes';
import axios from '../../../api/axios';

export function loginUser(formData, toggleErrorAlert, navigateBackToHomeRoute) {
  return async (dispatch) => {
    dispatch({
      type: authActionType.loading,
    });

    try {
      const response = await axios.post('/login', formData);

      if (response.data?.status === 'success') {
        dispatch({
          type: authActionType.success,
          payload: response.data?.results,
        });

        navigateBackToHomeRoute();
      } else {
        dispatch({
          type: authActionType.error,
          payload: response.data?.message,
        });

        toggleErrorAlert();
      }
    } catch (error) {
      dispatch({
        type: authActionType.error,
        payload: error.response && error.response.data?.message,
      });
    }
  };
}
