import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import searchStyling from './Search.module.css'
import ReactMarkdown from 'react-markdown'

const Search = () => {
  const [query, setQuery] = useState("")
  const [answer, setAnswer] = useState("")
  const [generating, setGenerating] = useState("")
    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
          setGenerating("Generating...")
            const res = await axios.post("http://localhost:5000/api/query", {query})
            setAnswer(res.data)
            setGenerating("")
        }
    }

    const languages = [
  { name: "C++", route: "/learn", state: { language: "Cpp" }, color: "#cf9fffff" },
  { name: "Python", route: "/learn", state: { language: "Python" }, color: "#5e8aaeff" },
  { name: "HTML", route: "/learn", state: { language: "HTML" }, color: "#b17161ff" },
  { name: "CSS", route: "/learn", state: { language: "CSS" }, color: "#6d7cb7ff" },
  { name: "JavaScript", route: "/learn", state: { language: "JavaScript" }, color: "#c4ba74ff" },
  { name: "React.js", route: "/learn", state: { language: "React.js" }, color: "#7fd3e8ff" },
  { name: "Node.js", route: "/learn", state: { language: "Node.js" }, color: "#8cde89ff" },
  { name: "PHP", route: "/learn", state: { language: "PHP" }, color: "#a0a6eeff" },
  { name: "Java", route: "/learn", state: { language: "Java" }, color: "#ffe0b5ff" },
  { name: "C#", route: "/learn", state: { language: "C#" }, color: "#a7ff95ff" },
  { name: "Ruby", route: "/learn", state: { language: "Ruby" }, color: "#ffaaa6ff" },
  { name: "Go", route: "/learn", state: { language: "Go" }, color: "#aceeffff" },
  { name: "Swift", route: "/learn", state: { language: "Swift" }, color: "#ffd5c6ff" },
  { name: "Kotlin", route: "/learn", state: { language: "Kotlin" }, color: "#d4c4ffff" },
  { name: "TypeScript", route: "/learn", state: { language: "TypeScript" }, color: "#d5e9ffff" },
  { name: "SQL", route: "/learn", state: { language: "SQL" }, color: "#ffecd3ff" },
  { name: "R", route: "/learn", state: { language: "R" }, color: "#bfdcffff" },
  { name: "Scala", route: "/learn", state: { language: "Scala" }, color: "#ffc8c7ff" },
  { name: "Perl", route: "/learn", state: { language: "Perl" }, color: "#d0f5ffff" },
  { name: "Dart", route: "/learn", state: { language: "Dart" }, color: "#e0f3ffff" },
];
    
  return (
    <div>
        <Header />
        <div id={searchStyling.search_page}>
            <h1>Dive into any topic, any language, any tool</h1>
            <div className={searchStyling.languages}>
                {languages.map((lang, index) => (
                          <Link style={{backgroundColor : lang.color}} className={searchStyling.lang} to={lang.route} state={lang.state} key={index}>{lang.name}</Link>
                        ))}
            </div>
            <div>
              <p className={searchStyling.generating}>{generating}</p>
               {answer && (
  <div className={searchStyling.answer_box}>
     {answer
                    .split(/\n(?=\d+\.\s)/) 
                    .filter(block => block.trim() !== "")
                    .map((idea, index) => (
                      <div key={index} className={searchStyling.paragraph}>
                        <ReactMarkdown>{idea.trim()}</ReactMarkdown>
                      </div>
                    ))}
  </div>
)}
        <p>What's on your mind? Type below </p>
        <input type='text' name='query' value={query} onChange={handleChange} onKeyDown={handleKeyDown} required />
            </div>
        
        </div>
        <Footer />
    </div>
  )
}

export default Search