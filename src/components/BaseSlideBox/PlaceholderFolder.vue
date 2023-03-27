<template>
  <div @dragleave="onDragLeave" />
</template>
<script>
export default {
  name: 'BaseSlideBox',
  methods: {
    onDragLeave() {
      this.$emit('remove-folder', { folderID: 'placeholderFolder' });
    },
  },
};
</script>
<style>
</style>
