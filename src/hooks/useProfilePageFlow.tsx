import { useSuspenseQuery } from "@tanstack/react-query";
import { useFollowCaches } from "../queries/useQuery/FollowQueries/useFollowCaches";
import { useFollowers } from "../queries/useQuery/FollowQueries/useFollowers";
import { useFollowingIds } from "../queries/useQuery/FollowQueries/useFollowing";
import type { CourseType } from "../Types/CourseType";
import type { UserType } from "../Types/UserType";
import { qo } from "../queries/useQuery/queries";

type useProfilePageFlowReturn = {
  isOwnPage: boolean;
  isLoadingData: boolean;
  pageUser?: UserType;
  currentUser: UserType;
  userCourses?: CourseType[];
  pageUserFollowers?: number[];
  followers: number[];
  following: number[];
};

export function useProfilePageFlow(userId?: string): useProfilePageFlowReturn {
  const userIdNumber = userId ? parseInt(userId, 10) : 0;

  const { data: pageUser } = useSuspenseQuery(qo.user(userIdNumber))
  const { data: currentUser } = useSuspenseQuery(qo.currentUser())
  const { data: pageUserFollowers } = useFollowers(pageUser?.id ?? 0);

  const { data: userCourses } = useSuspenseQuery(qo.userCourses(pageUser.id))

  useFollowCaches(userIdNumber);

  const followersQuery = useFollowers(userIdNumber);
  const followingQuery = useFollowingIds(userIdNumber);

  const followers = followersQuery.data || [];
  const following = followingQuery.data || [];

  const isOwnPage = pageUser?.id == currentUser.id;

  const isLoadingData =
    !userCourses ||
    !pageUserFollowers ||
    !currentUser ||
    !pageUser ||
    !followers ||
    !following
  return {
    isOwnPage,
    isLoadingData,
    pageUser,
    currentUser,
    userCourses,
    pageUserFollowers,
    followers,
    following,
  };
}
