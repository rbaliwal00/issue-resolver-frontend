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

export const allJoinedCommunitiesByUser = 
    (page: number, keyword: string, userId: number) => 
    apiClient.get(`community/communities/user-member-communities/${userId}?pageNumber=${page}&keyword=${keyword}`);
    
export const allCommunityMembers = 
    (page: number, keyword: string, communityId: number) => 
    apiClient.get(`community/communities/${communityId}/members?pageNumber=${page}&keyword=${keyword}`);

export const allCommunityRequestedMembers = 
    (page: number, keyword: string, communityId: number) => 
    apiClient.get(`/community/communities/${communityId}/requesting-members?pageNumber=${page}&keyword=${keyword}`);

export const createCommunityApi = (community:any) => apiClient.post(`/community/creating_community`,community);

export const updateCommunityApi = (communityId: number, community:any) => apiClient.put(`community/updating_community/${communityId}`,community);

export const adminAcceptingUserRequestToJoinCommunity = 
    (communityId: number, userId: number, adminId: number) => 
    apiClient.post(`/community/request/${communityId}/user/${userId}/admin/${adminId}`);

export const adminRejectingUserRequestToJoinCommunity = 
    (communityId: number, userId: number, adminId: number) => 
    apiClient.delete(`/community/request/${communityId}/user/${userId}/admin/${adminId}`);

export const adminRemovingUserFromCommunity = 
    (communityId: number, userId: number, adminId: number) => 
    apiClient.delete(`/community/remove/${communityId}/user/${userId}/admin/${adminId}`);