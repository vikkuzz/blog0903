/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Spin } from 'antd';

import { getPage, articlesFetchData, getMyArticles } from '../../redux/actions/articlesActions';

import Card from '../Card';

import 'antd/dist/antd.css';
import './PostList.scss';

const PostList = () => {
  const dispatch = useDispatch();
  const { articles, articlesCount, page, error, loading } = useSelector((state) => state.articlesReducer);

  const { user } = useSelector((state) => state.userReducer);

  const elem = articles.map((item) => <Card card={item} key={item.slug} />);
  const errorMessage = error ? 'Произошла ошибка при загрузке статей' : null;

  return (
    <div className="post-list">
      {elem}
      {errorMessage}

      <Pagination
        size="small"
        total={articlesCount}
        showSizeChanger={false}
        current={page}
        onChange={(value) => {
          dispatch(getPage(value));
          dispatch(articlesFetchData(value * 20 - 20));
          window.scroll(0, 0);
        }}
      />
    </div>
  );
};

export default PostList;
