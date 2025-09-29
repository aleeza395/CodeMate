import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import projectStyle from "./Projecthelper.module.css";
import Header from "../components/Header";

const Projecthelper = () => {
  const [answer, setAnswer] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const defaultQuery =
    "Give 10 project ideas in programming with tech stack used in each";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchAnswer = async (inputQuery) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://code-mate-five.vercel.app/api/query", {
        query: inputQuery,
      });
      setAnswer(res.data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      fetchAnswer(query);
    }
  };

  useEffect(() => {
    fetchAnswer(defaultQuery);
  }, []);

  return (
    <>
    <div className={projectStyle.container}>
      {answer && (
        <div className={projectStyle.answerBox}>
          <h2 className={projectStyle.title}> Project Helper</h2>
          <div className={projectStyle.answerContent}>
  {answer
    .split(/\n(?=\d+\.\s)/) 
    .filter(block => block.trim() !== "")
    .map((idea, index) => (
      <div key={index} className={projectStyle.projectCard}>
        <ReactMarkdown>{idea.trim()}</ReactMarkdown>
      </div>
    ))}
</div>
        </div>
      )}

      {loading && <p className={projectStyle.loading}> Fetching ideas...</p>}
      {error && <p className={projectStyle.error}>{error}</p>}

      <p className={projectStyle.queryLabel}>
        What's on your mind? Type below
      </p>
      <input
        type="text"
        name="query"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={projectStyle.input}
        placeholder="Ask me anything about projects..."
        required
      />
    </div>
    </>
  );
};

export default Projecthelper;
