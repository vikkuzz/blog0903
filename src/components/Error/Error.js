/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';

const Error = () => {
  const { errorMessage } = useSelector((state) => state.loadingReducer);

  return <span>{errorMessage}</span>;
};

export default Error;
