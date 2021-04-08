/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { articlesFetchData, getEditMyArticle, deleteArticle, iLikeThisArticle } from '../../redux/actions';

import heart from '../../img/heart.svg';
import redHeart from '../../img/redHeart.svg';
import backgroundAvatar from '../../img/background-avatar.png';

import './Card.scss';

const Card = ({ card, body }) => {
  const { title, author, createdAt, favoritesCount, favorited, tagList, description, slug } = card;
  const { user } = useSelector((state) => state.userReducer);
  const { page } = useSelector((state) => state.articlesReducer);
  const [showModal, setShowModal] = useState(false);
  const { username, image } = author;
  let idTag = 0;
  let articleEditButtons = null;
  const avatar = !image ? backgroundAvatar : image;
  const fullText = body ? card.body : null;
  const dispatch = useDispatch();

  const like = favorited ? redHeart : heart;

  const tags = tagList.map((tag) => {
    idTag += 1;
    return (
      <div key={idTag} className="card__content-tags--elem">
        {tag}
      </div>
    );
  });

  let disableStyle = 'card__modal--hide';
  showModal ? (disableStyle = 'card__modal--view') : (disableStyle = 'card__modal--hide');

  const modal = (
    <div className={disableStyle}>
      <span>Действительно удалить?</span>
      <div className="card__modal-buttons">
        <Link to="/">
          <button
            type="button"
            onClick={() => {
              dispatch(deleteArticle(user.token, slug));
            }}
          >
            ДА
          </button>
        </Link>
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
          }}
        >
          НЕТ
        </button>
      </div>
    </div>
  );

  const buttons = (
    <div className="card__buttons">
      <button
        className="card__submit"
        type="button"
        style={{ background: '#F5222D' }}
        onClick={() => {
          setShowModal(true);
        }}
      >
        Удалить
      </button>

      <Link to={`/articles/${slug}/edit`}>
        <button className="card__submit" type="button" onClick={() => dispatch(getEditMyArticle(card))}>
          Редактировать
        </button>
      </Link>
      {modal}
    </div>
  );

  if (user) {
    articleEditButtons = user.username === username ? buttons : null;
  }

  const date = new Date(createdAt);

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__content">
          <div className="card__content-header">
            <div className="card__content-title">
              <Link to={`/articles/${slug}`}>
                <h5 className="card__title">{title}</h5>
              </Link>
              <button
                type="button"
                className="card__heart"
                onClick={() => {
                  if (user) {
                    dispatch(iLikeThisArticle(slug, user.token));
                    dispatch(articlesFetchData(page * 20 - 20, user.token));
                  }
                }}
              >
                <img alt="likes" loading="lazy" className="card__content-heart" src={like} />
                <span className="card__heart-counter">{favoritesCount}</span>
              </button>
            </div>
            <div className="card__content-tags">{tags}</div>
          </div>
          <div className="card__content-text">{description}</div>
        </div>
        <div className="card__author">
          <div className="card__author-info">
            <div className="card__author-name">{username}</div>
            <div className="card__author-date">{date.toDateString().slice(4)}</div>
            {articleEditButtons}
          </div>
          <div className="card__author-avatar">
            <img
              alt="avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = backgroundAvatar;
              }}
              src={avatar}
              width="46px"
            />
          </div>
        </div>
      </div>
      <ReactMarkdown className="card__fullText">{fullText}</ReactMarkdown>
    </div>
  );
};

export default Card;
