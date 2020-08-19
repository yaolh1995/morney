<template>
  <Layout class-prefix="layout">
    <NumberPad/>
    <Types/>
    <Notes/>
    {{ record }}
    {{ tags }}
    {{ selectedTags }}
    <Tags :data-source.sync="tags"
          @update:selectedTags="onUpdateSelectedTags"
          @update:tags="onUpdateDataSource"
    />
  </Layout>
</template>

<script lang="js">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";

export default {
  name: "Money",
  components: {Tags, Notes, Types, NumberPad},
  data: function () {
    return {
      tags: [
        '1', '2', '3', '4'
      ],
      selectedTags: [],
      type: ['-'],
      record: {tags:[ '1', '2', '3', '4'], type: '-'}
    }
  },
  methods: {
    onUpdateDataSource(newTags) {
      this.tags = newTags
    },
    onUpdateSelectedTags(newSelectedTags) {
      this.selectedTags = newSelectedTags;
      this.record.tags=this.selectedTags
    }
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

