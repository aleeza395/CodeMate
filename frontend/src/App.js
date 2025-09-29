import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Learn from './pages/Learn';
import Practice from './pages/Practice';
import Projecthelper from './pages/Projecthelper';
import Quiz from './pages/Quiz';
import Updates from './pages/Updates';
import Missionplan from './pages/Missionplan';
import Search from './pages/Search';
import Problems from './pages/Problems';
import Dashboard from './pages/Dashboard';
import Quizsheet from './pages/Quizsheet';
import Header from './components/Header';

function AppRoutes() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const hideHeader = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route index element={<Homepage />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/projecthelper" element={<Projecthelper />} />
        <Route
          path="/quiz"
          element={user ? <Quiz /> : <Navigate to="/login" />}
        />
        <Route path="/updates" element={<Updates />} />
        <Route
          path="/missionplan"
          element={user ? <Missionplan /> : <Navigate to="/login" />}
        />
        <Route path="/problems" element={<Problems />} />
        <Route path="/quizsheet" element={<Quizsheet />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
