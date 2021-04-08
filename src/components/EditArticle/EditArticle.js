/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { editMyArticle } from '../../redux/actions';
import Spinner from '../Spinner';

import './EditArticle.scss';

const EditArticle = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.loadingReducer);
  const { editArticle } = useSelector((state) => state.articlesReducer);
  const { tagList } = editArticle;
  const { token } = useSelector((state) => state.userReducer);
  const { watch, register, handleSubmit, setValue } = useForm();
  const [articleCompletedSuccessfully, setArticleCompletedSuccessfully] = useState(false);

  const watchTag = watch('tagList', false);
  const [textTags, setTextOfTags] = useState(tagList);
  let countIdx = 0;
  let disableStyle = 'edit-article__del-button--hide';

  const onSubmit = (data) => {
    const articleData = { ...data };
    articleData.tagList = [...textTags, data.tagList];
    dispatch(editMyArticle(articleData, token, editArticle.slug));
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
    <div className="edit-article__form-label edit-article__label-tag ">
      <div className="edit-article__form-input edit-article__tag" style={{ textAlign: 'center' }}>
        {text}
      </div>
      <button
        className="edit-article__submit edit-article__add-tag"
        type="button"
        style={{ background: '#F5222D' }}
        onClick={() => setTextOfTags(newTextTags(text, textTags))}
      >
        Удалить
      </button>
    </div>
  );

  const elem = textTags.map((item, i) => {
    countIdx += 1;
    return <ElemOfTags key={countIdx} text={item} />;
  });

  const load = (
    <div className="edit-article__loading">
      <Spinner />
    </div>
  );

  textTags.length > 0
    ? (disableStyle = 'edit-article__del-button--view')
    : (disableStyle = 'edit-article__del-button--hide');
  const isLoading = loading ? load : null;
  const gotAnError = error ? 'Ой, что-то пошло не так!' : null;

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
        {elem}
        <label className="edit-article__form-label edit-article__label-tag">
          <input
            className="edit-article__form-input edit-article__tag"
            name="tagList"
            type="text"
            placeholder="тэг"
            ref={register({ required: false })}
          />
          <button
            className={`edit-article__submit edit-article__add-tag ${disableStyle}`}
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
