import React, { useMemo, useState } from "react";
import "./Courses.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import CoursesList from "components/CoursesList/CoursesList";
import { Course } from "types/Course";

type Props = {
  courses: Course[];
  isLoading: boolean;
};

const Courses: React.FC<Props> = ({ courses, isLoading }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 10; 
  const preparedCourses = useMemo(
    () =>
      courses.slice(
        (currentPage - 1) * coursesPerPage,
        (currentPage - 1) * coursesPerPage + coursesPerPage
      ),
    [courses, currentPage]
  );

  return (
    <div className="Courses" data-testid="courses-list">
      {isLoading ? (
        <div className="Courses__loader" data-testid="loader">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Pagination
            data-testid="pagination"
            className="Courses__pagination"
            count={Math.round(courses.length / coursesPerPage)}
            onChange={(e, num) => {
              setCurrentPage(num);
            }}
          />
          <CoursesList courses={preparedCourses} />
        </>
      )}
    </div>
  );
};

export default Courses;
