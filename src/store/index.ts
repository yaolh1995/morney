import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use ( Vuex );

const store = new Vuex.Store ( {
  state: {
    localStageName: 'recordList',
    recordList: [],
    dataSource: {
      tags: ['吃饭', '请客', '买', '交通'],
      type: '-',
      number: 0,
      notes: ''
    },
    record: {
      tags: [],
      type: '-',
      number: 0,
      notes: '',
    }
  } as RootState,
  mutations: {
    save(state) {
      window.localStorage.setItem ( state.localStageName, JSON.stringify ( state.recordList ) );
      window.localStorage.setItem ( 'tags', JSON.stringify ( state.dataSource.tags ) );
    },

    fetch(state) {
      state.recordList=JSON.parse ( localStorage.getItem ( state.localStageName )! ) || [];
      if (localStorage.getItem ( 'tags' )!==null){
        state.dataSource.tags=JSON.parse ( localStorage.getItem ( 'tags' )! ) || [];
      }
    },
    updateSelectedTags(state, tags: string[]) {state.record.tags = tags;
    },
    updateRecordType(state, type: string) {state.record.type = type;},

    updateRecordNumber(state, number: number) {state.record.number = number;},

    updateNotes(state,notes:string){state.record.notes=notes},

    createRecord(state) {
      let record1: RecordItem = clone ( state.record );
      record1.createdAt = new Date ().toISOString();
      state.recordList.push ( record1 );
    },

    updateTags(state, name: string) {
      state.dataSource.tags = [...state.dataSource.tags, name];
    },

    renameTag(state, payload: { id: number, name: string }) {
      state.dataSource.tags[payload.id]=payload.name;
    },
    removeTag(state,index:number) {
      state.dataSource.tags.splice(index,1);
    },




  },
  actions: {},
  modules: {}
} );
export default store;
