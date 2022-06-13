import React from 'react';
import styles from './Dashboard.module.css';
import { Task } from '../../components';

function Dashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header} />
      <div>
        <Task />
      </div>
    </div>
  );
}

export default Dashboard;
