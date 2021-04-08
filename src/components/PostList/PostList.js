/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';

import { getPage, articlesFetchData } from '../../redux/actions';

import Card from '../Card';
import Spinner from '../Spinner';
import Error from '../Error';

import 'antd/dist/antd.css';
import './PostList.scss';

const PostList = () => {
  const dispatch = useDispatch();
  const { articles, articlesCount, page, error } = useSelector((state) => state.articlesReducer);
  const { loading } = useSelector((state) => state.loadingReducer);

  useEffect(() => {
    dispatch(articlesFetchData());
  }, []);

  const elem = articles.map((item) => <Card card={item} key={item.slug} />);

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <Error /> : null;

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
