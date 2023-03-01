<template>
  <div
    :class="{ 'drop-zone': true, 'drop-zone-color': isVisible }"
    :id="`dropZoneLine-${idx}`"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="allowDrop"
    @drop="onDrop"
  ></div>
</template>

<script>
export default {
  name: "DropZoneLine",
  props: ["dragStartElement", "idx"],
  data() {
    let isVisible = false;
    return {
      isVisible,
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
    },
    onDragLeave() {
      this.isVisible = false;
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
