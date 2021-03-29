/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

import { loginFetchData } from '../../redux/actions';
import Spinner from '../Spinner';

import './SignIn.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.loadingReducer);
  const { user } = useSelector((state) => state.userReducer);
  const { register, handleSubmit, errors } = useForm();
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    if (user) {
      setCookie('token', user.token, { path: '/' });
    }
  });

  const onSubmit = (data) => {
    dispatch(loginFetchData(data));
  };

  const load = (
    <div className="sign-in__loading">
      <Spinner />
    </div>
  );
  const isLoading = loading ? load : null;

  const gotAnError = error ? 'Ой, что-то пошло не так!' : null;

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form className="sign-in" onSubmit={handleSubmit(onSubmit)}>
      <legend className="sign-in__title">Залогиниться</legend>
      <fieldset className="sign-in__form">
        <label className="sign-in__form-label">
          <span className="sign-in__title-form">Электронная почта</span>
          <input
            className="sign-in__form-input"
            type="email"
            name="email"
            placeholder="Электронная почта"
            ref={register({ required: true })}
          />
        </label>

        <label className="sign-in__form-label">
          <span className="sign-in__title-form">Пароль</span>
          <input
            className="sign-up__checkbox-text"
            type="password"
            ref={register({ required: true, minLength: 6, maxLength: 40 })}
            name="password"
            placeholder="Пароль"
          />
          {errors.password && <p className="sign-in__rulls">пароль должен состоять минимум из 6 символов</p>}
        </label>
      </fieldset>

      <button className="sign-in__submit" type="submit">
        Логин
      </button>

      <span className="sign-in__have-accaunt">
        Нет аккаунта? <Link to="/sign-up">Зарегаться</Link>
      </span>
      {isLoading}
      {gotAnError}
    </form>
  );
};

export default SignIn;
