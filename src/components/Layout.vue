<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="title" >小记账</div>
    <div class="content" :class="classPrefix && `${classPrefix}-content`   ">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  export default {
    props: ['classPrefix'],
    name: 'Layout'
  };
</script>

<style lang="scss" scoped>
::-webkit-scrollbar{
  width: 0!important;
}
  .layout-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content {
    overflow: auto;
    flex-grow: 1;
  }
  .title{
    background: #c4c4c4;
    border-bottom:4px solid black;
  }
</style>
