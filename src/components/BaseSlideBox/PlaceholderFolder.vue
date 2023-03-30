<template>
  <div

    class="placeholder-folder"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop">
    <div
      :id="`placeholderFolder-${idx}`"
      :class="{'border-element': true, 'dragclass': dragclass}"
      @dragover="allowDrop"
      @dragenter="addClass"
      @dragleave="removeClass">
      Folie verschieben
    </div>
  </div>
</template>
<script>
export default {
  name: 'PlaceholderFolder',
  props: ['idx'],
  data() {
    return {
      counter: 0,
      dragclass: false,
    };
  },
  methods: {
    allowDrop(ev) {
      ev.preventDefault();
    },
    onDragEnter(event) {
      event.preventDefault(); // needed for IE
      this.counter += 1;
    },
    onDragLeave() {
      this.counter -= 1;
      if (this.counter === 0) {
        console.log('Placeholder folder drag leave');
        this.$emit('remove-folder', { folderID: 'placeholderFolder' });
      }
    },
    addClass() {
      this.dragclass = true;
    },
    removeClass() {
      this.dragclass = false;
    },
    onDrop() {
      this.$emit('remove-folder', { folderID: 'placeholderFolder' });
    },
  },
};
</script>
<style>
.placeholder-folder .border-element{
  border: 4px solid var(--app-color);
  height: 100%;
  text-align: center;
  align-content: center;
  color: var(--app-color);
  display: grid;
}
.placeholder-folder .dragclass{
  background-color: #d4d4d499
}
.placeholder-folder{
  margin: 0 -100px;
    padding: 0 100px;
    z-index: 3;
    position: relative;
    background-color: transparent;
}

</style>
