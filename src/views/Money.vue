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

<script lang="js">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import {Watch} from "vue-property-decorator";
export default {
  name: "Money",
  components: {Tags, Notes, Types, NumberPad},
  data() {
    let recordList=[];
    const x = localStorage.getItem('x');
    if (x !== undefined) {
    recordList = JSON.parse(x) ||[];
    }
    return {
      dataSource: {
        tags: ['吃饭', '请客', '买', '交通'],
        type: '-',
        number: "0",
        notes: ''
      },
      record: {
        tags: [],
        type: '-',
        number: "0",
        notes: '',
        createAt: ''
      },
      recordList
  }
  },
  methods: {
    dataInit() {
      recordList=[];
      const x = localStorage.getItem('x');
      let recordList = JSON.parse(x);
      return recordList
    },
    onUpdateDataSource(newTags) {
      this.dataSource.tags = newTags
    }
    ,
    onUpdateSelectedTags(newSelectedTags) {
      this.dataSource.selectedTags = newSelectedTags;
      this.record.tags = this.dataSource.selectedTags
    }
    ,
    onUpdateType(type) {
      this.record.type = type;
    }
    ,
    onUpdateNotes(value) {
      this.record.notes = value;
    }
    ,
    onUpdateNumber(number) {
      this.record.number = number
    }
    ,
    onUpdateRecord() {
      let record1 = JSON.parse(JSON.stringify(this.record))
      record1.createAt = new Date();
      this.recordList.push(record1)
    }
  }
  ,
  watch: {
    'recordList':
        {
          handler() {
            window.alert('记了一笔' + "“" + this.record.notes + "”")
            let save = JSON.stringify(this.recordList)
              localStorage.setItem("x", save)
          }
        }
  }
}
;
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

