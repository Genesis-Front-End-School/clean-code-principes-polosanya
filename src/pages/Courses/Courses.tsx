import React, { useMemo, useState } from "react";
import "./Courses.scss";
// import { coursesFromServer } from './api/mockData';
import CoursesList from "../../components/CoursesList/CoursesList";
// import { coursesApi } from './api/api';
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
// import axios from "axios";
import { Course } from "../../types/Course";
// import { baseUrl, token } from "../../api/api";

type Props = {
  courses: Course[];
  isLoading: boolean;
};

const Courses: React.FC<Props> = ({ courses, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const preparedCouses = useMemo(
    () => courses.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10),
    [courses, currentPage]
  );

  return (
    <div className="Courses">
      {isLoading ? (
        <div className="Courses__loader">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Pagination
            className="Courses__pagination"
            count={Math.round(courses.length / 10)}
            onChange={(e, num) => {
              setCurrentPage(num);
            }}
          />
          <CoursesList courses={preparedCouses} />
        </>
      )}
    </div>
  );
};

export default Courses;
