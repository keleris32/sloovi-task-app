import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import Logo from '../../assets/sloovi.png';
import { loginValidationSchema } from './validationSchema';
import AnimatedPage from '../../components/AnimatedPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from '../../app/features/actionCreators/authActionCreator';
import { Oval } from 'react-loader-spinner';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get url path where user was redirected from
  const from = location.state?.from?.pathname || '/';

  const [isErrorAlertActive, setIsErrorAlertActive] = useState(false);

  const toggleErrorAlert = () => setIsErrorAlertActive(!isErrorAlertActive);
  const navigateBackToHomeRoute = () => navigate(from, { replace: true });

  const { data, loading, error } = useSelector((state) => state.auth);

  const submitForm = (formData) => {
    formData.email = formData.email.toLowerCase();

    dispatch(loginUser(formData, toggleErrorAlert, navigateBackToHomeRoute));
  };

  useEffect(() => {
    if (data?.token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [isErrorAlertActive]);

  return (
    <div className={styles.container}>
      <AnimatedPage>
        <div className={styles.wrapper}>
          <div className={styles.logoCon}>
            <img src={Logo} alt="Sloovi logo" />
          </div>
          <Formik
            initialValues={{
              email: 'smithwills1989@gmail.com',
              password: '12345678',
            }}
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              submitForm(values);
            }}
          >
            {(props) => (
              <form className={styles.form} onSubmit={props.handleSubmit}>
                <h2>Login</h2>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email.trim()}
                />
                {props.errors.email && props.touched.email && (
                  <p className={styles.error}>{props.errors.email}</p>
                )}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password.trim()}
                />
                {props.errors.password && props.touched.password && (
                  <p className={styles.error}>{props.errors.password}</p>
                )}
                <button type="submit" disabled={loading}>
                  {loading ? (
                    <Oval color="white" height={25} width={25} />
                  ) : (
                    'Login'
                  )}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </AnimatedPage>
    </div>
  );
}

export default Login;
