const initialState = {
  loading: true,
  error: false,
  errorMessage: '',
};

const loadingReducer = (state = initialState, action) => {
  let { errorMessage } = state;
  switch (action.type) {
    case 'SHOW_LOADING':
      return { ...state, loading: true, error: false };

    case 'FINISH_LOADING':
      return { ...state, loading: false };

    case 'CATCH_ERROR':
      errorMessage = action.error;
      return { ...state, error: true, loading: false, errorMessage };

    default:
      return state;
  }
};

export default loadingReducer;
