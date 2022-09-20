import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props
    // console.log(imageUrl)
    return (
      <div>
        <div className="card" >
           <img src={imageUrl?imageUrl:"https://images.moneycontrol.com/static-mcnews/2022/05/logistic-770x433.jpg" } className="card-img-top" alt="..."/>
           <div className="card-body">
             <h5 className="card-title">{title}...   <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',left:'88%'}}>
              {source}    
              </span></h5>
             <p className="card-text">{description}...</p>
             <p className="card-text "><small className="text-danger">BY {author?author:'unknown'} on {new Date(date).toGMTString()}</small></p>
             <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
           </div>
</div>
      </div>
    )
  }
}

export default NewsItems
