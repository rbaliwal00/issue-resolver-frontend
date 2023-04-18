import { apiClient } from "./AuthenticationApiService";

export const retrieveAllCommentsForIssue = (id:number) => apiClient.get(`/comments/${id}`);

export const createCommentApi = (issueId:number, comment:any) => apiClient.post(`/users/issues/${issueId}/comment`,comment);