<template>
  <div
    :id="`dropZoneLine-${idx}`"
    :class="{ 'drop-zone': true, 'drop-zone-color': isVisible }"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="allowDrop"
    @drop="onDrop" />
</template>
<script>
export default {
  name: 'DropZoneLine',
  props: ['dragStartElement', 'idx'],
  data() {
    const isVisible = false;
    return {
      isVisible,
      placeholderTimeout: null,
    };
  },
  methods: {
    onDrop() {
      this.isVisible = false;
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    onDragEnter() {
      this.isVisible = true;
      const currentVueComponent = this;
      this.placeholderTimeout = window.setTimeout(() => {
        console.log('Started timeout');
        currentVueComponent.$emit('add-placeholder-folder', { idx: currentVueComponent.idx });
      }, 500);
    },
    onDragLeave() {
      this.isVisible = false;
      if (this.placeholderTimeout) { window.clearTimeout(this.placeholderTimeout); }
      // this.$emit('remove-folder', { folderID: 'placeholderFolder' });
    },
  },
};
</script>

<style scoped>
.drop-zone {
  width: 10px;
  height: 100%;
  display: flex;
  position: relative;
  margin: 0 2.5px;
}

.drop-zone.drop-zone-color {
  background: #9c27b0;
}
</style>
