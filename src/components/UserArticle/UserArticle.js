/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
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
  const { watch, register, handleSubmit, getValues, errors, setValue } = useForm();
  const [cookies, setCookie] = useCookies();

  let watchTag = watch('thisistag', false);

  const onSubmit = (data) => {
    dispatch(registrationFetchData(data));
  };

  let [textTags, setTextOfTags] = useState([]);

  let countIdx = 0;

  const newTextTags = (text, arr) => {
    let result = arr.filter((elem) => elem !== text);
    return result;
  };

  const deleteTag = (arr) => {
    let elem = arr[arr.length - 1];
    let result = arr.slice(0, arr.length - 1);
    setTextOfTags(result);
    setValue('thisistag', elem);
  };

  const ElemOfTags = ({ text }) => {
    return (
      <div className="article__form-label article__label-tag ">
        <div className="article__form-input article__tag" style={{ textAlign: 'center' }}>
          {text}
        </div>
        <button
          className="article__submit article__add-tag"
          type="button"
          style={{ background: '#F5222D' }}
          onClick={() => setTextOfTags(newTextTags(text, textTags))}
        >
          Удалить
        </button>
      </div>
    );
  };

  const elem = textTags.map((item) => {
    countIdx += 1;
    return <ElemOfTags key={countIdx} text={item} />;
  });

  const load = (
    <div className="article__loading">
      <Spinner />
    </div>
  );

  let disableStyle = 'article__del-button--hide';
  textTags.length > 0 ? (disableStyle = 'article__del-button--view') : (disableStyle = 'article__del-button--hide');

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
        <label className="article__form-label article__label-tag">
          <input
            className="article__form-input article__tag"
            name="thisistag"
            type="text"
            placeholder="тэг"
            ref={register({ required: true })}
          />
          <button
            className={`article__submit article__add-tag ${disableStyle}`}
            type="button"
            style={{ background: '#F5222D' }}
            onClick={() => deleteTag(textTags)}
          >
            Удалить
          </button>
          <button
            className="article__submit article__add-tag"
            type="button"
            onClick={() => {
              textTags.includes(watchTag)
                ? setValue('thisistag', '')
                : !watchTag
                ? null
                : setTextOfTags([...textTags, watchTag]);
              setValue('thisistag', '');
            }}
          >
            Добавить
          </button>
        </label>
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
