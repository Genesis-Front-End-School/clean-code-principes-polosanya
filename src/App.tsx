import React, { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./pages/Courses/Courses";
import CoursePage from "./pages/CoursePage/CoursePage";
import { coursesApi } from "./api/api";
import { Course } from "./types/Course";
import { useLocalStorage } from "./helpers/useLocalStorage";
import Alert from "@mui/material/Alert";

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [token, setToken] = useLocalStorage<string>("token", "");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      coursesApi.getToken()
      .then((response) => {
        setToken(response.data.token);
      })
      .catch((error) => setError(error.message))
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
    <div className="App">
      <h1 className="App__title">Frontend School</h1>

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
            <Route
              path=":courseId"
              element={<CoursePage token={token} />}
            />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      )}
    </div>
  );
};

export default App;
