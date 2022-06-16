import { allTasksActionType } from '../../../constants/actionTypes';
import { USER_ID } from '../../../constants/variable';

export async function createTask(
  axiosPrivate,
  company_id,
  formData,
  toggleSuccessAlert,
  toggleErrorAlert
) {
  try {
    const response = await axiosPrivate.post(
      `/task/${USER_ID}?company_id=${company_id}`,
      formData
    );

    if (response.data?.status === 'success') {
      toggleSuccessAlert();
    } else {
      toggleErrorAlert();
    }
  } catch (error) {
    toggleErrorAlert();
  }
}

export function getTasks(axiosPrivate, company_id, toggleErrorAlert) {
  return async (dispatch) => {
    dispatch({
      type: allTasksActionType.loading,
    });

    try {
      const response = await axiosPrivate.get(
        `/task/${USER_ID}?company_id=${company_id}`
      );

      if (response.data?.status === 'success') {
        dispatch({
          type: allTasksActionType.success,
          payload: response.data?.results,
        });
      } else {
        dispatch({
          type: allTasksActionType.error,
          payload: response.data?.message,
        });

        toggleErrorAlert();
      }
    } catch (error) {
      dispatch({
        type: allTasksActionType.error,
        payload: error.response && error.response.data?.message,
      });
    }
  };
}

export async function updateTask(
  axiosPrivate,
  company_id,
  task_id,
  formData,
  toggleSuccessAlert,
  toggleErrorAlert
) {
  try {
    const response = await axiosPrivate.put(
      `/task/${USER_ID}/${task_id}?company_id=${company_id}`,
      formData
    );

    if (response.data?.status === 'success') {
      toggleSuccessAlert();
    } else {
      toggleErrorAlert();
    }
  } catch (error) {
    toggleErrorAlert();
  }
}

export async function deleteTask(
  axiosPrivate,
  company_id,
  task_id,
  toggleSuccessAlert,
  toggleErrorAlert
) {
  try {
    const response = await axiosPrivate.delete(
      `/task/${USER_ID}/${task_id}?company_id=${company_id}`
    );

    if (response.data?.status === 'success') {
      toggleSuccessAlert();
    } else {
      toggleErrorAlert();
    }
  } catch (error) {
    toggleErrorAlert();
  }
}
