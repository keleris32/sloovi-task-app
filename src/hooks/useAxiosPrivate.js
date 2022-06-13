import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import useSelector from 'react-redux';

const useAxiosPrivate = () => {
  const { data } = useSelector((state) => state.auth);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = `Bearer ${data?.token}`;

        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      // cleanup interceptor
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [data]);

  return axiosPrivate;
};

export default useAxiosPrivate;
