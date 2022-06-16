import React from 'react';
import styles from './Sidebar.module.css';

function Sidebar({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imgCon}>
          <img src={data?.icon} alt="User" />
        </div>
        <h3>{data?.name}</h3>
      </div>
    </div>
  );
}

export default Sidebar;
