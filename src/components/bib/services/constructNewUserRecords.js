import { apiClient } from '../../../common/apiClient';
import { addRecordFromStorage } from './addRecordFromStorage';

export const constructNewUserRecords = async (userid, props) => {
    let biblistRow = await apiClient(`/biblioRecords/Biblist.php`, "post", { userid, name: "עבודה מספר 1" });
    props.addBibListNamesToStore(userid, biblistRow);
    props.activeBiblist(biblistRow[0]);
    let isRecordOnStorage = await addRecordFromStorage(userid, biblistRow, props);
    !isRecordOnStorage && props.history.push("/records/addRecord/ApaBooks")
}
