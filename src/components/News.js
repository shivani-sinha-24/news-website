import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { cleanup } from '@testing-library/react';

const News = (props)=> {
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizedFirstLetter=string=>string.charAt(0).toUpperCase()+string.slice(1);

  const  updateNews = async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${setPage}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  
  useEffect(()=>{
    document.title=`NewsToday Bharat- ${capitalizedFirstLetter(props.category)} News`
    updateNews()
    //eslint-disable-next-line
  },[])

  const fetchMoreData = async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }  

  // const handlePrevClick=async()=>{
  //   setPage(page-1)
  //   updateNews()
  // }

  // const handleNextClick =async()=>{
  //   setPage(page+1)
  //   updateNews()
  // }


    return (
      <>
        <h1 className='text-center' style={{margin:'90px 35px 0'}}><b>NewsToday Bharat - Top {capitalizedFirstLetter(props.category)} Headlines</b></h1>
        {loading&&<Spinner/>}
        <InfiniteScroll
          dataLength={articles?.length}
          next={fetchMoreData}
          hasMore={articles?.length<totalResults?true:false}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
              {articles?.map(element=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description?(element.description.length>200?element.description.slice(0,200)+".....":element.description):"" } imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
              })}
            </div>  
          </div>
            
        </InfiniteScroll>           
        {/* <div className="container d-flex justify-content-between">
          <button disabled={page<=1} type="button" className="btn btn-danger" onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-danger" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
}

News.defaultProps = {
  country:'in',
  pageSize:15,
  category:'general'
}

News.propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News