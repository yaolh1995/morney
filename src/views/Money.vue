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
      dataSource: {
        tags: [],
        type: '-',
        number: 0,
        notes: ''
      },
      record: {
        tags: [],
        type: '-',
        number: "0",
        notes: ''
      }
    }
  },
  methods: {
    onUpdateDataSource(newTags) {
      this.dataSource.tags = newTags
    },
    onUpdateSelectedTags(newSelectedTags) {
      this.dataSource.selectedTags = newSelectedTags;
      this.record.tags = this.selectedTags
    },

  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

