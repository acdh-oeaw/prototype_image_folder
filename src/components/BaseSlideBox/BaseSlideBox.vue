<template>
  <draggable @start="onStart" @end="onEnd">
    <BaseBox
        :id="`${this.id}-${this.slides[0].id}`"
        ref="baseBox"
        :box-size="{ width: 'unset' }">
      <div v-if="slides.length === 1">
        <div>
          <div class="drop-zone">
            <PlaceholderZone :id="this.id + '-0'" :placement="false"
                             :dragStartElement="currentFolderElement"></PlaceholderZone>
            <PlaceholderZone :id="this.id + '-1'" :placement="true"
                             :dragStartElement="currentFolderElement"></PlaceholderZone>
          </div>
        </div>
        <div id="image-single" :object="slides" group="image1"
                   :animation="300"
                   v-for="image in slides" :key="image.id">
          <SingleImage :content="image" :folderID="id"></SingleImage>
        </div>
      </div>
      <div v-else-if="slides.length === 2">
        <div class="content-wrapper" :object="slides" :group="{ name: 'image-double', put: false}"
             ghost-class="moving-content" :animation="300" @start="onStart" @end="onEnd">
          <div class="image-double" v-for="content in slides" :key="content.id" :id="content.id">
            <DoubleImage :content="content"></DoubleImage>
          </div>
        </div>
      </div>
      <div class="options">
        <div class="icon-wrapper arr-right-icon" @click="positionRight">
          <ArrowRight></ArrowRight>
        </div>
        <div class="icon-wrapper arr-left-icon" @click="positionLeft">
          <ArrowLeft></ArrowLeft>
        </div>
        <div v-if="slides.length === 2" class="icon-wrapper arr-double-icon" @click="splitImages">
          <SeparatorVertical></SeparatorVertical>
        </div>
      </div>
    </BaseBox>
  </draggable>
</template>

<script>
import {ArrowRight} from "lucide-vue";
import {ArrowLeft} from "lucide-vue";
import {SeparatorVertical} from "lucide-vue";
import draggable from "vuedraggable";
import DoubleImage from "@/components/BaseSlideBox/DoubleImage.vue";
import SingleImage from "@/components/BaseSlideBox/SingleImage.vue";
import PlaceholderZone from "@/components/BaseSlideBox/PlaceholderZone.vue";

export default {
  name: "BaseSlideBox",
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
  },
  data() {
    const highlight = false;
    const drag = false;
    return {
      highlight,
      drag,
    }
  },
  methods: {
    onStart(ev) {
      console.log(this.id)
      console.log(ev)
    },
    onEnd(ev) {
      console.log(this.id);
      console.log("onEnd Event:", ev, this.slides)
      if (ev.explicitOriginalTarget.id === "" || ev.explicitOriginalTarget.id === null) {
        return;
      } else {
        this.$emit('add-to-folder', {
          folderID: ev.explicitOriginalTarget.id.split("-")[0],
          item: this.slides.find(s => s.id === ev.item.id.split("-")[1]),
          append: ev.explicitOriginalTarget.id.split("-")[1]
        })
        this.$emit('remove-from-folder', {
          folderID: this.id,
          item: this.slides.find(s => s.id === ev.item.id.split("-")[1])
        })
      }
    },
    splitImages() {
      this.$emit('split-images', {folderID: this.id})
    },
    positionLeft() {
      this.$emit('position-left', {folderID: this.id})
    },
    positionRight() {
      this.$emit('position-right', {folderID: this.id})

    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

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
    color: #9C27B0;
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
