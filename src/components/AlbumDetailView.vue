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
          <draggable class="draggable-list" :object="album" group="my-group" :animation="300" ...>
              <BaseSlideBox v-for="element in album.folder" :key="element.id"
                              :slides="element.items">
              </BaseSlideBox>
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
    <div v-else>
      <p>Nothing found!</p>
    </div>
  </main>
</template>

<script>
import ButtonMenu from "@/components/ButtonMenu.vue";
import {albums} from "@/albums";
import draggable from "vuedraggable";
import BaseSlideBox from "@/components/BaseSlideBox/BaseSlideBox.vue";

export default {
  name: "AlbumDetailView",
  components: {BaseSlideBox, ButtonMenu, draggable},
  data() {
    return {
      albums,
    };
  },
  methods: {

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
  inset: 0;
  width: unset;
  aspect-ratio: 1;
  position: relative;
}



</style>