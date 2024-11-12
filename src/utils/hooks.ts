import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hook';
import { setDataUser, setToken } from '../redux/features/authSlice';
import { getDataFromLocalStorage, KEY_STORAGE } from '../local/config';

export const usePageAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = getDataFromLocalStorage(KEY_STORAGE.TOKEN);

  useEffect(() => {
    if (token) {
      dispatch(setToken(getDataFromLocalStorage(KEY_STORAGE.TOKEN)));
      dispatch(setDataUser(getDataFromLocalStorage(KEY_STORAGE.USER)));
      navigate('/homedetails');
    } else {
      navigate('/');
    }
  }, [dispatch, token, navigate]);
};
