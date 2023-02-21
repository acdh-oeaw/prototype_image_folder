<template>
  <main>
    <div v-if="album != null">
      <div class="workfolder-title">
        <small>Arbeitsmappe</small>
        <h1 class="title">{{ album.title }}</h1>
      </div>
      <div>
        <ButtonMenu></ButtonMenu>
      </div>
      <div @dragstart="onDragStart">
        <draggable class="draggable-list" :object="album" group="my-group" :animation="300">
          <BaseSlideBox v-for="element in album.folders" :key="element.id"
                        :slides="element.items"
                        :id="element.id"
                        @create-folder="onCreateFolder"
                        @add-to-folder="onAddToFolder"
                        @remove-from-folder="onRemoveFromFolder"
                        @position-swap="positionSwap"
                        @position-left="positionLeft"
                        @position-right="positionRight"
                        :currentFolderElement="currentFolderElement">
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
  emits: ['create-folder', 'add-to-folder', 'remove-from-folder', 'position-swap', 'position-left', 'position-right'],
  data() {
    let currentFolderElement;
    return {
      albums,
      currentFolderElement,
    };
  },
  methods: {
    onDragStart(event) {
      console.log("DragStart: ", event.srcElement.id);
      this.currentFolderElement = event.srcElement.id;
    },

    onCreateFolder(ev) {
      this.album.folders.push(ev.folder);
    },

    onAddToFolder(ev) {
      let targetFolder = this.album.folders.find(f => f.id === +ev.folderID);
      if(+ev.append === 1){
        targetFolder.items.push(ev.item)
      }
      else
        targetFolder.items.unshift(ev.item)
    },

    onRemoveFromFolder(ev) {
      let targetFolder = this.album.folders.find(f => f.id === +ev.folderID);
      let itemID = targetFolder.items.findIndex(i => i.id === ev.item.id);
      targetFolder.items.splice(itemID, 1)
      console.log(ev)
    },

    positionSwap(ev) {
      console.log(ev)
      let targetFolder = this.album.folders.find(f => f.id === +ev.folderID);
      targetFolder.items.reverse();

    },

    positionLeft(ev) {
      let targetFolderIndex = this.album.folders.findIndex(f => f.id === +ev.folderID);
      let leftFolderIndex = targetFolderIndex - 1;

      if(leftFolderIndex < 0) {
        console.log(leftFolderIndex)
        return;
      }

      let temp = this.album.folders[targetFolderIndex];
      let temp2 = this.album.folders[leftFolderIndex];

      this.album.folders.splice(leftFolderIndex, 2, temp, temp2)
    },

    positionRight(ev) {
      let targetFolderIndex = this.album.folders.findIndex(f => f.id === +ev.folderID);
      let rightFolderIndex = targetFolderIndex + 1;

      if(rightFolderIndex >= this.album.folders.length) {
        console.log(rightFolderIndex)
        return;
      }

      let temp = this.album.folders[targetFolderIndex];
      let temp2 = this.album.folders[rightFolderIndex];

      this.album.folders.splice(targetFolderIndex, 2, temp2, temp)
    },
  },
  computed: {
    album() {
      let albumID = Number(this.$route.params.id);
      return this.albums.find((album) => {
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