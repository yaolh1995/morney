const LocalStorageKeyName = 'recordList';
const recordListModel = {
  save(data: RecordItem[]) {
    window.localStorage.setItem ( LocalStorageKeyName, JSON.stringify ( data ) );
  },
  fetch() {
    return JSON.parse ( localStorage.getItem (LocalStorageKeyName !)! )||[];
  }
};
export default recordListModel;