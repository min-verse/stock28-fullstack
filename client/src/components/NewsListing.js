import React from "react";
import Card from 'react-bootstrap/Card';


function NewsListing({ article, handleClickFeatured }) {
  const { headline, url, source } = article;
  function handleClick() {
    handleClickFeatured(article);
  }
  return (
    <div onClick={handleClick} className="news-card">
      <h6  style={{fontWeight:'bold', fontStyle:'italic', borderRadius:5, padding:5, backgroundColor:'#5a574a'}}>{headline}</h6>
      <small>Source: {source}</small>
    </div>
  );
}

export default NewsListing;
