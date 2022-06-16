import React from 'react';
import { useSelector } from 'react-redux';
import Dashboard from '../../containers/Dashboard';
import Sidebar from '../../containers/Sidebar';
import styles from './Home.module.css';

function Home() {
  const { data } = useSelector((state) => state.auth);

  return (
    <div className={styles.container}>
      <Sidebar data={data} />
      <Dashboard data={data} />
    </div>
  );
}

export default Home;
