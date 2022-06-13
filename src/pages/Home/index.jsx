import React from 'react';
import Dashboard from '../../containers/Dashboard';
import Sidebar from '../../containers/Sidebar';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default Home;
