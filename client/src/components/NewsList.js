import React from "react";
import StockListing from "./StockListing";
import NewsListing from "./NewsListing";
import { stocks } from "../data/stocks";

function NewsList({ articles, handleClickFeatured }) {
    return (
        <div style={{ height: '65vh', overflowY: 'scroll' }}>
            
                {articles.map((article) => {
                    return (<NewsListing
                        key={article.id}
                        article={article}
                        handleClickFeatured={handleClickFeatured}
                    />);
                })}
            
        </div>
    );
}

export default NewsList;
