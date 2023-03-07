<template>
  <div class="image-wrapper">
    <Info class="info-icon" />
    <Trash2 class="trash-icon" />
    <draggable
      @end="onEnd">
      <BaseImage
        :id="`${folderId}-${idx}-doubleImg`"
        ref="image"
        :src="content.imageUrl"
        :alt="content.title" />
    </draggable>
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
import { Trash2, Info } from 'lucide-vue';
import draggable from 'vuedraggable';

export default {
  name: 'DoubleImage',
  components: {
    Trash2,
    Info,
    draggable,
  },
  props: ['content', 'idx', 'folderId'],
  methods: {
    onEnd(ev) {
      console.log('DoubleImage', ev);
      /* const draggedElement = ev.item;
      let targetElement = ev.explicitOriginalTarget;
      if (!targetElement) {
        targetElement = ev.originalEvent.toElement;
      }
      console.log('Target ', targetElement);
      if (targetElement.id === '' || targetElement.id === null) {
        console.log('Nothing');
      } else if (targetElement.id.startsWith('dropZoneLine')) {
        this.$emit('reorder-folder', {
          folderID: this.id,
          newIndex: +targetElement.id.replace('dropZoneLine-', ''),
        });
      } else {
        this.$emit('add-to-folder', {
          folderID: targetElement.id.split('-')[0],
          item: this.slides.find(s => s.id === draggedElement.id.split('-')[1]),
          append: targetElement.id.split('-')[1],
        });
        this.$emit('remove-from-folder', {
          folderID: this.id,
          item: this.slides.find(s => s.id === draggedElement.id.split('-')[1]),
        });
      } */
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.image-wrapper {
  display: grid;
  grid-template-rows: 3fr 1fr;
  height: 100%;
  cursor: pointer;
  position: relative;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    padding: 2px;
  }
}

.trash-icon {
  position: absolute;
  border-radius: 50%;
  background: white;
  padding: 3px;
  display: flex;
  align-content: center;
  transform: scale(1.13);
  bottom: 29%;
  right: 5%;

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
  right: 25%;

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
