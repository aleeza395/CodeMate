import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import problemStyles from "./Problems.module.css";
import Header from "../components/Header";
import ReactMarkdown from 'react-markdown'

const Problems = () => {
  const location = useLocation();
  const { language } = location.state || {};

  const query = `Give 5 easy, medium, and hard practice questions in ${language} without answers`;

  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState("");
  const [coderesult, setCoderesult] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const res = await axios.post("http://localhost:5000/api/query", {
          query,
        });
        setAnswer(res.data);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, [query]);

  const handleChange = (value) => {
    setCode(value);
  };

  const runCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/runcode", {
        language,
        code,
      });
      setOutput(response.data.output);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:5000/checkcode", { code });
      setCoderesult(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <>
    <Header />
    <div className={problemStyles.container}>
      <h1 className={problemStyles.heading}>Practice Problems in {language}</h1>

      {loading ? (
        <div className={problemStyles.loadingBox}>Fetching questions...</div>
      ) : answer ? (
        <div className={problemStyles.answerBox}>
           {answer
              .split(/\n(?=\d+\.\s)/) 
              .filter(block => block.trim() !== "")
              .map((idea, index) => (
                <div key={index} className={problemStyles.projectCard}>
                  <ReactMarkdown>{idea.trim()}</ReactMarkdown>
                </div>
              ))}
        </div>
      ) : null}

      <div className={problemStyles.editorSection}>
        <Editor
          height="400px"
          defaultLanguage="javascript"
          value={code}
          onChange={handleChange}
        />
      </div>

      <div className={problemStyles.buttonGroup}>
        <button onClick={runCode} className={problemStyles.button}>
          Run Code
        </button>
        <button onClick={handleClick} className={problemStyles.buttonAlt}>
          Check with AI
        </button>
      </div>

      {output && (
        <div className={problemStyles.outputSection}>
          <h2>Output</h2>
          <pre>{output}</pre>
        </div>
      )}

      {coderesult && (
        <div className={problemStyles.resultSection}>
          <h2>AI Feedback</h2>
          <p>{coderesult}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default Problems;
