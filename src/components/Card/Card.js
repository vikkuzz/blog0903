/* eslint-disable no-unused-expressions */

import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Link } from 'react-router-dom';

import './Card.scss';

const Card = ({ card, body }) => {
  const { title, author, createdAt, favoritesCount, tagList, description, slug } = card;

  const { username } = author;

  let idTag = 0;

  const tags = tagList.map((tag) => {
    idTag += 1;
    return (
      <div key={idTag} className="card__content-tags--elem1">
        {tag}
      </div>
    );
  });

  let { image } = author;

  !image ? (image = 'background-avatar.png') : null;

  const fullText = body ? card.body : null;

  const date = new Date(createdAt);

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__content">
          <div className="card__content-header">
            <div className="card__content-title">
              <Link to={`/articles/:${slug}`}>
                <h5 className="card__title">{title}</h5>
              </Link>
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
      <ReactMarkdown className="card__fullText">{fullText}</ReactMarkdown>
    </div>
  );
};

export default Card;
