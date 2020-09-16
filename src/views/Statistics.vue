<template>
  <Layout>
    <Tab class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tab class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <Chart :option="fucks()"></Chart>
    <ul>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{ beautify(group.title) }}</h3><span>￥{{ group.total }}</span>
        <ol>
          <li  class="record" v-for="item in group.items" :key="item.id">
            <span>{{ tagString(item.tags)}}</span>
            <span>￥{{ item.number }}</span>
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

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tab from '@/components/Tab.vue';
import Chart from '@/components/Chart.vue';
import clone from '@/lib/clone';
import dayjs from 'dayjs';


@Component ( {
  components: {Tab,Chart}
} )
export default class Statistics extends Vue {
  beforeCreate(){
    this.$store.commit ( 'fetch' );
    const now = dayjs ();
  }
  mounted(){
  }
  tagString(tags: string[]) {
    return tags.length === 0 ? '无' : tags.join ( ',' );
  }
fucks(){
    return{
      grid: {
        x: 40,
        y: 20,
        x2: 20,
        y2: 30
      },

      tooltip: {
        triggerOn: 'mousemove|click'
      },
      xAxis: {
        type: 'category',
        data:[...this.date]
      },
      yAxis: {
        type: 'value',
        show:false
      },
      series: [{
        data:[...this.total],
        type: 'line',
        itemStyle : { normal: {label : {show: true}}},
      }]

    }

}
get date(){
    const date=[]
  for (let i = 0; i < 31; i++) {
    if (this.result[ i ]===undefined){
      date.push('')
    }else {date.push(this.beautify(this.result[i].title))}

  }
  return date
}

get total(){
  const total=[]
  for (let i = 0; i < 31; i++) {
    if (this.result[ i ]===undefined){
      total.push('')
    }else {total.push(this.result[i].total)
    }
  }
  return total
}
  beautify(string: string) {
    const day = dayjs ( string );
    const now = dayjs ();
    if (day.isSame ( now, 'day' )) {
      return '今天';
    } else if (day.isSame ( now.subtract ( 1, 'day' ), 'day' )) {
      return '昨天';
    } else if (day.isSame ( now.subtract ( 2, 'day' ), 'day' )) {
      return '前天';
    } else if (day.isSame ( now, 'year' )) {
      return day.format ( 'M月D日' );
    } else {
      return day.format ( 'YY年M月D日' );
    }
  }

  beautifyTags(tags:string[]){
    if (tags===[]){return  }else{return tags}
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  };


  get result() {
    const {recordList} = this;
    if (recordList.length === 0) {return [];}
      const newList = clone ( recordList )
        .filter ( r => r.type === this.type )
        .sort ( (a, b) => dayjs ( b.createdAt ).valueOf () - dayjs ( a.createdAt ).valueOf () );

    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs ( newList[ 0 ].createdAt ).format ( 'YYYY-MM-DD' ), items: [newList[ 0 ]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[ i ];
      const last = result[ result.length - 1 ];
      if (dayjs ( last.title ).isSame ( dayjs ( current.createdAt ), 'day' )) {
        last.items.push ( current );
      } else {
        result.push ( {title: dayjs ( current.createdAt ).format ( 'YYYY-MM-DD' ), items: [current]} );
      }
    }

    result.map ( group => {
      group.total = group.items.reduce ( (sum, item) => {
        return sum + item.number;
      }, 0 );
    } );

    return result;
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
<style scoped lang="scss">
::v-deep {
  .type-tabs-item {
    background: #C4C4C4;

    &.selected {
      background: #b5b5b5;
      color:black;
      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
    &.selected{
      color:black;
    }
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  background: white;
  @extend %item;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

</style>