/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { coursesApi } from "api/api";
import CoursePage from "./CoursePage";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NmU1N2Q5MC1hNGQ0LTRmZWEtYjI0ZS02OTZiY2NmNmE1NWYiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2ODM2MTI3MjMsImV4cCI6MTY4MzYxMzYyM30.JGXcdPVskWp7OaHG3fp02RIJiAnuXXGYa-cem6uELSI";
const course = {
  id: "1",
  title: "Test Course",
  description: "This is a test course",
  meta: {
    skills: ["React", "JavaScript"],
  },
  lessons: [
    {
      id: "1",
      title: "Test Lesson 1",
    },
    {
      id: "2",
      title: "Test Lesson 2",
    },
  ],
};

jest.mock("api/api", () => ({
  coursesApi: {
    getCourse: jest.fn(() => Promise.resolve({ data: course })),
  },
}));

describe("CoursePage", () => {
  it("renders course details correctly", async () => {
    const courseId = "1";
    render(
      <MemoryRouter initialEntries={[`/courses/${courseId}`]}>
        <Route path="/courses/:courseId">
          <CoursePage token={token} />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(coursesApi.getCourse).toHaveBeenCalledWith(token, courseId);
      expect(screen.getByText(course.title)).toBeInTheDocument();
      expect(screen.getByText(course.description)).toBeInTheDocument();

      course.meta.skills.forEach((skill) => {
        expect(screen.getByText(skill)).toBeInTheDocument();
      });

      expect(screen.getByText(/lessons/i)).toBeInTheDocument();
      expect(screen.getByText(course.lessons[0].title)).toBeInTheDocument();
      expect(screen.getByText(course.lessons[1].title)).toBeInTheDocument();
    });
  });

  it("displays error message when course is not found", async () => {
    const courseId = "2";
    const errorMessage = "Course not found";
    jest.spyOn(console, "error").mockImplementation(() => {});
    coursesApi.getCourse.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    render(
      <MemoryRouter initialEntries={[`/courses/${courseId}`]}>
        <Route path="/courses/:courseId">
          <CoursePage token={token} />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(coursesApi.getCourse).toHaveBeenCalledWith(token, courseId);
      expect(screen.queryByText(course.title)).not.toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
