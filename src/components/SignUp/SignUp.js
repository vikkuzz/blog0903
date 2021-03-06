/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

import { registrationFetchData, clearErrorMessage } from '../../redux/actions/userActions';

import './SignUp.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const { user, loading, error, errorMessage } = useSelector((state) => state.userReducer);
  const { watch, register, handleSubmit, getValues, errors } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });
  const [cookies, setCookie] = useCookies();
  const [inputValue, setInputValue] = useState('');

  let serverUsernameError = false;
  let serverEmailError = false;
  const usernameErrorMessage = 'такое имя уже существует';
  const emailErrorMessage = 'такая почта уже зарегистрирована';
  let errorUserMessage = null;
  let errorEmailMessage = null;

  if (errorMessage) {
    const { username, email } = errorMessage;
    username ? (serverUsernameError = true) : (serverUsernameError = false);
    errorUserMessage = username ? usernameErrorMessage : null;
    email ? (serverEmailError = true) : (serverEmailError = false);
    errorEmailMessage = email ? emailErrorMessage : null;
  }

  const onSubmit = (data) => {
    dispatch(registrationFetchData(data));
  };
  const watchPassword = watch('password', false);
  const watchPasswordRepeat = watch('passwordRepeat', false);

  useEffect(() => {
    if (user) {
      setCookie('token', user.token, { path: '/' });
    }
  });
  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);

  let inputClass = 'sign-up__form-input';

  if (watchPassword !== watchPasswordRepeat) {
    inputClass += ' sign-up__input-invalid';
  } else inputClass = 'sign-up__form-input';

  if (user) {
    return <Redirect to="/" />;
  }

  const gotAnError = error ? 'Не получилось зарегистрироваться, проверьте ваши данные' : null;

  return (
    <form autoComplete="off" className="sign-up" onSubmit={handleSubmit(onSubmit)}>
      <legend className="sign-up__title">Создать новый аккаунт</legend>
      <fieldset className="sign-up__form">
        <label className="sign-up__form-label">
          <span className="sign-up__title-form">Юзернейм</span>
          <input
            autoComplete="off"
            defaultValue={inputValue}
            className="sign-up__form-input"
            name="username"
            type="text"
            placeholder="Юзернейм"
            onChange={(e) => setInputValue(e.target.value)}
            ref={register({ required: true, minLength: 3, maxLength: 20 })}
          />
          {errors?.username?.types?.required && (
            <span className="sign-up__profile-rulls">обязательно к заполнению</span>
          )}
          {errors?.username?.types?.minLength && <span className="sign-up__profile-rulls">минимум 3 символа</span>}
          {errors?.username?.types?.maxLength && <span className="sign-up__profile-rulls">максимум 20 символов</span>}
          <span className="sign-up__profile-rulls">{errorUserMessage}</span>
        </label>

        <label className="sign-up__form-label">
          <span className="sign-up__title-form">Электронная почта</span>
          <input
            className="sign-up__form-input"
            type="email"
            name="email"
            placeholder="Электронная почта"
            autoComplete="off"
            ref={register({ required: true })}
          />
          {errors?.email?.types?.required && <span className="sign-up__profile-rulls">обязательно к заполнению</span>}
          <span className="sign-up__profile-rulls">{errorEmailMessage}</span>
        </label>

        <label className="sign-up__form-label">
          <span className="sign-up__title-form">Пароль</span>
          <input
            className={inputClass}
            type="password"
            ref={register({ required: true, minLength: 8, maxLength: 40 })}
            name="password"
            placeholder="Пароль"
            autoComplete="off"
          />
          {errors.password && <p className="sign-up__rulls">пароль должен состоять минимум из 8 символов</p>}
        </label>

        <label className="sign-up__form-label">
          <span className="sign-up__title-form">Повторить пароль</span>
          <input
            className={inputClass}
            ref={register({
              required: true,
              minLength: 8,
              maxLength: 40,
              validate: { sameAsPass: (value) => value === getValues('password') },
            })}
            type="password"
            name="passwordRepeat"
            placeholder="Повторить пароль"
            autoComplete="off"
          />
          {errors.passwordRepeat && <p className="sign-up__rulls">пароли не совпадают :(</p>}
        </label>
      </fieldset>

      <label>
        <input
          className="sign-up__checkbox-hide"
          name="hide-checkbox"
          type="checkbox"
          ref={register({ required: true })}
        />
        <span className="sign-up__checkbox" />
        <span className="sign-up__checkbox-text">Я даю согласие на обработку моей личной информации</span>
      </label>

      <button className="sign-up__submit" type="submit">
        Создать
      </button>

      <span className="sign-up__have-accaunt">
        Уже есть аккаунт? <Link to="/sign-in">Залогиниться</Link>
      </span>

      {gotAnError}
    </form>
  );
};

export default SignUp;
