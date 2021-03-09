import React from 'react';
import { Pagination } from 'antd';

import 'antd/dist/antd.css';

import Card from '../Card';

import './PostList.scss';

const PostList = () => (
  <div className="post-list">
    <Card />
    <Pagination size="small" />
  </div>
);

export default PostList;
