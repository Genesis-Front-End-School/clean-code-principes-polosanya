import React from "react";
import { Course } from "../../types/Course";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import HoverVideoPlayer from "react-hover-video-player";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  course: Course;
};

const CourseCard: React.FC<Props> = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      className="CourseCard"
      onClick={() => {
        navigate(`/courses/${course.id}`);
      }}
    >
      <h3>{course.title}</h3>

      <HoverVideoPlayer
        videoSrc={course.meta?.courseVideoPreview?.link}
        pausedOverlay={
          <img
            src={course.previewImageLink + "/cover.webp"}
            alt="Course preview"
            className="CourseCard__image"
          />
        }
        loadingOverlay={
          <div className="CourseCard__loader">
            <CircularProgress />
          </div>
        }
      />

      <p>
        Lessons: {course.lessonsCount} ({Math.floor(course.duration / 60)}{" "}
        minutes)
      </p>

      <Rating value={course.rating} readOnly precision={0.5} />

      <p>{course.meta?.skills?.at(0)}</p>
    </div>
  );
};

export default CourseCard;
