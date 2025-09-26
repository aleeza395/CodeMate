import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [quizCount, setQuizCount] = useState(0);
  const [results, setResults] = useState([]);
  const [mission, setMission] = useState(null);
  const [practice, setPractice] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!user) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/quizresults/${user._id}`
        );
        console.log("Fetched results:", res.data); // Debugging
        setResults(res.data);
        setQuizCount(res.data.length);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    const fetchMission = async () => {
      if (!user) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/missions/${user._id}`
        );
        setMission(res.data);
      } catch (err) {
        console.error("Error fetching mission:", err);
      }
    };

    fetchResults();
    fetchMission();

    setPractice([
      "Review JavaScript basics",
      "Try 10 Python questions",
      "Revise C++ memory management",
    ]);
  }, [user]);

  const missionProgress =
    mission && mission.days
      ? Math.min((mission.currentStreak / mission.days) * 100, 100)
      : 0;

  const totalScore = results.reduce((acc, curr) => acc + (curr.score || 0), 0);
  const totalPossible = results.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const averageScorePercent = totalPossible
    ? Math.round((totalScore / totalPossible) * 100)
    : 0;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.welcome}>
          Welcome back, <span>{user?.username}</span>
        </h1>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h2>{quizCount}</h2>
            <p>Quizzes Completed</p>
          </div>
          <div className={styles.statCard}>
            <h2>{averageScorePercent}%</h2>
            <p>Average Score</p>
          </div>
          <div className={styles.statCard}>
            <h2>{mission ? mission.currentStreak : 0}</h2>
            <p>Current Streak</p>
          </div>
        </div>

        <section className={styles.missionSection}>
          <h2>Mission Plan</h2>
          {mission ? (
            <div className={styles.missionCard}>
              <p>
                Goal: <strong>{mission.days} days</strong>
              </p>
              <p>
                Current Streak:{" "}
                <strong>
                  {mission.currentStreak}/{mission.days}
                </strong>
              </p>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${missionProgress}%` }}
                ></div>
              </div>
              {mission.currentStreak === mission.days && (
                <p className={styles.congrats}>
                  🎉 Congratulations! You’ve completed your mission!
                </p>
              )}
            </div>
          ) : (
            <p>No mission plan set. Go to Mission Plan to create one!</p>
          )}
        </section>

        <section className={styles.practiceSection}>
          <h2>Practice Suggestions</h2>
          <ul>
            {practice.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>

        <section className={styles.quizHistory}>
          <h2>Your Quiz History</h2>
          {results.length === 0 ? (
            <p>No results yet. Take a quiz to get started!</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i}>
                    <td>{r.language}</td>
                    <td>{r.score ?? "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className={styles.nextSteps}>
          <h2>Next Steps</h2>
          <p>
            Keep practicing daily, track your mission, and challenge yourself
            with harder quizzes. You're making progress 🚀
          </p>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
