<template>
<div :class="{'image-wrapper': true, 'right': placement, 'drag-drop-overlay': isVisible}" :id="id" @dragenter="onDragEnter" @dragleave="onDragLeave">
</div>
</template>

<script>
export default {
  name: "PlaceholderZone",
  props: ['id', 'placement'],
  data() {
    let isVisible = false;
    return {
      isVisible,
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

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.image-wrapper {
  display: grid;
  height: 100%;
  width: 50%;
  position: absolute;
  background: rgba(0,0,0, 0.0);
}

.image-wrapper.drag-drop-overlay{
  border-color: grey;
  border-style: dashed;
  background: rgba(255,255,255, 0.7);
}

.image-wrapper.right{
  left: 50%;
}

div#text-node {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  transition: font-size 175ms;
}

</style>