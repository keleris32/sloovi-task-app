import { actionType } from '../../../constants/actionTypes';
import axios from '../../../api/axios';

export function loginUser(formData, toggleErrorAlert, navigateBackToHomeRoute) {
  return async (dispatch) => {
    dispatch({
      type: actionType.loading,
    });

    try {
      const response = await axios.post('/login', formData);

      if (response.data?.status === 'success') {
        dispatch({
          type: actionType.success,
          payload: response.data?.results,
        });

        console.log('Success!!!!');

        navigateBackToHomeRoute();
      } else {
        dispatch({
          type: actionType.error,
          payload: response.data?.message,
        });

        console.log(response.data?.message);

        toggleErrorAlert();
      }
    } catch (error) {
      dispatch({
        type: actionType.error,
        payload: error.response && error.response.data?.message,
      });
    }
  };
}
