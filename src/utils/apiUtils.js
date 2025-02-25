// src/utils/apiUtils.js
import { useSnackbar } from './SnackbarContext';
import { useDispatch } from 'react-redux';

const useApiFetcher = () => {
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const fetchData = async (action, snackbarMessages) => {
    const { success, error, error2 } = snackbarMessages;
    try {
      const result = await dispatch(action);
      if (result.type.endsWith('/fulfilled')) {
        showSnackbar(success, 'SUCCESS');
      } else if (result.type.endsWith('/rejected')) {
        showSnackbar(error, 'ERROR');
      }
    } catch (err) {
      showSnackbar(error2, 'ERROR');
      console.error('fetchData error:', err);
    }
  };

  return { fetchData };
};

export default useApiFetcher;
