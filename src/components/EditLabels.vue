<template>
  <layout>
    <ul>
      <li v-for="(item,index) in tagList" :key="index"
          @click="renameTag(item.id)">
       fuck
      </li>
    </ul>

    <button class="" @click="createTag">新增标签</button>
    <FormItem file-name="标签名" placeholder="请输入新标签名"
              :content.sync="newTagName"
    ></FormItem>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/FormItem.vue';

@Component ( {
  components: {FormItem}
} )
export default class EditLabels extends Vue {
  newTagName = '';


  get tagList() {
    const tags: string[] = this.$store.state.dataSource.tags;
    const tagList: TagList[] = [];
    for (let i = 0; i < tags.length; i++) {
      const tagListItem = {id: i, tag: tags[ i ]};
      tagList.push ( tagListItem );
    }
    return tagList;
  };

  removeTag(id: number) {
    this.$store.commit ( 'removeTag', id );
    this.$store.commit ( 'save' );
  }

  renameTag(id: number) {
    let name = window.prompt ( '请输入新标签名' );
    while (name === '') {
      name = window.prompt ( '请输入新标签名' );
    }
    if (name !== null) {
      console.log ( id );
      const payload = {id, name};
      this.$store.commit ( 'renameTag', payload );
      this.$store.commit ( 'save' );
      this.$store.commit ( 'fetch' );
    }
  }

  createTag() {
    let name = window.prompt ( '请输入标签名' );
    while (name === '') {
      name = window.prompt ( '请输入标签名' );
    }
    if (name !== null) {
      this.$store.commit ( 'updateTags', name );
    }
    this.$store.commit ( 'save' );
  }

  beforeCreate() {
    this.$store.commit ( 'fetch' );
  }

};
</script>
<style>
button {
  background: transparent;
  border: none;
  color: #999;
  border-bottom: 1px solid;
  padding: 0 4px;
}
</style>