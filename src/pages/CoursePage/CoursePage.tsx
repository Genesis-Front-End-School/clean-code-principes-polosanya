import { Chip, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { coursesApi } from "../../api/api";
import LessonsList from "../../components/LessonsList/LessonsList";
import { Course } from "../../types/Course";

type Props = {
  token: string;
};

const CoursePage: React.FC<Props> = ({ token }) => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (courseId) {
      coursesApi
        .getCourse(token, courseId)
        .then((response) => {
          const currentCourse = response.data;

          setCourse(currentCourse);
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [courseId, token]);

  return (
    <div className="CoursePage">
      {error && <Alert severity="error">{error}</Alert>}

      {isLoading ? (
        <div className="CoursePage__loader">
          <CircularProgress />
        </div>
      ) : (
        <>
          <h2>{course?.title}</h2>

          <p>{course?.description}</p>

          <Stack direction="row" spacing={1} className="CoursePage__skills">
            {course?.meta?.skills?.map((skill) => (
              <Chip key={skill} label={skill}/>
            ))}
          </Stack>

          <p>Lessons:</p>

          {course?.lessons && <LessonsList lessons={course.lessons} course={course}/>}
        </>
      )}
    </div>
  );
};

export default CoursePage;
