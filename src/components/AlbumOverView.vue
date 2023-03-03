<template>
  <div>
    <draggable
      class="draggable-list"
      :list="albums"
      group="my-group"
      :animation="300"
      ...>
      <div
        v-for="element in albums"
        :key="element.id"
        class="list-item">
        <base-box-button
          class="image-wrapper"
          :box-size="{ width: 'unset' }"
          :text="element.title"
          icon="collection"
          @clicked="$router.push(`/album/${element.album_id}`)" />
      </div>
      <base-box-button
        icon="add-existing-collection"
        text="Neuen Ordner erstellen"
        :show-title="false"
        :box-size="{ width: 'unset' }"
        class="box" />
      <base-box-button
        icon="add-existing-object"
        box-style="large"
        text="Neue Arbeitsmappe erstellen"
        :show-title="false"
        :box-size="{ width: 'unset' }"
        class="box" />
    </draggable>
  </div>
</template>

<script>
import albums from '@/albums';
import draggable from 'vuedraggable';

export default {
  name: 'AlbumOverView',
  components: {
    draggable,
  },
  data() {
    return {
      albums,
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
