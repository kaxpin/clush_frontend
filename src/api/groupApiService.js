import { apiClient } from "./apiClient";

//그룹 검색
export const searchGroup = (groupName) => {
    return apiClient.get(`/group/search/${groupName}`)
}

//그룹 생성
export const createGroup = (data) => { 
    return apiClient.post(`/group/create`, data 
    )
}

//그룹 가입 신청
export const applyGroup = (groupName) => {
    return apiClient.post(`/group/apply/${groupName}`)
}

//그룹 삭제
export const deleteGroup = (groupId, userId) => {
    return apiClient.delete(`/group/delete/${groupId}/${userId}`)
}

//그룹 master 위임
export const delegateMaster = (data) => {
    return apiClient.post(`group/delegate`, data)
} 