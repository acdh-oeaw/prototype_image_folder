<template>
  <main>
    <div class="drag-drop-wrapper" >
          <draggable class="draggable-list" :list="images" group="my-group" :animation="300" ...>
            <div class="list-item" v-for="element in images" v-bind="{ghostClass: 'ghost'}" :key="element.id">
              <base-image-box class="image-wrapper"
              :box-size="{ width: 'unset' }"
              :image-url="element.imageUrl"
              :title="element.title"
              :subtext="element.subtext"
              :description="element.description">
                <img class="box-image" :src="element.imageUrl" alt="">
              </base-image-box>
            </div>
            <base-box-button
                icon="plus"
                text="Neues Kunstwerk zur Arbeitsmappe hinzufügen"
                :show-title="false"
                :box-size="{ width: 'unset' }"
                class="box">
            </base-box-button>
            <base-box-button
                icon="download"
                text="Arbeitsmappe herunterladen"
                :show-title="false"
                :box-size="{ width: 'unset' }"
                class="box">
            </base-box-button>
            <base-box-button
                icon="people"
                box-style="large"
                text="Personen zum Bearbeiten einladen"
                :show-title="false"
                :box-size="{ width: 'unset' }"
                class="box">
            </base-box-button>
          </draggable>

    </div>
  </main>
</template>
<script>
import draggable from "vuedraggable";
import {entriesList} from "@/data";
import {albums} from "@/albums";
export default {
  components: {
    draggable,
  },
  data() {
    let isDragging = false;
    return {
      images: entriesList,
      albums,
      isDragging,
    };
  },
};
</script>
<style scoped>
.draggable-list {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.image-wrapper {
  position: absolute;
  inset: 0;
  width: unset;
}

.list-item {
  aspect-ratio: 1;
  position: relative;
}

.box-image {
  object-fit: cover;
}

</style>