/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

import { registrationFetchData } from '../../redux/actions';
import Spinner from '../Spinner';

import './UserArticle.scss';

const UserArticle = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.loadingReducer);
  const { user } = useSelector((state) => state.userReducer);
  const { watch, register, handleSubmit, getValues, errors } = useForm();
  const [cookies, setCookie] = useCookies();

  const onSubmit = (data) => {
    dispatch(registrationFetchData(data));
  };

  let [numOfTags, setNumOfTags] = useState(1);
  console.log(numOfTags);
  let copy = [];
  for (let i = 0; i < numOfTags; i++) {
    copy.push(1);
  }

  const Tag = () => (
    <label className="article__form-label article__label-tag">
      <input
        className="article__form-input"
        name="title"
        type="text"
        placeholder="тэг"
        ref={register({ required: true })}
      />
      <button
        className="article__submit article__add-tag"
        type="button"
        style={{ background: '#F5222D' }}
        onClick={() => setNumOfTags(numOfTags - 1)}
      >
        Удалить
      </button>
      <button className="article__submit article__add-tag" type="button" onClick={() => setNumOfTags(numOfTags + 1)}>
        Добавить
      </button>
    </label>
  );

  const elem = copy.map((item) => {
    return <Tag />;
  });

  const load = (
    <div className="article__loading">
      <Spinner />
    </div>
  );
  const isLoading = loading ? load : null;

  const gotAnError = error ? 'Ой, что-то пошло не так!' : null;

  return (
    <form className="article" onSubmit={handleSubmit(onSubmit)}>
      <legend className="article__title">Создать новую статью</legend>
      <fieldset className="article__form">
        <label className="article__form-label">
          <span className="article__title-form">Название</span>
          <input
            className="article__form-input"
            name="title"
            type="text"
            placeholder="Название статьи"
            ref={register({ required: true })}
          />
        </label>

        <label className="article__form-label">
          <span className="article__title-form">Краткое описание</span>
          <input
            className="article__form-input"
            type="text"
            name="description"
            placeholder="Краткое описание"
            ref={register({ required: true })}
          />
        </label>

        <label className="article__form-label">
          <span className="article__title-form">Текст статьи</span>
          <textarea
            className="article__form-input article__textarea"
            ref={register({ required: true })}
            name="text"
            placeholder="Текст статьи"
            autoCapitalize="true"
          />
        </label>
      </fieldset>
      <fieldset className="article__form">
        <span className="article__title-form">Добавить тэг</span>
        {elem}
      </fieldset>

      <button className="article__submit" type="submit">
        Создать
      </button>

      {isLoading}
      {gotAnError}
    </form>
  );
};

export default UserArticle;
