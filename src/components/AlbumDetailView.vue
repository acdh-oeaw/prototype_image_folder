<template>
  <main>
    <div v-if="album != null">
      <div class="workfolder-title">
        <small>Arbeitsmappe</small>
        <h1 class="title">{{album.title}}</h1>
      </div>
      <div>
        <ButtonMenu></ButtonMenu>
      </div>
      <div>
        <div class="drag-drop-wrapper">
          <draggable class="draggable-list" :object="album" group="my-group" :animation="300" ...>
            <div class="list-item" v-for="element in album.items" :key="element.id">
              <BaseSlideBox class="image-wrapper"
                              :slides="element">
                              :slides="element">
              </BaseSlideBox>
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
      </div>
    </div>
    <div v-else>
      <p>Nothing found!</p>
    </div>
  </main>
</template>

<script>
import ButtonMenu from "@/components/ButtonMenu.vue";
import {albums} from "@/albums";
import draggable from "vuedraggable";
import BaseSlideBox from "@/components/BaseSlideBox.vue";

export default {
  name: "AlbumDetailView",
  components: {BaseSlideBox, ButtonMenu, draggable},
  data() {
    return {
      albums,
    };
  },
  computed: {
    album() {
      let albumID = Number(this.$route.params.id);
      return this.albums.find((album) =>  {
        return album.album_id === albumID
      })
    }
  }
}
</script>

<style scoped>

small {
  color: grey;
  display: flex;
  justify-content: center;
}

.title {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 40px;
}

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