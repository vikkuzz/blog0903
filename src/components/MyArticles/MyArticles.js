/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Spin } from 'antd';

import { getMyArticles } from '../../redux/actions/articlesActions';

import Card from '../Card';

import 'antd/dist/antd.css';
import './MyArticles.scss';

const MyArticles = () => {
  const dispatch = useDispatch();
  const { articles, myArticles, page, error, loading } = useSelector((state) => state.articlesReducer);

  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (user) {
      dispatch(getMyArticles(user.username, user.token));
    }
  }, [user]);

  const elem = myArticles.map((item) => <Card card={item} key={item.slug} />);
  const errorMessage = error ? 'Произошла ошибка при загрузке статей' : null;

  const spinner = loading ? (
    <div className="app__spin">
      <Spin size="large" />
    </div>
  ) : null;

  const paginator = <Pagination size="small" total={myArticles.length} showSizeChanger={false} current={page} />;

  const pagination = myArticles.length ? paginator : 'У вас пока нет статей';

  return (
    <div className="post-list">
      {elem}
      {spinner}
      {errorMessage}

      {pagination}
    </div>
  );
};

export default MyArticles;
