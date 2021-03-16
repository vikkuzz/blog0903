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
  const { articles, articlesCount, page, loading, error } = useSelector((state) => state.articlesReducer);

  useEffect(() => {
    dispatch(articlesFetchData(page));
  }, [dispatch, page]);

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
        total={articlesCount / 20}
        current={page}
        onChange={(value) => {
          dispatch(getPage(value));
        }}
      />
    </div>
  );
};

export default PostList;
