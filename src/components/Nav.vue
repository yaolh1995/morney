<template>
  <div class="nav">
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="labels"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="Statistics"/>
      统计
    </router-link>
  </div>
</template>

<script lang="ts">
import Icon from '@/components/Icon.vue';

export default {
  name: 'Nav',
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  font-size: 12px;

  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: rgb(126, 98, 79);

    .icon {
      width: 32px;
      height: 32px;
    }
  }

  > .item.selected {
    color: black;
  }
}
</style>