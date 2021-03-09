/* eslint-disable no-case-declarations */
const initialState = {
  test: '',
};

const test = (state = initialState, action) => {
  switch (action.type) {
    case 'test':
      const testValue = action.test + 1;
      return { ...state, testValue };

    default:
      return state;
  }
};

export default test;
