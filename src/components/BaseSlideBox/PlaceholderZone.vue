<template>
  <div
    :id="id"
    :class="{ 'image-wrapper': true, right: placement, 'drag-drop-overlay': isVisible }"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave" />
</template>

<script>
export default {
  name: 'PlaceholderZone',
  props: ['id', 'placement', 'dragStartElement'],
  data() {
    const isVisible = false;
    return {
      isVisible,
    };
  },
  created() {
    console.log('New placeholder zone created');
  },
  methods: {
    onDragEnter() {
      console.log('placeholderzone entered');
      if (this.dragStartElement === '' || (this.dragStartElement.split('-')[0] === this.id.split('-')[0] && !this.dragStartElement.endsWith('doubleImg'))) {
        return;
      }
      this.isVisible = true;
    },
    onDragLeave() {
      console.log('placeholderzone left');
      this.isVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.image-wrapper {
  display: grid;
  height: 100%;
  width: 50%;
  position: absolute;
  background: rgba(0, 0, 0, 0);
  z-index: 2;
}

.image-wrapper.drag-drop-overlay {
  border: 3px solid;
  color: #9c27b0;
  background: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease-in-out;
}

.image-wrapper.drag-drop-overlay:hover {
  animation: linearGradientMove 0.3s infinite linear;
}

@keyframes linearGradientMove {
  100% {
    background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
  }
}

.image-wrapper.right {
  left: 50%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
