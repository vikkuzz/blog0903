const initialState = {
  token: null,
  user: null,
};

const userReducer = (state = initialState, action) => {
  let { token, user } = state;
  switch (action.type) {
    case 'LOGIN_USER':
      user = action.user.user;
      token = action.user.user.token;
      return { ...state, user, token };

    case 'LOGOUT':
      user = null;
      return { ...state, user };

    case 'UPDATE_USER_PROFILE':
      user = action.data.user;
      return { ...state, user };

    default:
      return state;
  }
};

export default userReducer;
