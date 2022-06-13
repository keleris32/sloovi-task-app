import React from 'react';
import styles from './Task.module.css';
import { FaPlus } from 'react-icons/fa';

function Task() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span>Tasks</span>
          <span>0</span>
        </div>
        <div className={styles.headerIcon}>
          <FaPlus />
        </div>
      </div>
    </div>
  );
}

export default Task;
