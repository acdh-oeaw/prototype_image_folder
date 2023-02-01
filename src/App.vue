<script>
import {defineComponent} from 'vue';
import {entriesList} from './data'
import AppHeader from "@/components/AppHeader.vue";
import SubMenu from "@/components/SubMenu.vue";
import SubMenuSearch from "@/components/SubMenuSearch.vue";


export default defineComponent({
  components: {
    SubMenuSearch,
    AppHeader,
    SubMenu,
  },
  data() {
    return {
      selected: {},
      icons: ['add-existing-collection', 'add-existing-object', 'add-new-collection', 'add-new-object', 'archive-arrow',
        'archive-empty', 'archive-sheets', 'arrow-left', 'attachment', 'attention', 'audio-object', 'calendar-many',
        'calendar-number', 'camera', 'check-mark', 'clock', 'collection', 'download', 'drag-lines', 'drag-n-drop',
        'drop-down', 'duplicate', 'edit', 'eye-hide', 'eye', 'file-object', 'forbidden', 'home', 'image-object',
        'information', 'licence', 'magnifier', 'next', 'options-menu', 'people', 'play', 'plus', 'prev', 'print',
        'refresh', 'remove', 'save-file', 'share', 'sort', 'subscribe', 'success', 'text', 'unsubscribe', 'video-object',
        'waste-bin'],
      isLoading: false,
      showHeader: true,
      showOptions: true,
      editMode: false,
      maxShowMoreRows: 1,
      maxRows: 2,
      jumpToTop: false,
      showActionButtonBoxes: true,
      useExpandMode: false,
      usePagination: false,
      draggable: false,
      numberOfBoxes: 12,
      entriesList,
      selectedBoxes: [],
    }
  },
  computed: {
    visibleBoxes: {
      get() {
        return this.entriesList.slice(0, this.numberOfBoxes);
      },
      set(val) {
        const nonVisibleBoxes = this.entriesList.slice(this.numberOfBoxes - 1, this.entriesList.length - 1);
        this.entriesList = [...val, ...nonVisibleBoxes];
      },
    },
  },
  methods: {
    entrySelected({entryId, selected}) {
      if (selected && !this.selectedBoxes.includes(entryId)) {
        this.selectedBoxes.push(entryId);
      } else if (!selected) {
        this.selectedBoxes = this.selectedBoxes.filter(boxId => boxId !== entryId);
      }
    },
    selectEntries(selectAll) {
      if (selectAll) {
        this.selectedBoxes = this.entriesList.map(entry => entry.id);
      } else {
        this.selectedBoxes = [];
      }
    },
  },
})
</script>

<template>
  <main>
    <div class="wrapper">
      <div>
        <AppHeader></AppHeader>
      </div>
      <div v-if="$route.path !== '/'">
        <SubMenu></SubMenu>
      </div>
      <div v-else>
        <SubMenuSearch></SubMenuSearch>
      </div>
      <RouterView></RouterView>
    </div>
  </main>
</template>

<style scoped>

.section-canvas {
  padding: 16px;
  background: rgb(240, 240, 240);
}

.wrapper {
  padding: 16px 8px 8px;
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
  max-width: 1368px;
  min-width: 305px;
  position: relative;

}

.result-box {
  margin-right: 16px;
}

.options-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.options-toggle {
  margin: 8px;
}

.options-input {
  width: 175px;
  margin: 8px;
}
</style>

