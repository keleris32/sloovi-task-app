import React, { useState } from 'react';
import styles from './Task.module.css';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import TaskContainer from './TaskContainer';

function Task({ refreshComponent }) {
  const [isTaskContainerActive, setIsTaskContainerActive] = useState(false);
  const [isToBeUpdated, setIsToBeUpdated] = useState(false);
  const [selectedTask, setSelectedTask] = useState(false);

  const { data: user } = useSelector((state) => state.auth);
  const { data: usersData } = useSelector((state) => state.getUsers);
  const { data: tasksData } = useSelector((state) => state.getAllTasks);

  const toggleTaskContainer = () =>
    setIsTaskContainerActive(!isTaskContainerActive);

  const toggleUpdateTaskContainer = () => {
    setIsToBeUpdated(!isToBeUpdated);

    toggleTaskContainer();
  };

  const getSelectedTask = (task) => {
    setSelectedTask(task);

    toggleUpdateTaskContainer();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span>Tasks</span>
          <span>{tasksData.length ?? 0}</span>
        </div>
        <div className={styles.headerIcon} onClick={toggleTaskContainer}>
          <FaPlus />
        </div>
      </div>
      {!isTaskContainerActive ? (
        tasksData?.map((task) => (
          <div key={task?.id}>
            <TaskCard
              image={user?.icon}
              message={task?.task_msg}
              date={task?.task_date}
              task={task}
              getSelectedTask={getSelectedTask}
            />
          </div>
        ))
      ) : (
        <div>
          <TaskContainer
            usersData={usersData}
            selectedTask={selectedTask}
            toggleTaskContainer={toggleTaskContainer}
            isToBeUpdated={isToBeUpdated}
            toggleUpdateTaskContainer={toggleUpdateTaskContainer}
            refreshComponent={refreshComponent}
          />
        </div>
      )}
    </div>
  );
}

export default Task;
