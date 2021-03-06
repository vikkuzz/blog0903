/* eslint-disable no-unused-expressions */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';

import { updateProfile, clearErrorMessage } from '../../redux/actions/userActions';

import './Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, errorMessage, userProfileUpdateSuccessfull } = useSelector(
    (state) => state.userReducer
  );
  const { register, handleSubmit, errors } = useForm({ criteriaMode: 'all', mode: 'onChange' });
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
    dispatch(updateProfile(data, user.token));
  };

  const load = (
    <div className="profile__loading">
      <Spin size="large" />
    </div>
  );

  const isLoading = loading ? load : null;
  const gotAnError = error ? 'Не получилось обновить профиль' : null;

  if (!user || userProfileUpdateSuccessfull) {
    return <Redirect to="/" />;
  }

  return (
    <form className="profile" onSubmit={handleSubmit(onSubmit)}>
      <legend className="profile__title">Редактировать аккаунт</legend>
      <fieldset className="profile__form">
        <label className="profile__form-label">
          <span className="profile__title-form">Юзернейм</span>
          <input
            className={serverUsernameError ? 'profile__form-input profile__input-invalid' : 'profile__form-input'}
            name="username"
            type="text"
            defaultValue={user.username}
            placeholder="Юзернейм"
            ref={register({ required: true, minLength: 3, maxLength: 20 })}
            onChange={() => dispatch(clearErrorMessage())}
          />
          {errors?.username?.types?.required && <span className="profile__rulls">обязательно к заполнению</span>}
          {errors?.username?.types?.minLength && <span className="profile__rulls">минимум 3 символа</span>}
          {errors?.username?.types?.maxLength && <span className="profile__rulls">максимум 20 символов</span>}
          <span className="profile__rulls">{errorUserMessage}</span>
        </label>

        <label className="profile__form-label">
          <span className="profile__title-form">Электронная почта</span>
          <input
            className={serverEmailError ? 'profile__form-input profile__input-invalid' : 'profile__form-input'}
            type="email"
            name="email"
            defaultValue={user.email}
            placeholder="Электронная почта"
            ref={register({ required: true })}
          />
          {errors?.email?.types?.required && <span className="profile__rulls">обязательно к заполнению</span>}
          <span className="profile__rulls">{errorEmailMessage}</span>
        </label>

        <label className="profile__form-label">
          <span className="profile__title-form">Новый пароль</span>
          <input
            className="profile__form-input"
            type="password"
            defaultValue={null}
            ref={register({ required: true, minLength: 6, maxLength: 40 })}
            name="password"
            placeholder="Пароль"
          />
          {errors?.password?.types?.minLength && (
            <span className="profile__rulls">должен быть от 6 до 40 символов</span>
          )}
        </label>

        <label className="profile__form-label">
          <span className="profile__title-form">Аватарка</span>
          <input
            className="profile__form-input"
            type="url"
            ref={register({ required: false })}
            name="image"
            placeholder="URL"
          />
          {errors.image && <p className="profile__rulls">URL должен быть валидным</p>}
        </label>
      </fieldset>

      <button className="profile__submit" type="submit">
        Сохранить
      </button>

      {isLoading}
      {gotAnError}
    </form>
  );
};

export default Profile;
