/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { updateProfile, clearErrorMessage } from '../../redux/actions/userActions';
import Spinner from '../Spinner';

import './Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { loading, error } = useSelector((state) => state.userReducer);
  const { errorMessage } = useSelector((state) => state.loadingReducer);
  const { register, handleSubmit, errors } = useForm({ criteriaMode: 'all', mode: 'onChange' });
  const [articleCompletedSuccessfully, setArticleCompletedSuccessfully] = useState(false);

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
    !error ? setArticleCompletedSuccessfully(true) : null;
  };

  if (articleCompletedSuccessfully) {
    return <Redirect to="/" />;
  }

  const load = (
    <div className="profile__loading">
      <Spinner />
    </div>
  );

  const isLoading = loading ? load : null;
  const gotAnError = error ? 'Ой, что-то пошло не так!' : null;

  if (!user) {
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
