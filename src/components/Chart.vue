<template>
  <div class="wrapper">
    <div class="main" ref="main"></div>
  </div>

</template>
<script lang="ts">
import Vue from 'vue';
import echarts from 'echarts';
import {Component, Prop} from 'vue-property-decorator';

@Component


export default class Chart extends Vue {
  @Prop ( {required: true, type:Object} ) option:any

  fuck() {
    echarts.init ( (this.$refs.main) as HTMLDivElement ).setOption ( this.option )
  }

  mounted() {
    this.fuck ();
  }
}


</script>
<style lang="scss">
.main {
  height: 20vh;
  width: 400%;

}
.wrapper{
  overflow-y: hidden;
  width: 100%;
  padding: 0;
}
</style>