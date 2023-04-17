import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import { useMemo } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { Lesson } from "../../types/Lesson";
import { Course } from "../../types/Course";
import { useLocalStorage } from "../../helpers/useLocalStorage";

type Props = {
  lessons: Lesson[];
  course: Course;
};

const LessonsList: React.FC<Props> = ({ lessons, course }) => {
  const preparedLessons = useMemo(
    () => [...lessons].sort((a, b) => a.order - b.order),
    [lessons]
  ); // sort lessons in correct order

  const [expanded, setExpanded] = useLocalStorage<string | false>(`${course.title}`, preparedLessons[0].title);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="LessonsList">
      {preparedLessons.map((lesson) => (
        <Accordion
          disabled={lesson.status === "locked"}
          key={lesson.id}
          expanded={expanded === lesson.title}
          onChange={handleChange(lesson.title)}
        >
          <AccordionSummary
            expandIcon={
              lesson.status === "locked" ? <LockIcon /> : <ExpandMoreIcon />
            }
          >
            <Typography sx={{ width: "100%" }}>
              {`${lesson.order}. ${lesson.title}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <VideoPlayer link={lesson.link}/>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default LessonsList;
