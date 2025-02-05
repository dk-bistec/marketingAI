"use client";
 
import { useState } from 'react';
import axios from 'axios';
 
const Home = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const generateContent = async () => {

    setLoading(true);

    setMessage('');

    try {

      const response = await axios.post('http://localhost:8000/generate-content/', { title, content });

      setContent(response.data.content);

      setMessage('Content generated successfully!');

    } catch (error) {

      setMessage('An error occurred while generating content');

    } finally {

      setLoading(false);

    }

  };
  const pushToNotion = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('/api/agent', { title, content });
      if (response.data.success) {
        setMessage('Content pushed to Notion!');
      } else {
        setMessage('Failed to push content to Notion');
      }
    } catch (error) {
      setMessage('An error occurred while pushing content to Notion');
    } finally {
      setLoading(false);
    }
  };
  const GenerateContent = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:8000/generate-content/', { title });
      setContent(response.data.content);
      setMessage('Content generated successfully!');
    } catch (error) {
      setMessage('An error occurred while generating content');
    } finally {
      setLoading(false);
    }
  };
 
  return (
<div style={styles.container}>
<h1 style={styles.heading}>Notion Blog Content Creator</h1>
<input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title here"
        style={styles.input}
      />
{/* <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter content here"
        style={styles.textarea}
      /> */}

<button onClick={GenerateContent} style={styles.button} disabled={loading}>

{loading ? 'Generating...' : 'Generate Content'}
</button>

<button onClick={pushToNotion} style={styles.button} disabled={loading}>
        {loading ? 'Pushing...' : 'Push to Notion'}
</button>
      {message && <p style={styles.message}>{message}</p>}
</div>
  );
};
 
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center' as const,
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    height: '150px',
    marginBottom: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    fontSize: '16px',
  },
};
 
export default Home;