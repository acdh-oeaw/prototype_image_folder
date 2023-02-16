<template>
<div :class="{'image-wrapper': true, 'right': placement}" :id="id">
</div>
</template>

<script>
export default {
  name: "PlaceholderZone",
  props: ['id', 'placement']
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
.image-wrapper:-moz-drag-over{
  background: rgba(0,0,0, 0.2);
}
.image-wrapper.right{
  left: 50%;
}

</style>