import React, { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./pages/Courses/Courses";
import CoursePage from "./pages/CoursePage/CoursePage";
import { coursesApi } from "./api/api";
import { Course } from "./types/Course";
import { useLocalStorage } from "hooks-package";
import Alert from "@mui/material/Alert";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [courses, setCourses] = useState<Course[]>([]);
  const [token, setToken] = useLocalStorage<string>("token", "");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const toggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if (!token) {
      coursesApi
        .getToken()
        .then((response) => {
          setToken(response.data.token);
        })
        .catch((error) => setError(error.message));
    }

    if (token && courses.length === 0) {
      coursesApi
        .getCourses(token)
        .then((response) => {
          const coursesFromServer = response.data.courses;

          setCourses(coursesFromServer);
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [courses.length, setToken, token]);

  return (
    <div className={`App App--${theme}`}>
      <h1 className="App__title">Frontend School</h1>

      <IconButton onClick={toggleTheme} color="inherit" className="App__toggle">
        {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/courses" replace />} />
          <Route path="courses">
            <Route
              index
              element={<Courses courses={courses} isLoading={isLoading} />}
            />
            <Route path=":courseId" element={<CoursePage token={token} />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
