import { apiClient } from '../../../common/apiClient';

export const addRecordFromStorage = async (userid, bibList, props) => {
    let recordFromSessionStorage = getRecordFromStorage();
    recordFromSessionStorage = recordFromSessionStorage && JSON.parse(recordFromSessionStorage);
    if (recordFromSessionStorage) {
        sessionStorage.removeItem("apaRecord");
        recordFromSessionStorage.userid = userid;
        recordFromSessionStorage.activeBiblist = bibList[0].id;
        await apiClient(`/biblioRecords/Records.php`, "post", recordFromSessionStorage);
        let serverResponseForRecords = await apiClient(`/biblioRecords/Records.php?userid=${userid}&biblistID=${bibList[0].id}`, "get");
        props.saveRecordsOnStore(userid, serverResponseForRecords);
        return true;
    }
    else
        return;
}

export const getRecordFromStorage = () => {
    return sessionStorage.getItem("apaRecord");
}