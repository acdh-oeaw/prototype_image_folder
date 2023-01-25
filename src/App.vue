<script>
import {defineComponent} from 'vue';
import {entriesList} from './data'

export default defineComponent({
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
    <div>
      <BaseResultBoxSection
          v-model="visibleBoxes"
          :is-loading="isLoading"
          :show-header="showHeader"
          :showOptions="showOptions"
          :selected-list.sync="selectedBoxes"
          :options-button-text="{
        show: 'Edit/Show Options',
        hide: 'Return/Hide Options',
      }"
          :options-button-icon="{
        show: 'options-menu',
        hide: 'remove',
      }"
          :box-breakpoints="[
        [0, 1],
        [200, 2],
        [400, 3],
        [600, 4],
        [800, 5],
      ]"
          :edit-mode.sync="editMode"
          :selectOptionsText="{
        selectAll: 'Custom select all',
        selectNone: 'Custom select none',
        entriesSelected: {
          string: !selectedBoxes.length || selectedBoxes.length > 1 ? 'entries selected' : 'entry selected',
          count: selectedBoxes.length,
        },
      }"
          :expand-text="{
        expand: 'Custom more objects',
        collapse: 'Custom collapse',
      }"
          :total="visibleBoxes.length"
          :max-show-more-rows="maxShowMoreRows"
          :jump-to-top="jumpToTop"
          :show-action-button-boxes="showActionButtonBoxes"
          :use-pagination="usePagination"
          :use-expand-mode="useExpandMode"
          :max-rows="maxRows"
          :draggable="draggable"
          :expanded="!useExpandMode"
          header-text="This is the header text"
          @entry-selected="entrySelected"/>
    </div>
    <BaseBox>
      <div class="arrow_left">
        <BaseIcon
            :name="icons[7]"
            :title="icons[7]"
            class="icon">
          <span class="title">{{ icon }}</span>
        </BaseIcon>
      </div>
      <div class="arrow_right">
        <BaseIcon
            :name="icons[7]"
            :title="icons[7]"
            class="icon">
          <span class="title">{{ icon }}</span>
        </BaseIcon>
      </div>
      <div>
      </div>

    </BaseBox>
  </main>
</template>

<style scoped>
.section-canvas {
  padding: 16px;
  background: rgb(240, 240, 240);
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

