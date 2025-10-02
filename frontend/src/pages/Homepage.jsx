import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import homepageStyle from "./Homepage.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Homepage = () => {
  const languages = [
    { name: "C++", route: "/learn", state: { language: "C++" }, color: "#6a4e86ff" },
    { name: "Python", route: "/learn", state: { language: "Python" }, color: "#5e8aaeff" },
    { name: "HTML", route: "/learn", state: { language: "HTML" }, color: "#b17161ff" },
    { name: "CSS", route: "/learn", state: { language: "CSS" }, color: "#6d7cb7ff" },
    { name: "JavaScript", route: "/learn", state: { language: "JavaScript" }, color: "#c4ba74ff" },
    { name: "React.js", route: "/learn", state: { language: "React.js" }, color: "#508c9bff" },
    { name: "Node.js", route: "/learn", state: { language: "Node.js" }, color: "#4f8f4cff" },
    { name: "PHP", route: "/learn", state: { language: "PHP" }, color: "#565b8fff" },
    { name: "Java", route: "/learn", state: { language: "Java" }, color: "#817059ff" },
    { name: "C#", route: "/learn", state: { language: "C#" }, color: "#608359ff" },
    { name: "Ruby", route: "/learn", state: { language: "Ruby" }, color: "#9b6360ff" },
    { name: "Go", route: "/learn", state: { language: "Go" }, color: "#567a83ff" },
    { name: "Swift", route: "/learn", state: { language: "Swift" }, color: "#90685aff" },
    { name: "Kotlin", route: "/learn", state: { language: "Kotlin" }, color: "#5c4f7eff" },
    { name: "TypeScript", route: "/learn", state: { language: "TypeScript" }, color: "#596b7dff" },
    { name: "SQL", route: "/learn", state: { language: "SQL" }, color: "#8a775eff" },
    { name: "R", route: "/learn", state: { language: "R" }, color: "#5f7085ff" },
    { name: "Scala", route: "/learn", state: { language: "Scala" }, color: "#895e5eff" },
    { name: "Perl", route: "/learn", state: { language: "Perl" }, color: "#578390ff" },
    { name: "Dart", route: "/learn", state: { language: "Dart" }, color: "#4f83a3ff" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % languages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [languages.length]);

  const visibleLanguages = [];
  for (let i = 0; i < 5; i++) {
    visibleLanguages.push(languages[(current + i) % languages.length]);
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/homepage");
  };


  return (
    <>
      <section className={homepageStyle.main}>
        <h1>Get your skills enhanced with CodeMate</h1>
        <h3>With CodeMate you will be able to</h3>
        <p>Dive into new concepts of coding</p>
        <p>Practice yourself with provided problems</p>
        <p>Track your progress and see improvement</p>
        <p>Build projects to use your problem solving skills</p>
        {user ? (
                <div>
          <button>
            <Link to="/dashboard">Dashboard</Link>
          </button>
          <button>
            <Link to="/logout" onClick={handleLogout}>Logout</Link>
          </button>
        </div>
              ) : (
                <div>
          <button>
            <Link to="/signup">Signup</Link>
          </button>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </div>
              )}
      </section>

      <section className={homepageStyle.skills}>
        <h2>Which tech language or tool you wanna learn now?</h2>
        <div className={homepageStyle.carousel}>
          <div className={homepageStyle.carouselTrack}>
            {visibleLanguages.map((lang, index) => (
              <Link
                style={{ backgroundColor: lang.color }}
                className={homepageStyle.languageCard}
                to={lang.route}
                state={lang.state}
                key={index}
              >
                {lang.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className={homepageStyle.feature}>
        <div className={homepageStyle.content}>
          <h2>Deep Learning Hub</h2>
          <p>Master coding concepts with clarity.</p>   
          <div className={homepageStyle.line}>
            <p> Visual examples to strengthen understanding</p>
            <p> Step-by-step explanations for every topic</p>
            <p> Quizzes to check your comprehension instantly</p>
          </div>
          <button>
            <Link to="/search">Start learning</Link>
          </button>
        </div>
        <DotLottieReact
          className={homepageStyle.animated}
          src="https://lottie.host/a140dc66-18f2-456b-9c8f-c3c3c4bd47ce/lgrPQlfUQo.lottie"
          loop
          autoplay
        />
      </div>

      <div className={`${homepageStyle.feature} ${homepageStyle.left}`}>
        <div className={homepageStyle.content}>
          <h2>Project Helper</h2>
          <p>Turn your ideas into reality with expert guidance.</p>
          <div className={homepageStyle.line}>
            <p>Get inspiration for new projects</p>
            <p>Fix bugs with smart hints</p>
            <p>Level up your portfolio with practice</p>
          </div>
          <button>
            <Link to="/projecthelper">Project Helper</Link>
          </button>
        </div>
        <DotLottieReact
          className={homepageStyle.animated}
          src="https://lottie.host/a2910aa2-811a-4f54-9b3c-31775d1d40b2/U7ghFe6eqe.lottie"
          loop
          autoplay
        />
      </div>

      <div className={homepageStyle.feature}>
        <div className={homepageStyle.content}>
          <h2>Tech News</h2>
          <p>Stay updated with the ever-changing tech world.</p>
          <div className={homepageStyle.line}>
            <p>Latest trends in AI, web, and cloud</p>
            <p>Concise updates so you never fall behind</p>
            <p>Hand-picked news that actually matters</p>
          </div>
          <button>
            <Link to="/updates">News</Link>
          </button>
        </div>
        <DotLottieReact
          className={homepageStyle.animated}
          src="https://lottie.host/df81ba69-531e-4c4d-bf56-ebeb16a7589f/qiOM179tGx.lottie"
          loop
          autoplay
        />
      </div>

      <div className={`${homepageStyle.feature} ${homepageStyle.left}`}>
        <div className={homepageStyle.content}>
          <h2>Practice Zone</h2>
          <p>Sharpen your coding skills with exercises.</p>
          <div className={homepageStyle.line}>
            <p>Challenges for all skill levels</p>
            <p>Track your accuracy and progress</p>
            <p>Practice any topic you choose</p>
          </div>
          <button>
            <Link to="/practice">Solve Problems</Link>
          </button>
        </div>
        <DotLottieReact
          className={homepageStyle.animated}
          src="https://lottie.host/9e48aa66-7fd7-41c1-9199-e15724c10783/X37PVzM6Uy.lottie"
          loop
          autoplay
        />
      </div>

      <div className={homepageStyle.feature}>
        <div className={homepageStyle.content}>
          <h2>Quick Quizzes</h2>
          <p>Test your knowledge on the go.</p>
          <div className={homepageStyle.line}>
            <p>Short, engaging quiz formats</p>
            <p>Instant feedback with explanations</p>
            <p>Compare results with peers</p>
          </div>
          <button>
            <Link to="/quiz">Take a Quiz</Link>
          </button>
        </div>
        <DotLottieReact
          className={homepageStyle.animated}
          src="https://lottie.host/2165f745-299f-4fdf-83c5-14b6d05246e8/h6xf9F0SXN.lottie"
          loop
          autoplay
        />
      </div>

      <div className={`${homepageStyle.feature} ${homepageStyle.left}`}>
        <div className={homepageStyle.content}>
          <h2>Mission Planner</h2>
          <p>Stay consistent with your coding journey.</p>
          <div className={homepageStyle.line}>
            <p>Set goals and deadlines</p>
            <p>Track achievements over time</p>
            <p>Motivation boosters to keep going</p>
          </div>
          <button>
            <Link to="/missionplan">Set a Goal</Link>
          </button>
        </div>
        <DotLottieReact
          className={homepageStyle.animated}
          src="https://lottie.host/216cb045-fd7c-4796-ab82-febb8cc16196/KVqjr86Cck.lottie"
          loop
          autoplay
        />
      </div>

      <Footer />
    </>
  );
};

export default Homepage;
