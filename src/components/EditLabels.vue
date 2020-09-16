<template>
  <layout>
    <div class="navBar"  @click="goBack">
      <Icon class="back" name="back"/>
      <span class="title">编辑标签:{{ currentTag }}</span>
      <span/>

    </div>
    <div class="form-wrapper">
    <FormItem file-name="修改" placeholder="请输入新标签名"
              :content.sync="tagName" @update:value="updateTagName"
    ></FormItem>
    </div>
    <div  class="button-wrapper">
    <Button class="button"  @click="removeTag"><strong>点击删除此标签</strong></Button>
    </div>
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
<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
> .title {
}
> .back {
  width: 24px;
  height: 24px;
}}

.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button {
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