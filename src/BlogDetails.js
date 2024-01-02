import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch('https://jsonplaceholder.typicode.com/posts/' + id);
  // const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();

  const handleClick = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + blog.id, {
      method: 'DELETE',
    }).then(() => {
      history.push('/');
    });
  };

  // const handleClick = () => {
  //     fetch('http://localhost:8000/blogs/' + blog.id, {
  //         method: 'DELETE'
  //     }).then(() => {
  //         history.push('/');
  //     })
  // }

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written By JSON Placeholder</p>
          {/* <p>Written By { blog.author }</p> */}
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
