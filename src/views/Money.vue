<template>
  <Layout class-prefix="layout">
    <NumberPad @update:number="onUpdateNumber"
               @update:record="onUpdateRecord"/>
    <Types @update:type="onUpdateType"/>
    <Notes @update:notes="onUpdateNotes"/>
    <Tags :dataSource.tags.sync="dataSource.tags"
          @update:selectedTags="onUpdateSelectedTags"
          @update:dataSource.tags="onUpdateDataSource"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import recordListModel from '@/models/recordListModel'
@Component ( {
  components: {NumberPad, Types, Notes, Tags},
} )
export default class Money extends Vue {
  recordList: RecordItem[] =recordListModel.fetch();
  dataSource: RecordItem = {
    tags: ['吃饭', '请客', '买', '交通'],
    type: '-',
    number: 0,
    notes: ''
  };
  record: RecordItem = {
    tags: [],
    type: '-',
    number: 0,
    notes: '',
  };

  onUpdateDataSource(newTags: string[]) {
    this.dataSource.tags = newTags;
  };

  onUpdateSelectedTags(newSelectedTags: string[]) {
    this.record.tags = newSelectedTags;
  };

  onUpdateType(type: string) {
    this.record.type = type;
  };

  onUpdateNotes(value: string) {
    this.record.notes = value;
  };

  onUpdateNumber(number: number) {
    this.record.number = number;
  };

  onUpdateRecord() {
    let record1 = JSON.parse ( JSON.stringify (this.record) );
    record1.createAt = new Date ();
   this.recordList.push ( record1 );
  };

  @Watch ( 'recordList' )
  onRecordListChange() {
   if (this.record.notes!=='') {window.alert ( '记了一笔' + '“' + this.record.notes + '”' );}
    recordListModel.save (this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

