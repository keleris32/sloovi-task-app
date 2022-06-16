import { Link } from 'react-router-dom';
import styles from './NotFoundRoute.module.css';

const NotFoundRoute = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>404</h1>
        <h2>Oops! The page you requested was not found</h2>
        <Link
          to="/login"
          style={{
            textDecoration: 'none',
            cursor: 'auto',
          }}
        >
          <button className={styles.button}>Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundRoute;
