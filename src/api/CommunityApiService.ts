import { apiClient } from "./AuthenticationApiService";

export const retrieveAllCommunities = (page: number, keyword: string) => apiClient.get(`/community/communities?pageNumber=${page}&keyword=${keyword}`);

export const retrieveCommuityApi = (communityId: number) => apiClient.get(`/community/communities/${communityId}`);

export const retrieveCommuityByUser = (page: number, keyword: string, userId: number) => apiClient.get(`community/communities/user/${userId}?pageNumber=${page}&keyword=${keyword}`);

export const userRequestingCommunity = 
    (communityId: number, userId: number) => 
    apiClient.post(`/community/request/${communityId}/user/${userId}`);

export const allRequestedCommunitiesByUser = 
    (page: number, keyword: string, userId: number) => 
    apiClient.get(`community/communities/user-requested-communities/${userId}?pageNumber=${page}&keyword=${keyword}`);