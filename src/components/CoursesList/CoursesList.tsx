import React from "react";
import { Course } from "../../types/Course";
import CourseCard from "../CourseCard/CourseCard";

type Props = {
  courses: Course[];
};

const CoursesList: React.FC<Props> = ({ courses }) => {
  return (
    <div className="CoursesList">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CoursesList;
