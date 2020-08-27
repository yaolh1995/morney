<template>
  <layout>
    <ul>
      <li v-for="(item,index) in tagList" :key="index"
          @click="currentTag(item.tag)
          currentId(item.id)">
        {{ item.tag }}
        <router-link :to="{path: `/EditLabels/${item.id}`}">
          <Icon name="go"/>
        </router-link>

      </li>
      <button  @click="createTag">新增标签</button>
    </ul>

  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/FormItem.vue';

@Component ( {
  components: {FormItem}
} )
export default class Labels extends Vue {
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

  currentTag(tag: string) {
    this.$store.commit ( 'currentTag', tag );
  }

  currentId(id: number) {
    this.$store.commit ( 'currentId', id );
  }

  removeTag(id: number) {
    this.$store.commit ( 'removeTag', id );
    this.$store.commit ( 'save' );
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
<style lang="scss" scoped>
button {
  background: transparent;
  border: none;
  color: #999;
  border-bottom: 1px solid;
  padding: 0 4px;
}
ul>*{
  padding-left: 20px;
  padding-top: 10px;
}
</style>