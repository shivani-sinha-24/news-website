import React from 'react'

const NewsItem = props => {
 
    let {title,description,imageUrl,newsUrl,author,date,source} = props;
    return (
      <div className='my-5 '>
        <div className="card m-3 shadow-lg" >
          <div>
            <span className="badge rounded-pill bg-danger" style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0"}}>{source}</span>
          </div>
          <img src={!imageUrl?"https://i.pinimg.com/originals/c4/ea/b4/c4eab4aef31cf79b812dcbb14b55ac3d.gif":imageUrl} className="card-img-top" alt="Error Loading Image"/>
          <div className="card-body">
            <h5 className="card-title"><b>{title}</b></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className=" author-date"><b>By {!author?'Unknown':author} on {new Date(date).toGMTString()}</b></small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-danger">Read more</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem
