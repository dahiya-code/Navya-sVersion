import useFetch from "./useFetch";
import { useState } from "react";
const Story = ({url}) => {
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
 
export default Story;