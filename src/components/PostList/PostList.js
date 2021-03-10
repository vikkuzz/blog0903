/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';

import 'antd/dist/antd.css';

import Card from '../Card';

import './PostList.scss';

const PostList = () => {
  const cards = useSelector((state) => state.articles.articles);

  const elem = cards.map((item) => {
    const props = { ...item };
    return <Card card={props} key={item.createdAt} />;
  });

  return (
    <div className="post-list">
      {elem}
      <Pagination size="small" />
    </div>
  );
};

export default PostList;
