const initialState = {
  user: null,
  loading: false,
  error: false,
  errorMessage: null,
};

const userReducer = (state = initialState, action) => {
  let { user, errorMessage } = state;
  switch (action.type) {
    case 'LOGIN_USER':
      user = action.user.user;
      return { ...state, user };

    case 'LOGOUT':
      user = null;
      return { ...state, user };

    case 'UPDATE_USER_PROFILE':
      user = action.data.user;
      return { ...state, user };

    case 'USER_DATA_REJECTED':
      errorMessage = action.error;
      console.log(errorMessage);
      return { ...state, loading: false, error: true, errorMessage };

    case 'USER_DATA_PENDING':
      return { ...state, loading: true, error: false };

    case 'USER_DATA_FULLFIELD':
      return { ...state, loading: false, error: false };

    case 'CATCH_ERROR':
      errorMessage = action.error;
      return { ...state, error: true, loading: false, errorMessage };

    case 'CLEAR_ERROR_MESSAGE':
      errorMessage = null;
      return { ...state, errorMessage };

    default:
      return state;
  }
};

export default userReducer;
