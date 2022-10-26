import React from "react";
import Card from 'react-bootstrap/Card';


function NewsFeature({ featured }) {

    const { headline, datetime, image, summary, url, source } = featured;



    return (
        <div className="news-card">
            <h5 style={{fontWeight:'bold', fontStyle:'italic', borderRadius:5, padding:5, backgroundColor:'#5a574a'}}>{headline}</h5>
            <div style={{ width: '80%', height: '30%' }}>
                <img src={image} alt={headline} style={{ objectFit: 'cover', borderRadius: 3 }} />
            </div>
            <p style={{padding:5, marginTop:10, backgroundColor:'#5a574a', borderRadius:5}}>{summary}</p>
            <small>Source: {source}</small>
            <a style={{fontWeight:"bold", fontStyle:"italic", backgroundColor:'gray', color:'white', padding:8}} href={url}>Read More</a>
        </div>
    );
}

export default NewsFeature;
