import { Lesson } from "./Lesson";
import { Meta } from "./Meta";

export interface Course {
    id: string;
    title: string;
    tags?: string[];
    launchDate: string;
    lessonsCount: number;
    status: string; //can be type
    description: string;
    duration: number; // hours?
    previewImageLink: string; //"https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it"
    rating: number;
    meta?: Meta;
    lessons?: Lesson[];
    containsLockedLessons: boolean;
}
