const initialState = {
  test: "",
};

const test = (state = initialState, action) => {
  switch (action.type) {
    case "test":
      let test = action.test + 1;
      return { ...state, test };

    default:
      return state;
  }
};

export default test;
