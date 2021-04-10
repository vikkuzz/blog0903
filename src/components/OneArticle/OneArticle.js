import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Card from '../Card';

const OneArticle = ({ itemId }) => {
  const { articles } = useSelector((state) => state.articlesReducer);
  try {
    const elem = articles.filter((item) => item.slug === itemId);
    return (
      <>
        <Card card={elem[0]} body={elem[0].body} />
      </>
    );
  } catch {
    return <Redirect to="/" />;
  }
};

export default OneArticle;
