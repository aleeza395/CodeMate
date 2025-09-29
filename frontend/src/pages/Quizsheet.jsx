import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import sheetStyles from "./Quizsheet.module.css";
import ReactMarkdown from 'react-markdown'

const Quizsheet = () => {
  const location = useLocation();
  const { language } = location.state || {};

  const [messages, setMessages] = useState([]);
  const [userinput, setUserinput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const startMessages = async () => {
      try {
        const initialQuery = [
          {
            role: "user",
            text: `Start asking multiple choice questions in ${language} from me one by one. After I have answered every question calculate the score and tell me`,
          },
        ];
        const response = await axios.post("https://code-mate-five.vercel.app/quizroute", {
          messages: initialQuery,
        });

        setMessages([...initialQuery, { role: "ai", text: response.data }]);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    startMessages();
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && userinput.trim() !== "") {
      const newQuery = [...messages, { role: "user", text: userinput }];
      setMessages(newQuery);
      setUserinput("");

      try {
        const response = await axios.post("https://code-mate-five.vercel.app/quizroute", {
          messages: newQuery,
        });

        const reply = response.data;
        setMessages([...newQuery, { role: "ai", text: reply }]);

        if (/score/i.test(reply)) {
          const scoreMatch = reply.match(/(\d+)\s*\/\s*(\d+)/);
          if (scoreMatch) {
            const score = parseInt(scoreMatch[1]);
            const total = parseInt(scoreMatch[2]);
            await saveResult(language, score, total);
          }
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const saveResult = async (language, score, total) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      await axios.post("https://code-mate-five.vercel.app/api/quizresults/save", {
        userId: user._id,
        language,
        score,
        total,
      });
    } catch (err) {
      console.error("Error saving result:", err);
    }
  };

  return (
    <div className={sheetStyles.container}>
      <div className={sheetStyles.chatBox}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${sheetStyles.message} ${
              m.role === "user" ? sheetStyles.user : sheetStyles.ai
            }`}
          >
            <strong>{m.role === "user" ? "You" : "QuizBot"}:</strong>
            <div>
               {m.text
                  .split(/\n(?=\d+\.\s)/) 
                  .filter(block => block.trim() !== "")
                  .map((idea, index) => (
                    <div key={index} className={sheetStyles.card}>
                      <ReactMarkdown>{idea.trim()}</ReactMarkdown>
                    </div>
                  ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <input
        className={sheetStyles.input}
        placeholder="Type your answer and press Enter..."
        value={userinput}
        onChange={(e) => setUserinput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Quizsheet;
