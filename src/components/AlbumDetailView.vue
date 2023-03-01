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
        <div class="draggable-list">
          <div class="drop-zone-wrapper" v-for="(element, idx) in album.folders" :key="element.id" :id="element.id">
            <DropZoneLine :dragStartElement="currentFolderElement" :idx="idx"></DropZoneLine>
            <BaseSlideBox
              :slides="element.items"
              :id="element.id"
              @create-folder="onCreateFolder"
              @add-to-folder="onAddToFolder"
              @remove-from-folder="onRemoveFromFolder"
              @split-images="splitImages"
              @position-left="positionLeft"
              @position-right="positionRight"
              @reorder-folder="reorderFolder"
              :currentFolderElement="currentFolderElement"
            >
            </BaseSlideBox>
            <DropZoneLine :dragStartElement="currentFolderElement" :idx="idx + 1"></DropZoneLine>
          </div>
          <base-box-button
            icon="plus"
            text="Neues Kunstwerk zur Arbeitsmappe hinzufügen"
            :show-title="false"
            :box-size="{ width: 'unset' }"
            class="box"
          >
          </base-box-button>

          <base-box-button
            icon="download"
            text="Arbeitsmappe herunterladen"
            :show-title="false"
            :box-size="{ width: 'unset' }"
            class="box"
          >
          </base-box-button>
          <base-box-button
            icon="people"
            box-style="large"
            text="Personen zum Bearbeiten einladen"
            :show-title="false"
            :box-size="{ width: 'unset' }"
            class="box"
          >
          </base-box-button>
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
import { albums } from "@/albums";
import BaseSlideBox from "@/components/BaseSlideBox/BaseSlideBox.vue";
import DropZoneLine from "@/components/BaseSlideBox/DropZoneLine.vue";

export default {
  name: "AlbumDetailView",
  components: { DropZoneLine, BaseSlideBox, ButtonMenu },
  emits: [
    "create-folder",
    "add-to-folder",
    "remove-from-folder",
    "split-images",
    "position-left",
    "position-right",
    "reorder-folder",
  ],
  data() {
    let currentFolderElement;
    return {
      albums,
      currentFolderElement,
    };
  },
  methods: {
    onDragStart(event) {
      console.log("DragStart: ", event);
      this.currentFolderElement = event.srcElement.id;
    },

    onCreateFolder(ev) {
      console.log("CREATE");
      this.album.folders.push(ev.folder);
    },

    onAddToFolder(ev) {
      console.log("ADD", ev);
      let targetFolder = this.album.folders.find((f) => f.id === +ev.folderID);
      if (+ev.append === 1) {
        targetFolder.items.push(ev.item);
      } else targetFolder.items.unshift(ev.item);
    },

    onRemoveFromFolder(ev) {
      console.log("REMOVE", ev);
      let targetFolder = this.album.folders.find((f) => f.id === +ev.folderID);
      let itemID = targetFolder.items.findIndex((i) => i.id === ev.item.id);
      let folderIndex = this.album.folders.findIndex((i) => i.id === targetFolder.id);
      targetFolder.items.splice(itemID, 1);
      if (targetFolder.items.length === 0) {
        this.album.folders.splice(folderIndex, 1);
      }
    },

    splitImages(ev) {
      console.log(ev);
      let targetFolder = this.album.folders.find((f) => f.id === +ev.folderID);
      console.log(targetFolder);
      let folderIndex = this.album.folders.findIndex((f) => f.id === +ev.folderID);
      console.log(folderIndex);
      let image1 = targetFolder.items[0];
      let image2 = targetFolder.items[1];

      const folder = { id: Math.random(), items: [image1] };
      const folder2 = { id: Math.random(), items: [image2] };

      this.album.folders.splice(folderIndex, 1);
      this.album.folders.splice(folderIndex, 0, folder, folder2);
    },

    positionLeft(ev) {
      let targetFolderIndex = this.album.folders.findIndex((f) => f.id === +ev.folderID);
      let leftFolderIndex = targetFolderIndex - 1;

      if (leftFolderIndex < 0) {
        console.log(leftFolderIndex);
        return;
      }

      let temp = this.album.folders[targetFolderIndex];
      let temp2 = this.album.folders[leftFolderIndex];

      this.album.folders.splice(leftFolderIndex, 2, temp, temp2);
    },

    positionRight(ev) {
      let targetFolderIndex = this.album.folders.findIndex((f) => f.id === +ev.folderID);
      let rightFolderIndex = targetFolderIndex + 1;

      if (rightFolderIndex >= this.album.folders.length) {
        console.log(rightFolderIndex);
        return;
      }

      let temp = this.album.folders[targetFolderIndex];
      let temp2 = this.album.folders[rightFolderIndex];

      this.album.folders.splice(targetFolderIndex, 2, temp2, temp);
    },

    reorderFolder(ev) {
      console.log("Reorder", ev);
      let folderIndex = this.album.folders.findIndex((f) => f.id === +ev.folderID);

      if (folderIndex > ev.newIndex) {
        //swap from the right side
        let targetFolder = this.album.folders.splice(folderIndex, 1)[0];
        this.album.folders.splice(ev.newIndex, 0, targetFolder);
      } else if (folderIndex < ev.newIndex) {
        //swap from the left side
        let targetFolder = this.album.folders.splice(folderIndex, 1)[0];
        this.album.folders.splice(ev.newIndex - 1, 0, targetFolder);
      }
    },
  },
  computed: {
    album() {
      let albumID = Number(this.$route.params.id);
      return this.albums.find((album) => {
        return album.album_id === albumID;
      });
    },
    dragOptions() {
      return {
        ghostClass: "ghost",
      };
    },
  },
};
</script>

<style scoped>
.drop-zone-wrapper {
  display: grid;
  height: 100%;
  grid-template-columns: 15px 100% 15px;
}

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

.ghost {
  opacity: 0.3;
}

.box {
  margin-left: 15px;
  margin-right: -15px;
}
</style>
