import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../Card';

const OneArticle = ({ itemId }) => {
  const { articles } = useSelector((state) => state.articlesReducer);

  const elem = articles.filter((item) => item.slug === itemId);

  return (
    <>
      <Card card={elem[0]} body={elem[0].body} />
    </>
  );
};

export default OneArticle;
