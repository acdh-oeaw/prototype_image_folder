<template>
  <main>
    <div class="slide-box-wrapper">
      <BaseBox
          ref="baseBox"
          :box-size="{ width: 'unset' }">
        <div class="options">
          <div class="icon-wrapper trash-icon">
            <Trash2></Trash2>
          </div>
          <div class="icon-wrapper info-icon">
            <Info class="info-icon"></Info>
          </div>
          <div class="icon-wrapper arr-right-icon">
            <ArrowRight></ArrowRight>
          </div>
          <div class="icon-wrapper arr-left-icon">
            <ArrowLeft></ArrowLeft>
          </div>
          <div v-if="slides.length === 2" class="icon-wrapper arr-double-icon">
            <ArrowLeftRight></ArrowLeftRight>
          </div>
        </div>
        <div class="image-wrapper">
          <BaseImage
              ref="image"
              :src="slides.imageUrl"
              :alt="slides.title">
          </BaseImage>
        </div>
        <div class="text-wrapper">
          <div
              ref="headerBox"
              :class="['base-image-box-header']">
            <div
                :title="slides.title"
                :class="['base-image-box-title']">
              {{ slides.title }}
            </div>
            <div
                :title="slides.subtext"
                class="base-image-box-subtext">
              {{ slides.subtext }}
            </div>
          </div>
        </div>
      </BaseBox>
    </div>
  </main>
</template>

<script>
import {Trash2} from "lucide-vue";
import {ArrowRight} from "lucide-vue";
import {Info} from "lucide-vue";
import {ArrowLeft} from "lucide-vue";
import {ArrowLeftRight} from "lucide-vue";

export default {
  name: "BaseSlideBox",
  components: {
    Trash2,
    ArrowRight,
    Info,
    ArrowLeft,
    ArrowLeftRight,
  },
  props: {
    /**
     * @type {Array<{ title: string; subtitle: string; imageUrl: string }>}
     */
    slides: [],
    id: Number,
  },
  data() {
    return {}
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

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
}

.icon-wrapper {
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
    bottom: 50%;
  }

  &.arr-left-icon {
    left: 0;
    bottom: 50%;
  }


}

.image-wrapper {
  display: flex;
  object-fit: cover;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.text-wrapper {
  overflow: hidden;
  display: block;
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
  z-index: 1;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;

  &:after {
    content: '';
    display: block;
    background: white;
  }

  &.base-box-100::after {
    padding-bottom: 100%;
  }

  &.base-box-50::after {
    padding-bottom: calc(50% - #{$spacing-small});
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
