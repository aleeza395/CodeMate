import React, { useState, useEffect } from "react";
import axios from "axios";
import missionStyles from "./Mission.module.css";
import Header from "../components/Header";

const Missionplan = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [days, setDays] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const fetchMission = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/missions/${user._id}`);
        if (res.data) {
          setDays(res.data.days);
          setCurrentStreak(res.data.currentStreak);
        }
      } catch (err) {
        console.error("Error fetching mission:", err);
      }
    };
    fetchMission();
  }, [user]);

  const saveMission = async (updatedDays, updatedStreak) => {
    if (!user) return;
    try {
      await axios.post("http://localhost:5000/api/missions/save", {
        userId: user._id,
        days: updatedDays,
        currentStreak: updatedStreak,
      });
    } catch (err) {
      console.error("Error saving mission:", err);
    }
  };

  const handleChange = (e) => {
    const newDays = e.target.value;
    setDays(newDays);
    setCurrentStreak(0);
    saveMission(newDays, 0);
  };

  const handleProgress = () => {
    if (days && currentStreak < days) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      saveMission(days, newStreak);
    }
  };

  const progressPercentage = days
    ? Math.min((currentStreak / days) * 100, 100)
    : 0;

  return (
    <>
    <Header />
    <div className={missionStyles.container}>
      <h1 className={missionStyles.heading}>Mission Plan</h1>
      <p className={missionStyles.intro}>
        Practice, take a quiz, or learn something new every day to keep your streak alive!
      </p>

      <div className={missionStyles.selector}>
        <label htmlFor="days" className={missionStyles.label}>
          Set a streak goal:
        </label>
        <select
          id="days"
          value={days}
          onChange={handleChange}
          className={missionStyles.dropdown}
        >
          <option value="">Select days</option>
          <option value={10}>10 days</option>
          <option value={30}>30 days</option>
          <option value={50}>50 days</option>
          <option value={100}>100 days</option>
        </select>
      </div>

      {days && (
        <div className={missionStyles.progressSection}>
          <p>
            Current Streak:{" "}
            <span className={missionStyles.streak}>{currentStreak}</span> / {days} days
          </p>
          <div className={missionStyles.progressBar}>
            <div
              className={missionStyles.progressFill}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <button onClick={handleProgress} className={missionStyles.progressButton}>
            Mark Today as Complete
          </button>
        </div>
      )}

      {days && currentStreak === parseInt(days) && (
        <div className={missionStyles.badgeSection}>
          <h2> Congratulations!</h2>
          <p>You’ve completed your {days}-day streak and earned a badge!</p>
          <div className={missionStyles.badge}>Badge</div>
        </div>
      )}
    </div>
    </>
  );
};

export default Missionplan;
