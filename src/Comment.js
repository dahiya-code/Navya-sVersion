import { useState } from "react";
import useFetch from "./useFetch";

const Comment = ({url}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const {data, isPending, error}= useFetch(url+'&page='+currentPage);
    let blogs=[];
    let pages=0;
    if(data){
        blogs=data.hits;
        pages=data.hitsPerPage;
    }
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) pageNumbers.push(i);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return ( 
        <div>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {blogs && 
                blogs.map(
                    (blog)=>
                    (
                        <div key={blog.objectID}>
                            {
                                blog.comment_text && 
                                <div className="blog-list" >
                                <div dangerouslySetInnerHTML={{ __html: blog.comment_text }}></div>
                                <h4>
                                    Written by {blog.author} 
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
 
export default Comment;