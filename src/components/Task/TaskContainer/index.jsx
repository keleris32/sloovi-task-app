import React, { useEffect, useState } from 'react';
import styles from './TaskContainer.module.css';
import DatePicker from 'react-datepicker';
import DropdownOptions from '../../DropdownOptions';
import { TIME_DATA } from '../../../data/mockData';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import {
  createTask,
  deleteTask,
  updateTask,
} from '../../../app/features/actionCreators/taskActionCreator';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import { FaTrashAlt } from 'react-icons/fa';

function TaskContainer({
  usersData,
  refreshComponent,
  toggleTaskContainer,
  selectedTask,
  isToBeUpdated,
  toggleUpdateTaskContainer,
}) {
  const { data } = useSelector((state) => state.auth);
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [deleletTaskLoading, setDeleteTaskLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [taskMsg, setTaskMsg] = useState(
    isToBeUpdated ? selectedTask?.task_msg : ''
  );
  const [startDate, setStartDate] = useState(new Date());
  const [isErrorAlertActive, setIsErrorAlertActive] = useState(false);
  const [isSuccessAlertActive, setIsSuccessAlertActive] = useState(false);

  const toggleErrorAlert = () => setIsErrorAlertActive(!isErrorAlertActive);
  const toggleSuccessAlert = () =>
    setIsSuccessAlertActive(!isSuccessAlertActive);

  const taskFunction = () => {
    if (!taskMsg) {
      return toast.error('Please enter a task description before proceeding');
    }

    if (!startDate) {
      return toast.error(
        'Please select a date for this task before proceeding'
      );
    }

    if (!selectedTime) {
      return toast.error(
        'Please select a time for this task before proceeding'
      );
    }

    if (!selectedUser) {
      return toast.error('Please assign task to a user before proceeding');
    }

    const year = startDate?.getFullYear().toString();
    const month = startDate?.getMonth().toString();
    const day = startDate?.getDay().toString();

    let taskDate = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;

    const formData = {
      assigned_user: selectedUser?.user_id,
      task_date: taskDate,
      task_time: selectedTime?.value,
      is_completed: 0,
      time_zone: 19800,
      task_msg: taskMsg,
    };

    setLoading(true);

    isToBeUpdated
      ? updateTask(
          axiosPrivate,
          data?.company_id,
          selectedTask?.id,
          formData,
          toggleSuccessAlert,
          toggleErrorAlert
        )
      : createTask(
          axiosPrivate,
          data?.company_id,
          formData,
          toggleSuccessAlert,
          toggleErrorAlert
        );
  };

  const deleteSelectedTask = () => {
    setDeleteTaskLoading(true);

    deleteTask(
      axiosPrivate,
      data?.company_id,
      selectedTask?.id,
      toggleSuccessAlert,
      toggleErrorAlert
    );
  };

  useEffect(() => {
    if (isErrorAlertActive) {
      setLoading(false);
      deleletTaskLoading && setDeleteTaskLoading(false);
      toast.error('An Error occurred! Please try again later');
    }
  }, [isErrorAlertActive]);

  useEffect(() => {
    if (isSuccessAlertActive) {
      setLoading(false);
      deleletTaskLoading && setDeleteTaskLoading(false);
      toast.success('Your request was successful!');
      isToBeUpdated ? toggleUpdateTaskContainer() : toggleTaskContainer();
      refreshComponent();
    }
  }, [isSuccessAlertActive]);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label htmlFor="task">Task Description</label>
        <input
          name="task"
          value={taskMsg}
          onChange={(e) => setTaskMsg(e.target.value)}
        />

        <div className={styles.wrapper}>
          <div className={styles.dateTimeContainer}>
            <label htmlFor="date">Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              // dateFormat="YYYY-MM-DD"
            />
          </div>
          <div className={styles.dateTimeContainer}>
            <label htmlFor="time">Time</label>
            <DropdownOptions
              selectedOption={selectedTime}
              setSelectedOption={setSelectedTime}
              fixedHeight={true}
              OPTIONS={TIME_DATA}
              type="time"
            />
          </div>
        </div>
        <label htmlFor="user">Assign User</label>
        <div>
          <DropdownOptions
            selectedOption={selectedUser}
            setSelectedOption={setSelectedUser}
            fixedHeight={false}
            OPTIONS={usersData?.data}
            type="user"
          />
        </div>
      </form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {isToBeUpdated && (
          <div
            onClick={deleteSelectedTask}
            style={{ display: 'flex', gap: '.25em' }}
          >
            <FaTrashAlt />
            {deleletTaskLoading && (
              <Oval color="green" height={15} width={15} />
            )}
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button>Cancel</button>
          <button onClick={taskFunction} disabled={loading}>
            {loading ? <Oval color="white" height={15} width={15} /> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskContainer;
