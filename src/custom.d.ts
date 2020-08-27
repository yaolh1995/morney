type RecordItem={
  tags:string[],
  type:string,
  number:number,
  notes:string,
  createdAt?:string
}

type RootState = {
  recordList: RecordItem[];
  dataSource: RecordItem;
  record: RecordItem;
  localStageName: string;
  currentTag:string;
  currentId:number;
}

type TagList = { id: Number, tag: String };