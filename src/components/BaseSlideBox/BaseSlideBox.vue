<template>
  <draggable
    @end="onEnd">
    <BaseBox
      :id="`${id}-${slides[0].id}`"
      ref="baseBox"
      :box-size="{ width: 'unset' }">
      <div v-if="slides.length === 1">
        <div>
          <div
            v-if="!currentFolderElementIsFull"
            class="drop-zone">
            <PlaceholderZone
              :id="id + '-0'"
              :placement="false"
              :drag-start-element="currentFolderElement" />
            <PlaceholderZone
              :id="id + '-1'"
              :placement="true"
              :drag-start-element="currentFolderElement" />
          </div>
        </div>
        <div
          v-for="image in slides"
          id="image-single"
          :key="image.id"
          :object="slides"
          group="image1"
          :animation="300">
          <SingleImage
            :content="image"
            :folder-i-d="id" />
        </div>
      </div>
      <div v-else-if="slides.length === 2">
        <div>
          <div
            v-if="imageSwitch"
            class="drop-zone">
            <PlaceholderZone
              v-if="!switchLeftImage"
              :id="id + '-0-doubleImg'"
              :placement="false"
              :drag-start-element="currentFolderElement" />
            <PlaceholderZone
              v-if="switchLeftImage"
              :id="id + '-1-doubleImg'"
              :placement="true"
              :drag-start-element="currentFolderElement" />
          </div>
        </div>
        <div
          class="content-wrapper"
          :object="slides"
          :group="{ name: 'image-double', put: false }"
          ghost-class="moving-content"
          :animation="300"
          @end="onEnd">
          <div
            v-for="(content, idx) in slides"
            :id="content.id"
            :key="content.id"
            class="image-double">
            <DoubleImage
              :folder-id="id"
              :idx="idx"
              :content="content" />
          </div>
        </div>
      </div>
      <div class="options">
        <div
          class="icon-wrapper arr-right-icon"
          @click="positionRight">
          <ArrowRight />
        </div>
        <div
          class="icon-wrapper arr-left-icon"
          @click="positionLeft">
          <ArrowLeft />
        </div>
        <div
          v-if="slides.length === 2"
          class="icon-wrapper arr-double-icon"
          @click="splitImages">
          <SeparatorVertical />
        </div>
      </div>
    </BaseBox>
  </draggable>
</template>

<script>
import { ArrowRight, ArrowLeft, SeparatorVertical } from 'lucide-vue';
import draggable from 'vuedraggable';
import DoubleImage from '@/components/BaseSlideBox/DoubleImage';
import SingleImage from '@/components/BaseSlideBox/SingleImage';
import PlaceholderZone from '@/components/BaseSlideBox/PlaceholderZone';

export default {
  name: 'BaseSlideBox',
  components: {
    PlaceholderZone,
    SingleImage,
    DoubleImage,
    draggable,
    ArrowRight,
    ArrowLeft,
    SeparatorVertical,
  },
  props: {
    /**
     * @type {Array<{ title: string; subtitle: string; imageUrl: string }>}
     */
    slides: [],
    id: Number,
    currentFolderElement: String,
    currentFolderElementIsFull: Boolean,
  },
  data() {
    const highlight = false;
    const drag = false;
    return {
      highlight,
      drag,
    };
  },
  computed: {
    imageSwitch() {
      const imgSwitch = this.currentFolderElement && +this.currentFolderElement.split('-')[0] === this.id;
      console.log('Image switch:', this.currentFolderElement, this.id, imgSwitch);
      return imgSwitch;
    },
    switchLeftImage() {
      return this.currentFolderElement && +this.currentFolderElement.split('-')[1] === 0;
    },
  },
  methods: {
    onEnd(ev) {
      // console.log(this.id);
      // console.log('onEnd Event:', ev, this.slides);
      const draggedElement = ev.item;
      let targetElement = ev.explicitOriginalTarget;
      if (!targetElement) {
        targetElement = ev.originalEvent.toElement;
      }
      console.log('Target ', targetElement);
      if (targetElement.id === '' || targetElement.id === null) {
        console.log('Nothing');
      } else if (targetElement.id.endsWith('doubleImg')) {
        if (+targetElement.id.split('-')[0] === this.id && +targetElement.id.split('-')[1] !== +draggedElement.id.split('-')[1]) {
          this.$emit('switch-images', { folderID: this.id });
        }
      } else if (targetElement.id.startsWith('dropZoneLine')) {
        this.$emit('reorder-folder', {
          folderID: this.id,
          newIndex: +targetElement.id.replace('dropZoneLine-', ''),
        });
      } else if (targetElement.id.startsWith('placeholderFolder')) {
        this.$emit('reorder-folder', {
          folderID: this.id,
          newIndex: +targetElement.id.replace('placeholderFolder-', ''),
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
      }
    },
    splitImages() {
      this.$emit('split-images', { folderID: this.id });
    },
    positionLeft() {
      this.$emit('position-left', { folderID: this.id });
    },
    positionRight() {
      this.$emit('position-right', { folderID: this.id });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.content-wrapper {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
}

.image-double {
  display: grid;
  grid-template-rows: 3fr 1fr;
  height: 100%;
  cursor: pointer;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    padding: 2px;
  }
}

.slide-box-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
}

.options {
  display: flex;
  width: 100%;
  height: 75%;
  position: absolute;
  pointer-events: none;
}

.icon-wrapper {
  pointer-events: auto;
  display: flex;
  align-items: center;
  position: absolute;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  background: white;
  margin: 2px;
  height: 15%;
  width: 12%;
  transform: scale(0.8);
  cursor: pointer;

  &:hover {
    color: #9c27b0;
  }

  &.trash-icon {
    right: 0;
    bottom: 5px;
  }

  &.info-icon {
    right: 40px;
    bottom: 5px;
  }

  &.arr-right-icon {
    right: 0;
    bottom: 43%;
  }

  &.arr-left-icon {
    left: 0;
    bottom: 43%;
  }

  &.arr-double-icon {
    left: 43.3%;
    right: 50%;
    bottom: 43%;
  }
}

.image-single {
  object-fit: cover;
  height: 100%;
  width: 100%;
  padding: 2px;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
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

.base-box {
  display: flex;
  z-index: 1;
  background: white;
  position: relative;
  height: 100%;
  aspect-ratio: 1;

  &::after {
    display: none;
  }

  &.base-box-hover:hover,
  &:focus {
    box-shadow: $box-shadow-hov;
  }

  &:disabled {
    box-shadow: none;
  }

  &-shadow-small {
    box-shadow: $box-shadow-reg;
    transition: $box-transition;
  }

  &-shadow-large {
    box-shadow: $box-shadow-edit;
  }
}
</style>
