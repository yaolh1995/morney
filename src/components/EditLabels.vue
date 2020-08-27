<template>
  <layout>
        <span class="icon-wrapper" @click="goBack">
          <Icon name="back"/></span>
    <span class="title">{{ currentTag }}</span>

    <FormItem file-name="修改" placeholder="请输入新标签名"
              :content.sync="tagName" @update:value="updateTagName"
    ></FormItem>
    <div class="title" @click="removeTag"> 点击删除此标签 <strong>X</strong></div>
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
  tagName = '';

  get currentTag() {
    return this.$store.state.currentTag;
  };

  get currentId() {
    return this.$store.state.currentId;
  };

  goBack() {
    this.$router.go ( -1 );
  }

  removeTag() {
    alert ( '删除标签成功' );
    this.$store.commit ( 'removeTag', this.currentId );
    this.$store.commit ( 'save' );
    this.$router.go ( -1 );
  }

  updateTagName(TagName: string) {
    const payload = {id: this.currentId, name: TagName};
    console.log ( this.currentTag );
    this.$store.commit ( 'renameTag', payload );
    this.$store.commit ( 'currentTag', TagName );
    this.$store.commit ( 'save' );
  }

  renameTag(id: number) {
    let name = window.prompt ( '请输入新标签名' );
    while (name === '') {
      name = window.prompt ( '请输入新标签名' );
    }
    if (name !== null) {
      const payload = {id, name};
      alert ( '修改标签' + '→' + payload.name );
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

.icon {
  margin-left: 5px;
  width: 32px;
  height: 32px;
}

.title {
  display: flex;
  justify-content: center;
}


</style>