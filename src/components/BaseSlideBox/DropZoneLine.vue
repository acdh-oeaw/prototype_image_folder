<template>
  <div
    :id="`dropZoneLine-${idx}`"
    :class="{ 'drop-zone': true, 'drop-zone-color': isVisible,
              'no-pointer-events': noPointerEvents }"
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
      noPointerEvents: false,
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
      console.log('Entered DropZoneLine');
      this.placeholderTimeout = window.setTimeout(() => {
        console.log('Started timeout');
        currentVueComponent.$emit('add-placeholder-folder', { idx: currentVueComponent.idx });
        // this.noPointerEvents = true;
      }, 200);
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
  width: 40px;
  height: 100%;
  display: flex;
  position: relative;
  margin: 0 -12.5px;
  z-index: 2;
}

.drop-zone.drop-zone-color {
  background: transparent;
}

.no-pointer-events{
  pointer-events: none;
}
</style>
