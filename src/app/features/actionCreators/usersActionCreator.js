import { usersActionType } from '../../../constants/actionTypes';
import { PRODUCT } from '../../../constants/variable';

export function getAllUsers(axiosPrivate, company_id, toggleErrorAlert) {
  return async (dispatch) => {
    dispatch({
      type: usersActionType.loading,
    });

    try {
      const response = await axiosPrivate.get(
        `/team?product=${PRODUCT}&company_id=${company_id}`
      );

      if (response.data?.status === 'success') {
        dispatch({
          type: usersActionType.success,
          payload: response.data?.results,
        });
      } else {
        dispatch({
          type: usersActionType.error,
          payload: response.data?.message,
        });
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
