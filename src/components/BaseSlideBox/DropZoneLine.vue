<template>
<div :class="{'drop-zone': true, 'drop-zone-color': isVisible}" @dragenter="onDragEnter" @dragleave="onDragLeave">

</div>
</template>

<script>
export default {
  name: "DropZoneLine",
  props: ['dragStartElement'],
  data() {
    let isVisible = false;
    return {
      isVisible
    }
  },
  methods: {
    onDragEnter() {
      this.isVisible = true;
    },
    onDragLeave() {
      this.isVisible = false;
    }
  }
}
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
  background: #9C27B0;
}


</style>