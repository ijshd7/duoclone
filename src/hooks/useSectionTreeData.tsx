import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import type { FlatLesson, FlatSectionTree, FlatUnit } from "../Types/FlatSectionTree";
import { qo } from "../queries/useQuery/queries";
import type { LessonType } from "../Types/LessonType";

type Args = {
    tree: FlatSectionTree;
    courseId: number;
    sectionId: number;
    unitId: number;
};

export function useSectionTreeData({tree, courseId, sectionId, unitId}: Args) {

    const {data: courseProgress} = useSuspenseQuery(
        qo.courseProgress(courseId)
    )

    const unitMetaData = tree.units.find(
        (unit: FlatUnit) => unit.id == unitId
    )

    const unitQueries = useSuspenseQueries({
        queries: tree.units.map((unit: FlatUnit) => qo.unit(unit.id))
    })

    const lessonQueries = useSuspenseQueries({
        queries: unitMetaData!.lessons.map((lesson: FlatLesson) => qo.lesson(lesson.id))
    })

    const units = unitQueries.map((unitQuery) => unitQuery.data)
    const lessons: LessonType[] = lessonQueries.map(
        (lessonQuery) => lessonQuery.data!
    )

    return {courseProgress, units, lessons}



}