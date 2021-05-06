/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';

import { createNewArticle } from '../../redux/actions/articlesActions';

import './UserArticle.scss';

const UserArticle = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.articlesReducer);
  const { user } = useSelector((state) => state.userReducer);
  const { watch, register, handleSubmit, setValue } = useForm();

  const watchTag = watch('tagList', false);
  const [textTags, setTextOfTags] = useState([]);
  const [articleCompletedSuccessfully, setArticleCompletedSuccessfully] = useState(false);
  let countIdx = 0;
  let disableStyle = 'article__del-button--hide';

  const onSubmit = (data) => {
    const articleData = { ...data };
    articleData.tagList = [...textTags, data.tagList];
    dispatch(createNewArticle(articleData, user.token));
    !error ? setArticleCompletedSuccessfully(true) : null;
  };

  if (articleCompletedSuccessfully) {
    return <Redirect to="/" />;
  }

  const newTextTags = (text, arr) => {
    const result = arr.filter((elem) => elem !== text);
    return result;
  };

  const deleteTag = (arr) => {
    const elem = arr[arr.length - 1];
    const result = arr.slice(0, arr.length - 1);
    setTextOfTags(result);
    setValue('tagList', elem);
  };

  const ElemOfTags = ({ text }) => (
    <div className="article__form-label article__label-tag ">
      <button
        className="article__form-input article__tag"
        type="button"
        onClick={() => setTextOfTags(newTextTags(text, textTags))}
      >
        {text}
      </button>
    </div>
  );

  const elem = textTags.map((item) => {
    countIdx += 1;
    return <ElemOfTags key={countIdx} text={item} />;
  });

  const load = (
    <div className="article__loading">
      <Spin size="large" />
    </div>
  );

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
            name="body"
            placeholder="Текст статьи"
            autoCapitalize="true"
          />
        </label>
      </fieldset>
      <fieldset className="article__form">
        <span className="article__title-form">Добавить тэг</span>
        <div className="article__form-wrapper-tags">{elem}</div>
        <label className="article__form-label article__label-tag">
          <input
            className="article__form-input article__tag"
            name="tagList"
            type="text"
            placeholder="тэг"
            ref={register({ required: false })}
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
                ? setValue('tagList', '')
                : !watchTag
                ? null
                : setTextOfTags([...textTags, watchTag]);
              setValue('tagList', '');
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
