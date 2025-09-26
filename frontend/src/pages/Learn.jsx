import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import learnStyles from './Learn.module.css';
import Header from '../components/Header';
import ReactMarkdown from "react-markdown";

const Learn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = location.state || {};

  const query = `Give general information, basic concepts, 3 to 4 practice questions, real world use, and related frameworks and topics about ${language}`;

  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/query', { query });
        setAnswer(res.data);
      } catch (err) {
        setError('Failed to fetch learning content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (language) {
      fetchData();
    } else {
      setError('No language selected.');
      setLoading(false);
    }
  }, [language]);

  return (
    <>
    <Header />
    <div className={learnStyles.container}>
      <h1 className={learnStyles.title}>Learn: {language}</h1>

      {loading && <p className={learnStyles.loading}>Loading...</p>}
      {error && <p className={learnStyles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <div className={learnStyles.content}>
            {answer
                .split(/\n(?=\d+\.\s)/) 
                .filter(block => block.trim() !== "")
                .map((idea, index) => (
                  <div key={index} className={learnStyles.paragraph}>
                    <ReactMarkdown>{idea.trim()}</ReactMarkdown>
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Learn;
