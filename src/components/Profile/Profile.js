/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { updateProfile } from '../../redux/actions';
import Spinner from '../Spinner';

import './Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.userReducer);
  const { loading, error } = useSelector((state) => state.loadingReducer);
  const { errorMessage } = useSelector((state) => state.loadingReducer);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    dispatch(updateProfile(data, token));
  };

  console.log(errorMessage);

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
            className="profile__form-input"
            name="username"
            type="text"
            placeholder="Юзернейм"
            ref={register({ required: true, minLength: 3, maxLength: 20 })}
          />
          {errors.username && <p className="profile__rulls">никнейм минимум из 3 символов</p>}
        </label>

        <label className="profile__form-label">
          <span className="profile__title-form">Электронная почта</span>
          <input
            className="profile__form-input"
            type="email"
            name="email"
            placeholder="Электронная почта"
            ref={register({ required: true })}
          />
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
          {errors.password && <p className="profile__rulls">пароль должен состоять минимум из 6 символов</p>}
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
          {errors.password && <p className="profile__rulls">URL должен быть валидным</p>}
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
