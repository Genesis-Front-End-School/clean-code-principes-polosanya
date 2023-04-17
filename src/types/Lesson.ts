export interface Lesson {
    id: string;
    title: string;
    duration: number;
    order: number;
    type: string; //can be type
    status: string; //can be type
    link: string; // "https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/lesson-1/AppleHLS1/lesson-1.m3u8",
    previewImageLink: string; // "https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-1",
    meta: null;
}