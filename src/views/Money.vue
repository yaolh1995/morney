<template>
  <Layout class-prefix="layout">
    <NumberPad/>
    <Types/>
    <Notes/>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

@Component ( {
  components: {NumberPad, Types, Notes, Tags},
} )
export default class Money extends Vue {
  init() { return this.$store.commit ( 'fetch' );}
  //此处需要return,才能获取全局的数据
  record: RecordItem = {
    tags: [],
    type: '-',
    number: 0,
    notes: '',
  };


  createRecord() {
    this.$store.commit ( 'createRecord', this.record );
  };

  @Watch ( 'this.$state.recordList' )
  onRecordChange() {
    if (this.record.notes !== '') {window.alert ( '记了一笔' + '“' + this.record.notes + '”' );}
    this.$store.commit ( 'save', this.record );
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

