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
    updateDataSource(state, name: string) {
      state.dataSource.tags = [...state.dataSource.tags, name];
      console.log ( state.dataSource.tags );
    },

    updateSelectedTags(state, tags: string[]) {state.record.tags = tags;},

    updateRecordType(state, tags: string[]) {state.record.tags = tags;},

    updateRecordNumber(state, number: number) {state.record.number = number;},

    updateNotes(state,notes:string){state.record.notes=notes},

    createRecord(state) {
      let record1: RecordItem = clone ( state.record );
      record1.createdAt = new Date ().toISOString();
      state.recordList.push ( record1 );
    },

    save(state) {
      window.localStorage.setItem ( state.localStageName, JSON.stringify ( state.recordList ) );

      },

    fetch(state) {
      state.recordList=JSON.parse ( localStorage.getItem ( state.localStageName )! ) || [];
    }

  },
  actions: {},
  modules: {}
} );
export default store;
