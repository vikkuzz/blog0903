/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Spin } from 'antd';

import { getPage, articlesFetchData } from '../../redux/actions/articlesActions';

import Card from '../Card';

import 'antd/dist/antd.css';
import './PostList.scss';

const PostList = () => {
  const dispatch = useDispatch();
  const { articles, articlesCount, page, error, loading } = useSelector((state) => state.articlesReducer);

  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (user) {
      dispatch(articlesFetchData(page * 20 - 20, user.token));
    } else {
      dispatch(articlesFetchData());
    }
  }, [page]);

  const elem = articles.map((item) => <Card card={item} key={item.slug} />);
  const errorMessage = error ? 'Произошла ошибка при загрузке статей' : null;

  const spinner = loading ? (
    <div className="app__spin">
      <Spin size="large" />
    </div>
  ) : null;

  return (
    <div className="post-list">
      {elem}
      {spinner}
      {errorMessage}

      <Pagination
        size="small"
        total={articlesCount}
        showSizeChanger={false}
        current={page}
        onChange={(value) => {
          window.scroll(0, 0);
          dispatch(getPage(value));
          dispatch(articlesFetchData(value * 20 - 20));
        }}
      />
    </div>
  );
};

export default PostList;
