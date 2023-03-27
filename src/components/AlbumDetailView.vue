<template>
  <main>
    <div v-if="album != null">
      <div class="workfolder-title">
        <small>Arbeitsmappe</small>
        <h1 class="title">
          {{ album.title }}
        </h1>
      </div>
      <div>
        <ButtonMenu />
      </div>
      <div
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <div class="draggable-list">
          <div
            v-for="(element, idx) in album.folders"
            :id="element.id"
            :key="element.id"
            :class="{'drop-zone-wrapper': true, 'hidden': element.hidden}">
            <div>
              <DropZoneLine
                v-if="element.id !== 'placeholderFolder'"
                :drag-start-element="currentFolderElement"
                :idx="idx"
                @add-placeholder-folder="addPlaceholderFolder" />
              <div v-else />
            </div>
            <BaseSlideBox
              v-if="element.id !== 'placeholderFolder'"
              :id="element.id"
              :slides="element.items"
              :current-folder-element="currentFolderElement"
              :current-folder-element-is-full="currentFolderElementIsFull"
              @create-folder="onCreateFolder"
              @add-to-folder="onAddToFolder"
              @remove-from-folder="onRemoveFromFolder"
              @split-images="splitImages"
              @position-left="positionLeft"
              @position-right="positionRight"
              @reorder-folder="reorderFolder"
              @switch-images="switchImages" />
            <PlaceholderFolder
              v-else
              style="background: #333"
              @remove-folder="removeFolder" />
            <div>
              <DropZoneLine
                v-if="element.id !== 'placeholderFolder'"
                :drag-start-element="currentFolderElement"
                :idx="idx + 1"
                @add-placeholder-folder="addPlaceholderFolder" />
              <div v-else />
            </div>
          </div>
          <base-box-button
            icon="plus"
            text="Neues Kunstwerk zur Arbeitsmappe hinzufügen"
            :show-title="false"
            :box-size="{ width: 'unset' }"
            class="box" />

          <base-box-button
            icon="download"
            text="Arbeitsmappe herunterladen"
            :show-title="false"
            :box-size="{ width: 'unset' }"
            class="box" />
          <base-box-button
            icon="people"
            box-style="large"
            text="Personen zum Bearbeiten einladen"
            :show-title="false"
            :box-size="{ width: 'unset' }"
            class="box" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>Nothing found!</p>
    </div>
  </main>
</template>

<script>
import { Vue } from 'vue';
import ButtonMenu from '@/components/ButtonMenu';
import albums from '@/albums';
import BaseSlideBox from '@/components/BaseSlideBox/BaseSlideBox';
import DropZoneLine from '@/components/BaseSlideBox/DropZoneLine';
import PlaceholderFolder from '@/components/BaseSlideBox/PlaceholderFolder';

export default {
  name: 'AlbumDetailView',
  components: { DropZoneLine, BaseSlideBox, ButtonMenu, PlaceholderFolder },
  emits: [
    'create-folder',
    'add-to-folder',
    'remove-from-folder',
    'split-images',
    'position-left',
    'position-right',
    'reorder-folder',
    'switch-images',
    'add-placeholder-folder',
    'remove-folder',
  ],
  data() {
    let currentFolderElement;
    let currentFolderElementIsFull;
    return {
      albums,
      currentFolderElement,
      currentFolderElementIsFull,
    };
  },
  computed: {
    album() {
      const albumID = Number(this.$route.params.id);
      return this.albums.find(album => album.album_id === albumID);
    },
    dragOptions() {
      return {
        ghostClass: 'ghost',
      };
    },
  },
  methods: {
    onDragStart(event) {
      this.currentFolderElement = event.srcElement.id;
      const currentFolder = this.album.folders.find(f => f.id === +event.srcElement.id.split('-')[0]);
      currentFolder.hidden = true;
      // const dropZoneWrapper = event.srcElement.parentElement.parentElement;
      // const dropZoneWrapperParent = dropZoneWrapper.parentElement;
      // document.body.appendChild(dropZoneWrapper);
      // dropZoneWrapperParent.removeChild(dropZoneWrapper);

      this.currentFolderElementIsFull = currentFolder.items?.length === 2;
      console.log('DragStart: ', this.currentFolderElement);
    },
    onDragEnd() {
      this.currentFolderElement = null;
      this.currentFolderElementIsFull = null;
      this.album.folders.forEach((f) => { Vue.set(f, 'hidden', false); });
    },

    onCreateFolder(ev) {
      console.log('CREATE');
      this.album.folders.push(ev.folder);
    },

    onAddToFolder(ev) {
      console.log('ADD', ev);
      const targetFolder = this.album.folders.find(f => f.id === +ev.folderID);
      if (+ev.append === 1) {
        targetFolder.items.push(ev.item);
      } else targetFolder.items.unshift(ev.item);
    },

    onRemoveFromFolder(ev) {
      console.log('REMOVE', ev);
      const targetFolder = this.album.folders.find(f => f.id === +ev.folderID);
      const itemID = targetFolder.items.findIndex(i => i.id === ev.item.id);
      const folderIndex = this.album.folders.findIndex(i => i.id === targetFolder.id);
      targetFolder.items.splice(itemID, 1);
      if (targetFolder.items.length === 0) {
        this.album.folders.splice(folderIndex, 1);
      }
    },

    switchImages(ev) {
      console.log('SWITCH', ev);
      const targetFolder = this.album.folders.find(f => f.id === +ev.folderID);
      targetFolder.items.reverse();
    },

    splitImages(ev) {
      console.log(ev);
      const targetFolder = this.album.folders.find(f => f.id === +ev.folderID);
      console.log(targetFolder);
      const folderIndex = this.album.folders.findIndex(f => f.id === +ev.folderID);
      console.log(folderIndex);
      const image1 = targetFolder.items[0];
      const image2 = targetFolder.items[1];

      const folder = { id: Math.random(), items: [image1] };
      const folder2 = { id: Math.random(), items: [image2] };

      this.album.folders.splice(folderIndex, 1);
      this.album.folders.splice(folderIndex, 0, folder, folder2);
    },

    positionLeft(ev) {
      const targetFolderIndex = this.album.folders.findIndex(f => f.id === +ev.folderID);
      const leftFolderIndex = targetFolderIndex - 1;

      if (leftFolderIndex < 0) {
        console.log(leftFolderIndex);
        return;
      }

      const temp = this.album.folders[targetFolderIndex];
      const temp2 = this.album.folders[leftFolderIndex];

      this.album.folders.splice(leftFolderIndex, 2, temp, temp2);
    },

    positionRight(ev) {
      const targetFolderIndex = this.album.folders.findIndex(f => f.id === +ev.folderID);
      const rightFolderIndex = targetFolderIndex + 1;

      if (rightFolderIndex >= this.album.folders.length) {
        console.log(rightFolderIndex);
        return;
      }

      const temp = this.album.folders[targetFolderIndex];
      const temp2 = this.album.folders[rightFolderIndex];

      this.album.folders.splice(targetFolderIndex, 2, temp2, temp);
    },

    reorderFolder(ev) {
      console.log('Reorder', ev);
      const folderIndex = this.album.folders.findIndex(f => f.id === +ev.folderID);

      if (folderIndex > ev.newIndex) {
        // swap from the right side
        const targetFolder = this.album.folders.splice(folderIndex, 1)[0];
        this.album.folders.splice(ev.newIndex, 0, targetFolder);
      } else if (folderIndex < ev.newIndex) {
        // swap from the left side
        const targetFolder = this.album.folders.splice(folderIndex, 1)[0];
        this.album.folders.splice(ev.newIndex - 1, 0, targetFolder);
      }
    },
    removeFolder(ev) {
      console.log('Remove', ev);
      const folderIndex = this.album.folders.findIndex(f => f.id === ev.folderID);
      if (folderIndex > -1) {
        console.log('Folder found: ', folderIndex);
        this.album.folders.splice(folderIndex, 1);
      }
    },
    addPlaceholderFolder(ev) {
      const placeholderFolder = {
        id: 'placeholderFolder',
        items: [{
          id: '1',

        }],
      };
      if (!this.album.folders.find(f => f.id === 'placeholderFolder')) {
        const folderIndex = this.album.folders.findIndex(f => f.id === +this.currentFolderElement.split('-')[0]);
        console.log(ev.idx, folderIndex);
        if (folderIndex > ev.idx) {
        // swap from the right side
          this.album.folders.splice(ev.idx, 0, placeholderFolder);
        } else if (folderIndex < ev.idx) {
        // swap from the left side
          this.album.folders.splice(ev.idx - 1, 0, placeholderFolder);
        }
      }
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
.drop-zone-wrapper.hidden {
  opacity: 0.5;
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
