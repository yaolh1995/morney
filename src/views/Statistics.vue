<template>
  <Layout>
    <Tab class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tab class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <ul>
      <li v-for="(group,index) in result" :key="index">
        <h3>{{ beautify(group.title) }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id">
            ￥{{ item.number }} {{ item.createdAt }}
          </li>
        </ol>
        <hr/>
      </li>
    </ul>
    type:{{ type }}
    <br/>
    interval:{{ interval }}
  </Layout>
</template>
<style scoped lang="scss">
::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #C4C4C4;

    &::after {
      display: none;
    }

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tab from '@/components/Tab.vue';
import clone from '@/lib/clone';
import dayjs from 'dayjs';

@Component ( {
  components: {Tab}
} )
export default class Statistics extends Vue {
  beforeCreate() {
    this.$store.commit ( 'fetch' );
    const now = dayjs ();
    console.log(dayjs("2020-08-26").isSame(now.subtract ( 1, 'day' )))
  }


  beautify(string: string) {
    const day = dayjs ( string );
    const now = dayjs ();
   // console.log((now.subtract ( 1, 'day' )))
 //  console.log(dayjs("2020-08-25").isSame ( (now.subtract ( 1, 'day' )) ))
    if (day.isSame ( now, 'day' )) {
      return '今天';
    } else if (day.isSame ( now.subtract ( 1, 'day' ),"day") ) {
      return '昨天';
    } else if (day.isSame (now.subtract ( 2, 'day' ),"day" )) {
      return '前天';
    } else if (day.isSame ( now, 'year' )) {
      return day.format ( 'M月D日' );
    } else {
      return day.format ( 'YY年M月D日' );
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  };

  get result() {
    const {recordList} = this;
    //=const recordList=this.recordList;
    type HashTableValue = { title: string, items: RecordItem[] }
    const hashTable: { [ key: string ]: HashTableValue } = {};
    if (recordList.length === 0) {return [];}



    const newList = clone ( recordList )
        .filter ( r => r.type === this.type )
        .sort ( (a, b) => dayjs ( b.createdAt ).valueOf () - dayjs ( a.createdAt ).valueOf () );

    for (let i = 0; i < newList.length; i++) {
      const [date, time] = newList[ i ].createdAt!.split ( 'T' );
      hashTable[ date ] = hashTable[ date ] || {title: date, items: []};
      newList[ i ].createdAt = dayjs ( newList[ i ].createdAt ).format ( 'H时m分' );
      console.log(hashTable)
      hashTable[ date ].items.push ( newList[ i ] );
    }
    return hashTable;
  }

  type = '-';
  interval = 'day';
  intervalList = [
    {text: '天', value: 'day'},
    {text: '周', value: 'week'},
    {text: '月', value: 'month'},
  ];
  typeList = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];
}

</script>
