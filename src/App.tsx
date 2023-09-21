import { useEffect, useRef, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const handleIncrement = () => {
    setCount(count => count + 1);
    console.log('State', count);
    countRef.current++;
  }

  const handleDecrement = () => {
    setCount(count => count - 1);
    console.log('State', count);
    countRef.current--;
  }

  interface Post {
    id: number;
    title: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);

  const FetchPostsData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => setPosts(data))
  }

  useEffect(() => {
  FetchPostsData();
  }, [])

  const handleDelete = (post: Post) => {
    const originalPosts = [...posts]
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const handleAdd = () => {
    // const originalPosts = [...posts];
    const newPost = {id: 0, title: 'ad invictus eternum'};
    setPosts([newPost, ...posts])

  }

  const handleUpdate = (post: Post) => {
    // const originalPosts = [...posts];
    const updatePost = {...post, title: post.title + '!'}
    setPosts(posts.map(p => p.id === post.id ? updatePost : p))
  }

  return (
    <div className="App">
      <Row>
        <Button style={{width: 350}} variant="outline-primary" onClick={handleIncrement}>+</Button>
        {count}
        <Button style={{width: 350}} variant="outline-danger" onClick={handleDecrement}>-</Button>
      </Row>

      <Container>
        <Button variant="outline-secondary" onClick={handleAdd}>Add New Post</Button>
        <ul>
          {posts.map(post => <li key={post.id}>{post.title}<Button variant='outline-success' onClick={() => handleUpdate(post)}>Update</Button><Button variant="outline-secondary" onClick={() => handleDelete(post)}>Delete</Button></li>)}
        </ul>
        
      </Container>
      
    </div>
  )
}

export default App
