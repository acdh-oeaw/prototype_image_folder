<template>
  <div class="image-double">
    <div class="icon-wrapper info-icon">
      <Info class="info-icon"></Info>
    </div>
    <div class="icon-wrapper trash-icon">
      <Trash2></Trash2>
    </div>
    <BaseImage
        ref="image"
        :src="content.imageUrl"
        :alt="content.title">
    </BaseImage>
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
import {Trash2} from "lucide-vue";
import {Info} from "lucide-vue";
export default {
  name: "DoubleImage",
  components: {
    Trash2,
    Info,
  },
  props: ['content'],
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

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
   left: 44%;
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