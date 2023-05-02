import { apiClient } from "./AuthenticationApiService";

export const retrieveAllCommentsForIssue = (id:number) => apiClient.get(`/comments/${id}`);

export const createCommentApi = (userId: number, issueId:number, comment:any) => apiClient.post(`/users/${userId}/issues/${issueId}/comment`,comment);

export const retrievePagedComments = (issueId:number) => apiClient.get(`/comments/paged/${issueId}`);