import { apiClient } from "./apiClient";

let msg = "";
let url = "";

export const selectCalendarInfo = (type, year, month, userId) => {
    msg = "요청[select]: "
    url = `/calendar/select?type=${type}&year=${year}&month=${month}&userId=${userId}`

    console.log(`${msg}${url}`);
    return apiClient.get(url)
}

export const createCalendar = (data) => {
    msg = "요청[insert]: "
    url = `/calendar/create`

    console.log(`${msg}${url}`);
    return apiClient.post(url, data
    )
}

export const udateCalendarByMonth = (data) => {
    msg = "요청[update]: "
    url = `/calendar/update`

    console.log(`${msg}${url}`);
    return apiClient.put(url, data
    )
}

export const deleteCalendar = (scheduleId, userId) => {
    msg = "요청[delete]: "
    url = `/calendar/delete/${scheduleId}/${userId}`

    return apiClient.delete(url)
}
