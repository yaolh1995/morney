<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" v-model.lazy="value" placeholder="在这里输入备注"/>
    </label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
@Component
export default class Notes extends Vue {
  value = '';
  @Watch('value')
  updateNotes(value: string) {
    this.$store.commit('updateNotes', value);
  }
};
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>