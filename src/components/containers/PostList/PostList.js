/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { useCookies } from 'react-cookie';

import { getPage, articlesFetchData } from '../../../redux/actions/articlesActions';

import Card from '../../Card';

import 'antd/dist/antd.css';
import './PostList.scss';
import { getCurrentUser } from '../../../redux/actions/userActions';

const PostList = () => {
  const dispatch = useDispatch();
  const { articles, articlesCount, page, error } = useSelector((state) => state.articlesReducer);
  const [cookies] = useCookies();

  let pagination = (
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
  );

  const elem = articles.map((item) => <Card card={item} key={item.slug} />);
  const errorMessage = error ? 'Произошла ошибка при загрузке статей' : null;
  const noArticles = !articlesCount ? 'Пока нет статей' : null;
  noArticles || articlesCount < 20 ? (pagination = null) : pagination;

  return (
    <div className="post-list">
      {elem}
      {errorMessage}
      {noArticles}
      {pagination}
    </div>
  );
};

export default PostList;
