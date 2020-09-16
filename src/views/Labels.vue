<template>
  <layout>
    <ul class="tags">
      <li class="tag"
          v-for="(item,index) in tagList" :key="index"
          @click="currentTag(item.tag)
          currentId(item.id)">
        <span class="tagName"> {{ item.tag }}</span>
        <router-link :to="{path: `/EditLabels/${item.id}`}">
          <Icon name="go"/>
        </router-link>

      </li>
      <div class="createTag-wrapper">
      <Button class="createTag"
          @click="createTag">新增标签</Button>
      </div>
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
.tags {
  background: white;
  font-size: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E6E6E6;
    svg {
      width: 24px;
      height: 24px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.tagName{
  padding-left: 18px;
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    margin-top: 44-16px;
  }
}
</style>