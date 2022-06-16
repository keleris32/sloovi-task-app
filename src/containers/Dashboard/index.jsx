import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { Task } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getTasks } from '../../app/features/actionCreators/taskActionCreator';
import { getAllUsers } from '../../app/features/actionCreators/usersActionCreator';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

function Dashboard(props) {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [isErrorAlertActive, setIsErrorAlertActive] = useState(false);

  const toggleErrorAlert = () => setIsErrorAlertActive(!isErrorAlertActive);
  const [refresh, setRefresh] = useState(false);

  const refreshComponent = () => setRefresh(!refresh);

  const { loading: usersLoading, error: usersError } = useSelector(
    (state) => state.getUsers
  );
  const { loading: tasksLoading, error: tasksError } = useSelector(
    (state) => state.getAllTasks
  );

  useEffect(() => {
    let isMounted = true;

    isMounted &&
      dispatch(
        getTasks(axiosPrivate, props.data?.company_id, toggleErrorAlert)
      );
    isMounted &&
      dispatch(
        getAllUsers(axiosPrivate, props.data?.company_id, toggleErrorAlert)
      );

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  useEffect(() => {
    if (usersError) {
      toast.error(usersError);
    }
  }, [usersError]);

  useEffect(() => {
    if (tasksError) {
      toast.error(tasksError);
    }
  }, [tasksError]);

  return (
    <div className={styles.container}>
      <header className={styles.header} />
      <div className={styles.wrapper}>
        {usersLoading || tasksLoading ? (
          <div className={styles.loaderCon}>
            <Oval color="blue" height={100} width={100} />
          </div>
        ) : (
          <div>
            <Task refreshComponent={refreshComponent} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
