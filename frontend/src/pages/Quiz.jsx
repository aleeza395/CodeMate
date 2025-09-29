import { Link } from 'react-router-dom';
import quizStyles from './Quiz.module.css';
import Header from '../components/Header';

const Quiz = () => {
  const languages = [
    { name: "JavaScript", code: "javascript" },
    { name: "C++", code: "cpp" },
    { name: "Python", code: "python" },
    { name: "Java", code: "java" },
    { name: "C#", code: "csharp" },
    { name: "Ruby", code: "ruby" },
    { name: "Go", code: "go" },
    { name: "PHP", code: "php" },
    { name: "TypeScript", code: "typescript" },
    { name: "Data Structures & Algorithms", code: "dsa" },
    { name: "Computer Networking", code: "networking" },
    { name: "Databases (SQL & NoSQL)", code: "databases" },
    { name: "Operating Systems", code: "os" },
    { name: "Cybersecurity", code: "security" },
    { name: "Cloud Computing", code: "cloud" },
    { name: "Machine Learning", code: "ml" },
    { name: "Artificial Intelligence", code: "ai" },
    { name: "Web Development", code: "webdev" },
    { name: "Mobile Development", code: "mobiledev" }
  ];

  return (
   <>
    <div className={quizStyles.quizContainer}>
      <h1 className={quizStyles.title}>Choose Your Quiz Topic</h1>
      <div className={quizStyles.cardsGrid}>
        {languages.map((lang, index) => (
          <Link
            to='/quizsheet'
            state={{ language: lang.code }}
            key={index}
            className={quizStyles.card}
          >
            <h2>{lang.name}</h2>
          </Link>
        ))}
      </div>
    </div>
   </>
  );
};

export default Quiz;
