import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  // const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs');

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blog Posts" />}
    </div>
  );
};

export default Home;
