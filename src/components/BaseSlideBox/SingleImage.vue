<template>
  <div>
    <Info class="info-icon" />
    <Trash2 class="trash-icon" />
    <BaseImage
      ref="image"
      :src="content.imageUrl"
      :alt="content.title" />
    <div class="text-wrapper">
      <div
        ref="headerBox"
        :class="['base-image-box-header']">
        <div
          :title="content.title"
          :class="['base-image-box-title']">
          {{ content.title }}
        </div>
        <div
          :title="content.subtext"
          class="base-image-box-subtext">
          {{ content.subtext }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Info, Trash2 } from 'lucide-vue';

export default {
  name: 'ImageSingle',
  components: {
    Trash2,
    Info,
  },
  props: ['content'],
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.trash-icon {
  position: absolute;
  border-radius: 50%;
  background: white;
  padding: 3px;
  display: flex;
  align-content: center;
  transform: scale(1.13);
  bottom: 29%;
  right: 2%;

  &:hover {
    color: #9C27B0;
  }
}

.info-icon {
  position: absolute;
  border-radius: 100%;
  background: white;
  transform: scale(1.13);
  display: flex;
  align-items: center;
  justify-items: center;
  bottom: 29%;
  right: 12%;

  &:hover {
    color: #9C27B0;
  }
}
.text-wrapper {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  margin: $spacing;
  -webkit-line-clamp: 2;
  line-height: $line-height; /* fallback */
  flex-shrink: 0;
  height: $line-height * 2;

  .base-image-box-title,
  .base-image-box-subtext {
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-height: $line-height;
    flex-shrink: 0;
    max-height: $line-height * 1;
  }

  .base-image-box-title {
    font-weight: bold;
  }
}

</style>
