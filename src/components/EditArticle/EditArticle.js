/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';

import { editMyArticle } from '../../redux/actions/articlesActions';

import './EditArticle.scss';

const EditArticle = () => {
  const dispatch = useDispatch();
  const { loading, error, editArticle } = useSelector((state) => state.articlesReducer);
  const { tagList } = editArticle;
  const { user } = useSelector((state) => state.userReducer);
  const { watch, register, handleSubmit, setValue } = useForm();
  const [articleCompletedSuccessfully, setArticleCompletedSuccessfully] = useState(false);

  const watchTag = watch('tagList', false);
  const [textTags, setTextOfTags] = useState(tagList);
  let countIdx = 0;

  const onSubmit = (data) => {
    const articleData = { ...data };
    articleData.tagList = [...textTags, data.tagList];
    dispatch(editMyArticle(articleData, user.token, editArticle.slug));
    !error ? setArticleCompletedSuccessfully(true) : null;
  };

  if (articleCompletedSuccessfully) {
    return <Redirect to="/" />;
  }

  if (user) {
    if (user.username !== editArticle.author.username) {
      return <Redirect to="/" />;
    }
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
    <div className="edit-article__form-label edit-article__label-tag ">
      <button
        className="edit-article__form-input edit-article__tag"
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
    <div className="edit-article__loading">
      <Spin size="large" />
    </div>
  );

  const handleChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      textTags.includes(watchTag) ? setValue('tagList', '') : !watchTag ? null : setTextOfTags([...textTags, watchTag]);
      setValue('tagList', '');
    }
  };

  const isLoading = loading ? load : null;
  const gotAnError = error ? 'Не удалось обновить статью' : null;

  return (
    <form className="edit-article" onSubmit={handleSubmit(onSubmit)}>
      <legend className="edit-article__title">Редактировать статью</legend>
      <fieldset className="edit-article__form">
        <label className="edit-article__form-label">
          <span className="edit-article__title-form">Название</span>
          <input
            className="edit-article__form-input"
            name="title"
            type="text"
            placeholder="Название статьи"
            ref={register({ required: true })}
            defaultValue={editArticle.title}
          />
        </label>

        <label className="edit-article__form-label">
          <span className="edit-article__title-form">Краткое описание</span>
          <input
            className="edit-article__form-input"
            type="text"
            name="description"
            placeholder="Краткое описание"
            ref={register({ required: true })}
            defaultValue={editArticle.description}
          />
        </label>

        <label className="edit-article__form-label">
          <span className="edit-article__title-form">Текст статьи</span>
          <textarea
            className="edit-article__form-input edit-article__textarea"
            ref={register({ required: true })}
            name="body"
            placeholder="Текст статьи"
            autoCapitalize="true"
            defaultValue={editArticle.body}
          />
        </label>
      </fieldset>
      <fieldset className="edit-article__form">
        <span className="edit-article__title-form">Добавить тэг</span>
        <div className="edit-article__form-wrapper-tags">{elem}</div>

        <label className="edit-article__form-label edit-article__label-tag">
          <input
            className="edit-article__form-input edit-article__tag"
            name="tagList"
            type="text"
            placeholder="тэг"
            ref={register({ required: false })}
            onKeyDown={(e) => handleChange(e)}
          />
          <button
            className="edit-article__submit edit-article__add-tag"
            type="button"
            style={{ background: '#F5222D' }}
            onClick={() => deleteTag(textTags)}
          >
            Удалить
          </button>
          <button
            className="edit-article__submit edit-article__add-tag"
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

      <button className="edit-article__submit" type="submit">
        Отправить
      </button>
      {isLoading}
      {gotAnError}
    </form>
  );
};

export default EditArticle;
