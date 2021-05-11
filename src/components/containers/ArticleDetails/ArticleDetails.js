/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Spin } from 'antd';

import Api from '../../../services/Api';
import EditArticle from '../../EditArticle';

import './ArticlesDetailes.scss';

const ArticleDetails = ({ itemID }) => {
  const { user } = useSelector((state) => state.userReducer);
  const [myArticle, setMyArticle] = useState(null);
  const localArticle = 'localArticle';

  useEffect(() => {
    const api = new Api();
    api.getOneArticle(itemID).then((res) => setMyArticle(res));
  }, []);

  localStorage.setItem(localArticle, myArticle);

  if (!myArticle) {
    return (
      <div className="articles-datailes__spin">
        <Spin size="large" />
      </div>
    );
  }

  if (user.username !== myArticle.article.author.username) {
    return <Redirect to="/" />;
  }

  return <EditArticle editArticle={myArticle.article} />;
};

export default ArticleDetails;
