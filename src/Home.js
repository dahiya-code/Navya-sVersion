import Story from "./Story";

const Home = () => {
  return (
    <div className="home">
      <Story url={'https://hn.algolia.com/api/v1/search_by_date?tags=story'} />
    </div>
  );
}
 
export default Home;
