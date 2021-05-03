/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { debounce, throttle } from 'lodash';

import {
  articlesFetchData,
  getEditMyArticle,
  deleteArticle,
  iLikeThisArticle,
  dislikeThisArticle,
} from '../../redux/actions/articlesActions';

import heart from '../../img/heart.svg';
import redHeart from '../../img/redHeart.svg';
import backgroundAvatar from '../../img/background-avatar.png';

import './Card.scss';

const Card = ({ card, body }) => {
  const { title, author, createdAt, favoritesCount, favorited, tagList, description, slug } = card;
  const { user } = useSelector((state) => state.userReducer);
  const { articles, page } = useSelector((state) => state.articlesReducer);
  const [showModal, setShowModal] = useState(false);
  const [likeThisArticle, setLikeThisArticle] = useState(favorited);
  const [countLikeThisArticle, setCountLikeThisArticle] = useState(favoritesCount);
  const dispatch = useDispatch();
  const { username, image } = author;
  let idTag = 0;
  let articleEditButtons = null;
  const avatar = !image ? backgroundAvatar : image;
  const fullText = body ? card.body : null;

  useEffect(() => {
    setLikeThisArticle(favorited);
  }, [card]);

  const like = likeThisArticle ? redHeart : heart;

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
        className="card__submit card__btn-delete"
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        {' '}
      </button>

      <Link to={`/articles/${slug}/edit`}>
        <button className="card__submit card__btn-edit" type="button" onClick={() => dispatch(getEditMyArticle(card))}>
          {' '}
        </button>
      </Link>
      {modal}
    </div>
  );

  if (body) {
    articleEditButtons = user.username === username ? buttons : null;
  }

  let redirect = null;

  if (!user) {
    redirect = (
      <Link to="/sign-in">
        <img alt="likes" className="card__content-heart" src={like} />
        <span className="card__heart-counter">{countLikeThisArticle}</span>
      </Link>
    );
  } else {
    redirect = (
      <>
        <img alt="likes" className="card__content-heart" src={like} />
        <span className="card__heart-counter">{countLikeThisArticle}</span>
      </>
    );
  }

  const handleLike = () => {
    if (user) {
      if (likeThisArticle) {
        setLikeThisArticle(false);
        setCountLikeThisArticle((prev) => prev - 1);
        //dispatch(dislikeThisArticle(slug, user.token));
      } else {
        //dispatch(iLikeThisArticle(slug, user.token));
        setLikeThisArticle(true);
        setCountLikeThisArticle((prev) => prev + 1);
      }
    }
  };

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
              <button type="button" className="card__heart" onClick={handleLike}>
                {redirect}
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
