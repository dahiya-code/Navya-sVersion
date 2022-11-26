import { useState, useEffect } from "react";

const StoryComment = ({url}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [storyData, setStoryData] = useState(null);
    const [isPendingStory, setIsPendingStory] = useState(true);
    const [errorStory, setErrorStory] = useState(null);
    const [commentData, setCommentData] = useState(null);
    const [isPendingComment, setIsPendingComment] = useState(true);
    const [errorComment, setErrorComment] = useState(null);
    let urlStory=url+'story&page='+currentPage;
    let urlComment=url+'comment&page='+currentPage;
    let pages=0;
    useEffect(() => {
        const abortCont = new AbortController();
    
        fetch(urlStory, { signal: abortCont.signal })
          .then(res => {
            if (!res.ok) { // error coming back from server
              throw Error('could not fetch the data for that resource');
            } 
            return res.json();
          })
          .then(storyData => {
            setIsPendingStory(false);
            setStoryData(storyData);
            setErrorStory(null);
          })
          .catch(err => {
            if (err.name === 'AbortError')  {}
            else {
              // auto catches network / connection error
              setIsPendingStory(false);
              setErrorStory(err.message);
            }
          })
        // abort the fetch
        return () => abortCont.abort();
      }, [urlStory])

      useEffect(() => {
        const abortCont = new AbortController();
    
        fetch(urlComment, { signal: abortCont.signal })
          .then(res => {
            if (!res.ok) { // error coming back from server
              throw Error('could not fetch the data for that resource');
            } 
            return res.json();
          })
          .then(commentData => {
            setIsPendingComment(false);
            setCommentData(commentData);
            setErrorComment(null);
          })
          .catch(err => {
            if (err.name === 'AbortError')  {}
            else {
              // auto catches network / connection error
              setIsPendingComment(false);
              setErrorComment(err.message);
            }
          })
        // abort the fetch
        return () => abortCont.abort();
      }, [urlComment])
    let blogs=[];
    if(storyData && commentData){
        blogs=(storyData.hits).concat(commentData.hits);
        blogs.sort(function (a, b){
            a=a.created_at.split('T')+'';
            b=b.created_at.split('T')+'';
            a=a.split('-');
            b=b.split('-');
            return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
        });
        pages=storyData.hitsPerPage+commentData.hitsPerPage;
    }
    else if(storyData){blogs=storyData.hits;pages=storyData.hitsPerPage;}
    else if(commentData){blogs=commentData.hits;pages=commentData.hitsPerPage;}
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) pageNumbers.push(i);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return ( 
        <div>
            { errorStory && <div>Story error: { errorStory }</div> }
            { isPendingStory && <div>Loading story...</div> }
            { errorComment && <div>Comment error: { errorComment }</div> }
            { isPendingComment && <div>Loading comment...</div> }
            {blogs && 
                blogs.map(
                    (blog)=>
                    (
                        <div key={blog.objectID}>
                            {
                                blog.url && 
                                (<a  href={blog.url} >
                                    <div className="blog-list" >
                                    <h2>{blog.title}</h2>
                                    <p>
                                        Written by {blog.author} | Posted {blog.created_at.split('T')[0]}
                                    </p>
                                    </div>
                                </a>) 
                            }
                            {
                                blog.comment_text && 
                                <div className="blog-list" >
                                <div dangerouslySetInnerHTML={{ __html: blog.comment_text }}></div>
                                <h4>
                                    Written by {blog.author} | Posted {blog.created_at.split('T')[0]} 
                                </h4>
                                </div> 
                            }
                        </div>
                        
                    )
                )
            }

            <nav>
                <div className="table">
                    <ul className='pagination'>
                        {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <button onClick={() => paginate(number)} className='page-link'>
                            {number}
                            </button>
                        </li>
                        ))}
                    </ul>
                </div>
            </nav>

        </div>
     );
}
 
export default StoryComment;