import React, { Component } from "react";
import NewsItems from "./NewsItems";

export class News extends Component {
  capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  constructor(props){
    super(props);
    console.log('hello i am a constructor')
    this.state={articles:[],
      page:1,
    loading:false
  }
  document.title=`NewsMonkey-${this.capitalizeFirst(this.props.category)} News`

  }
  // async setUpdate(){}
  async componentDidMount(){
    this.props.setProgress(10)
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
    this.props.setProgress(100)

  }

  handlePrevClick=async ()=>{
    console.log('prev')
    let url=`https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles})

     this.setState({
      page:this.state.page  -1,
     })
  }
  handleNextClick=async ()=>{

     console.log('next')
     let url=`https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page +1}
     &pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles})

    console.log(parsedData);
     this.setState({
      page:this.state.page  +1,
     })
  
}

  render() {
    return (
      <div className='container my-3'>
        <h2 className="text-center" style={{margin:` 60px 0`}}>NewsMonkey-{this.capitalizeFirst(this.props.category)} Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage}
          newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>})}

        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
        <button disabled={this.state.page  +1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News

// const News = () => {
//   const [articles, setArticles] = useState("");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const getData = async () => {
//       const url = `https://newsapi.org/v2/top-headlines?${this.props.country}category=${this.props.category}&apiKey=${this.props.apikey}&page=${page}`;
//       const data = await fetch(url);
//       const parsedData = await data.json();
//       setArticles(parsedData.articles);
//     };

//     getData();
//   }, [articles]);

//   const handlePrevClick = async () => {
//     setPage(page - 1);
//     const url = `https://newsapi.org/v2/top-headlines?${this.props.country}category=${this.props.category}&apiKey=${this.props.apikey}&page=${page}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData.articles);
//     setArticles(parsedData.articles);
//   };
//   const handleNextClick = async () => {
//     setPage(page + 1);
//     const url = `https://newsapi.org/v2/top-headlines?${this.props.country}category=${this.props.category}&apiKey=${this.props.apikey}&page=${page}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData.articles);

//     setArticles(parsedData.articles);
//     setPage(page + 1);
//   };

//   return (
//     <div className="container my-3">
//       <h2>NewsMonkey-Top Headlines</h2>
//       <div className="row">
//         {articles &&
//           articles.map((element) => {
//             return (
//               <div className="col-md-4" key={element.url}>
//                 <NewsItems
//                   title={element.title ? element.title.slice(0, 45) : ""}
//                   description={
//                     element.description ? element.description.slice(0, 88) : ""
//                   }
//                   imageUrl={element.urlToImage}
//                   newsUrl={element.url}
//                 />
//               </div>
//             );
//           })}
//       </div>
//       <div className="container d-flex justify-content-between">
//         <button
//           disabled={page <= 1}
//           type="button"
//           className="btn btn-dark"
//           onClick={handlePrevClick}
//         >
//           &larr;Previous
//         </button>
//         <button
//           type="button"
//           className="btn btn-dark"
//           onClick={handleNextClick}
//         >
//           Next&rarr;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default News;
// 710c68c779d241b8b2bf83a91ac88043