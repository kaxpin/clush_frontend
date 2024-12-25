import { apiClient } from "./apiClient";

export const selectCalendarInfo = (type, year, month, userId) => {
    console.log(`/calendar/select?type=${type}&year=${year}&month=${month}&userId=${userId}`);
    return apiClient.get(`/calendar/select?type=${type}&year=${year}&month=${month}&userId=${userId}`)
}

export const createCalendar = (data) => {
    return apiClient.post(`/calendar/create`, data
    )
}

export const udateCalendarByMonth = (data) => {
    return apiClient.put(`/calendar/update`, data
    )
}

export const deleteCalendar = (scheduleId, userId) => {
    return apiClient.delete(`/calendar/delete/${scheduleId}/${userId}`)
}
