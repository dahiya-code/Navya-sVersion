import Story from "./Story";
import Comment from "./Comment";
import StoryComment from "./StoryComment";
const ByDate = ({tags, dateRange}) => {
    let url='http://hn.algolia.com/api/v1/search_by_date?tags='
    if(dateRange!=='all'){
        let time;
        if(dateRange==='last24h')       time=86400;
        else if(dateRange==='pastWeek') time=604800;
        else if(dateRange==='pastMonth')time=2628000;
        else if(dateRange==='pastYear') time=31535965;
        url='http://hn.algolia.com/api/v1/search_by_date?numericFilters=created_at_i>'+time+'tags=';
    }
    return ( 
        <div>
            {tags==='story' && <Story url={url+tags} />}
            {tags==='comment' && <Comment url={url+tags} />}
            {tags==='all' && <StoryComment url={url} /> }
        </div>
     );
}
 
export default ByDate;