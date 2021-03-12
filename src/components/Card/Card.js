/* eslint-disable no-unused-expressions */

import React from 'react';

import './Card.scss';

const Card = ({ card }) => {
  const { title, author, createdAt, favoritesCount, tagList, description } = card;

  const { username } = author;

  const tags = tagList.map((tag) => <div className="card__content-tags--elem1">{tag}</div>);

  let { image } = author;

  !image ? (image = 'background-avatar.png') : null;

  const date = new Date(createdAt);

  return (
    <div className="card">
      <div className="card__content">
        <div className="card__content-header">
          <div className="card__content-title">
            <h5 className="card__title">{title}</h5>
            <button type="button" className="card__heart">
              <img alt="likes" className="card__content-heart" src="./heart.svg" />
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
        </div>
        <div className="card__author-avatar">
          <img alt="avatar" src={image} width="46px" />
        </div>
      </div>
    </div>
  );
};

export default Card;
