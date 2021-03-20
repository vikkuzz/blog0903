const initialState = {
  loading: true,
  error: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_LOADING':
      return { ...state, loading: true, error: false };

    case 'FINISH_LOADING':
      return { ...state, loading: false };

    case 'CATCH_ERROR':
      return { ...state, error: true, loading: false };

    default:
      return state;
  }
};

export default loadingReducer;
