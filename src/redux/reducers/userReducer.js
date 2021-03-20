const initialState = {
  token: null,
};

const userReducer = (state = initialState, action) => {
  let { token } = state;
  switch (action.type) {
    case 'GET_TOKEN':
      token = action.user.user.token;
      return { ...state, token };

    default:
      return state;
  }
};

export default userReducer;
