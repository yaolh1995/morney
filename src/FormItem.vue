<template>
  <div>
    <label class="notes">
      <span class="name">{{ fileName }}</span>
      <input type="text" v-model.lazy="input" :placeholder="this.placeholder"
      />
    </label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Watch,Prop} from 'vue-property-decorator';
@Component
export default class FormItem extends Vue {
  input = '';
  @Prop({default:''})readonly fileName!:String;
  @Prop()placeholder?:string;

  @Watch('input')
  update() {
    this.$emit('update:value', this.input);
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