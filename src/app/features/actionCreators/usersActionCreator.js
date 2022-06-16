import { usersActionType } from '../../../constants/actionTypes';
import { PRODUCT } from '../../../constants/variable';

export function getAllUsers(axiosPrivate, company_id, toggleErrorAlert) {
  return async (dispatch) => {
    dispatch({
      type: usersActionType.loading,
    });

    console.log('all users');

    try {
      const response = await axiosPrivate.get(
        `/team?product=${PRODUCT}&company_id=${company_id}`
      );

      if (response.data?.status === 'success') {
        dispatch({
          type: usersActionType.success,
          payload: response.data?.results,
        });
        console.log('Fetched users! successfully!');
      } else {
        dispatch({
          type: usersActionType.error,
          payload: response.data?.message,
        });
        console.log('failed to fetch users', response.data?.message);
        toggleErrorAlert();
      }
    } catch (error) {
      dispatch({
        type: usersActionType.error,
        payload: error.response && error.response.data?.message,
      });
    }
  };
}
