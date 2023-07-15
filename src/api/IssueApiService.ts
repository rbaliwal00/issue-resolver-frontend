import { apiClient } from "./AuthenticationApiService";

export const retrieveAllIssuesForUserApi = (id:number,page: number, keyword:string) => apiClient.get(`/users/${id}/issues?pageNumber=${page}&keyword=${keyword}`);

export const retrieveAllIssuesForCommunityApi = (page: number, keyword:string, communityId: number) => apiClient.get(`/issues/type/community_issues?pageNumber=${page}&keyword=${keyword}&communityId=${communityId}`);

export const retrieveAllIssues = (page: number, keyword: string) => apiClient.get(`/issues/type/issue?pageNumber=${page}&keyword=${keyword}`);

export const retrieveIssueApi = (userId: number, id: number) => apiClient.get(`/users/${userId}/issues/${id}`);

export const retrieveIssueNotLoggedIn = (id: number) => apiClient.get(`/issues/${id}`);

export const updateIssueApi = (userId: number, issue:any) => apiClient.put(`/users/${userId}/issues`,issue);

export const deleteIssueApi = (userId: number, id: number) => apiClient.delete(`/users/${userId}/todos/${id}`);

export const createIssueApi = (userId: number, issue:any) => apiClient.post(`/users/${userId}/issues`,issue);

export const getAllExpertsApi = () => apiClient.get(`/experts`);

export const getHomeIssuesApi = () => apiClient.get(`issues/home_issues`);

export const getAssignedIssuesApi = (userId: number, page: number, keyword: string) => apiClient.get(`users/${userId}/issues/assigned_issues?pageNumber=${page}&keyword=${keyword}`);

export const upvoteApi = (userId: number, issueId:number) => apiClient.post(`/upvote/user/${userId}/issues/${issueId}`);

export const addAssigneeApi = (email: String, issueId:number) => apiClient.post(`/users/${email}/issues/${issueId}/assignee`);

export const closeIssueApi = (issueId:number) => apiClient.post(`/users/issues/${issueId}/close_issue`);



