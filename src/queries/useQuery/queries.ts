import { queryOptions } from "@tanstack/react-query";
import type { LessonType } from "../../Types/LessonType";
import type { UnitType } from "../../Types/UnitType";
import { qk } from "../../constants/queryKeys";
import {
  lessonBatcher,
  sectionBatcher,
  unitBatcher,
  userBatcher,
} from "../batcher/batchers";
import { getData } from "./requests";
import type { UserType } from "../../Types/UserType";
import {
  GET_AUTH_ME,
  GET_AVATARS,
  GET_COURSE_PROGRESS,
  GET_EXERCISES_BY_LESSON,
  GET_LESSONS_BY_UNIT,
  GET_MONTHLY_CHALLENGE_BY_USER_ID,
  GET_QUESTS_BY_USER_ID,
  GET_SECTION_TREE,
} from "../../constants/paths";
import type { SectionType } from "../../Types/SectionType";
import type { CourseProgressType } from "../../Types/CourseProgressType";
import type { Exercise } from "../../Types/ExerciseType";
import type { QuestType } from "../../Types/QuestType";
import type { FlatSectionTree } from "../../Types/FlatSectionTree";

export const qo = {
  section: (sectionId: number) =>
    queryOptions<SectionType>({
      queryKey: qk.section(sectionId),
      queryFn: () => sectionBatcher.fetch(sectionId),
      staleTime: 60_000,
    }),

  sectionTree: (sectionId: number) =>
    queryOptions<FlatSectionTree>({
      queryKey: qk.sectionTree(sectionId),
      queryFn: () => getData(GET_SECTION_TREE(sectionId)),
      staleTime: 60_000,
    }),

  courseProgress: (courseId: number) =>
    queryOptions<CourseProgressType>({
      queryKey: qk.courseProgress(courseId),
      queryFn: () =>
        getData<CourseProgressType>(GET_COURSE_PROGRESS(courseId), true),
      staleTime: 60_000,
    }),

  avatars: () =>
    queryOptions<string[]>({
      queryKey: qk.avatars(),
      queryFn: () => getData(GET_AVATARS),
      staleTime: 60_000,
    }),

  lesson: (lessonId: number) =>
    queryOptions<LessonType>({
      queryKey: qk.lesson(lessonId),
      queryFn: () => lessonBatcher.fetch(lessonId),
      staleTime: 60_000,
    }),

  unit: (unitId: number) =>
    queryOptions<UnitType>({
      queryKey: qk.lesson(unitId),
      queryFn: () => unitBatcher.fetch(unitId),
      staleTime: 60_000,
    }),

  exercises: (lessonId: number) =>
    queryOptions<Exercise[]>({
      queryKey: qk.exercises(lessonId),
      queryFn: () =>
        getData<Exercise[]>(GET_EXERCISES_BY_LESSON(lessonId), true),
      staleTime: 60_000,
    }),

  module: (moduleId: number) =>
    queryOptions<UnitType>({
      queryKey: qk.unit(moduleId),
      queryFn: () => unitBatcher.fetch(moduleId),
      staleTime: 60_000,
    }),

  currentUser: () =>
    queryOptions({
      queryKey: qk.currentUser(),
      queryFn: () => getData<UserType>(GET_AUTH_ME, true),
      staleTime: 60_000,
      retry: false,
    }),

  user: (userId: number) =>
    queryOptions({
      queryKey: qk.user(userId),
      queryFn: () => userBatcher.fetch(userId),
      staleTime: 60_00,
    }),

  lessonByUnit: (id: number) =>
    queryOptions({
      queryKey: qk.lessonsByUnit(id),
      queryFn: () => getData<LessonType[]>(GET_LESSONS_BY_UNIT(id), true),
      staleTime: 60_00,
    }),

  quests: () =>
    queryOptions({
      queryKey: qk.quests(),
      queryFn: () => getData<QuestType[]>(GET_QUESTS_BY_USER_ID(), true),
      staleTime: 60_00,
    }),

  monthlyChallenge: () =>
    queryOptions({
      queryKey: qk.monthlyChallenges(),
      queryFn: () => getData(GET_MONTHLY_CHALLENGE_BY_USER_ID(), true),
      staleTime: 60_00,
    }),
};
