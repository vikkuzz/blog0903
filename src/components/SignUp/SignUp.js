/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { registrationFetchData } from '../../redux/actions';
import Spinner from '../Spinner';

import './SignUp.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.loadingReducer);
  const { watch, register, handleSubmit, getValues, errors } = useForm();

  const onSubmit = (data) => {
    dispatch(registrationFetchData(data));
  };

  const watchPassword = watch('password', false);
  const watchPasswordRepeat = watch('passwordRepeat', false);

  let inputClass = 'sign-up__form-input';

  if (watchPassword !== watchPasswordRepeat) {
    inputClass += ' sign-up__input-invalid';
  } else inputClass = 'sign-up__form-input';

  const load = (
    <div className="sign-up__loading">
      <Spinner />
    </div>
  );
  const isLoading = loading ? load : null;

  const gotAnError = error ? 'Ой, что-то пошло не так!' : null;

  return (
    <form className="sign-up" onSubmit={handleSubmit(onSubmit)}>
      <legend className="sign-up__title">Создать новый аккаунт</legend>
      <fieldset className="sign-up__form">
        <label className="sign-up__form-label">
          <span className="sign-up__title-form">Юзернейм</span>
          <input
            className="sign-up__form-input"
            name="username"
            type="text"
            placeholder="Юзернейм"
            ref={register({ required: true, minLength: 3, maxLength: 20 })}
          />
        </label>

        <label className="sign-up__form-label">
          <span className="sign-up__title-form">Электронная почта</span>
          <input
            className="sign-up__form-input"
            type="email"
            name="email"
            placeholder="Электронная почта"
            ref={register({ required: true })}
          />
        </label>

        <label className="sign-up__form-label">
          <span className="sign-up__title-form">Пароль</span>
          <input
            className={inputClass}
            type="password"
            ref={register({ required: true, minLength: 6, maxLength: 40 })}
            name="password"
            placeholder="Пароль"
          />
          {errors.password && <p className="sign-up__rulls">пароль должен состоять минимум из 6 символов</p>}
        </label>

        <label className="sign-up__form-label">
          <span className="sign-up__title-form">Повторить пароль</span>
          <input
            className={inputClass}
            ref={register({
              required: true,
              minLength: 6,
              maxLength: 40,
              validate: { sameAsPass: (value) => value === getValues('password') },
            })}
            type="password"
            name="passwordRepeat"
            placeholder="Повторить пароль"
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
        Уже есть аккаунт? <Link to="-">Залогиниться</Link>
      </span>
      {isLoading}
      {gotAnError}
    </form>
  );
};

export default SignUp;
