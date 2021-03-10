/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import './Card.scss';

const Card = ({ card }) => {
  const { title, author } = card;

  const { username, image } = author;

  return (
    <div className="card">
      <div className="card__content">
        <div className="card__content-header">
          <div className="card__content-title">
            <h5 className="card__title">{title}</h5>
            <button type="button" className="card__heart">
              <img alt="likes" className="card__content-heart" src="./heart.svg" />
              <span className="card__heart-counter">0</span>
            </button>
          </div>
          <div className="card__content-tags">
            <div className="card__content-tags--elem1">tag1</div>
            <div className="card__content-tags--elem1">Some tag</div>
          </div>
        </div>
        <div className="card__content-text">
          Ea minim velit ullamco sunt amet dolore aute magna veniam pariatur incididunt commodo. Ea minim velit ullamco
          sunt amet dolore aute magna veniam pariatur incididunt commodo.
        </div>
      </div>
      <div className="card__author">
        <div className="card__author-info">
          <div className="card__author-name">{username}</div>
          <div className="card__author-date">some date</div>
        </div>
        <div className="card__author-avatar">
          <img src={image} width="46px" />
        </div>
      </div>
    </div>
  );
};

export default Card;
