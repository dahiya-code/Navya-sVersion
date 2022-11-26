import { useState } from "react";
import ByDate from "./ByDate";
import ByPopularity from "./ByPopularity";

const Create = () => {
  const [tags, setTags] = useState('story');
  const [sort, setSort] = useState('byPopularity');
  const [dateRange, setDateRange] = useState('all');
  return (
    <div className="create">
      <form>
        <label>Search: </label>
        <select
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        >
          <option value="all">All</option>
          <option value="story">Stories</option>
          <option value="comment">Comments</option>
        </select>
        <label> sort by </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="byPopularity">Popularity</option>
          <option value="byDate">Date</option>
        </select>
        <label> for </label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="all">All time</option>
          <option value="last24h">Last 24h</option>
          <option value="pastWeek">Past week</option>
          <option value="pastMonth">Past month</option>
          <option value="pastYear">Past year</option>
        </select>
      </form>
      { sort==='byPopularity' && 
      <div>
        <ByPopularity tags={tags} dateRange={dateRange}/>
      </div>
      }
      { sort==='byDate' && 
      <div>
        <ByDate tags={tags} dateRange={dateRange}/>
      </div>
      }
    </div>
  );
}
 
export default Create;

