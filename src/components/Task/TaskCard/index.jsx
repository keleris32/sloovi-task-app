import React from 'react';
import styles from './TaskCard.module.css';
import { MdEdit } from 'react-icons/md';

function TaskCard({ image, message, date, task, getSelectedTask }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imgIcon}>
          <img src={image} alt="user" />
        </div>
        <div className={styles.detailsCon}>
          <h3>{message}</h3>
          <span>{date}</span>
        </div>
      </div>
      <div className={styles.editIcon} onClick={() => getSelectedTask(task)}>
        <MdEdit />
      </div>
    </div>
  );
}

export default TaskCard;
