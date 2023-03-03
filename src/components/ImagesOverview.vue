<template>
  <main>
    <div>
      <h1>
        Neueste Beiträge
        <small> ({{ entriesList.length }})</small>
      </h1>
    </div>
    <div class="images-view">
      <div
        v-for="element in displayedRecords"
        :key="element.id"
        class="list-item">
        <base-image-box
          class="image-wrapper"
          :box-size="{ width: 'unset' }"
          :image-url="element.imageUrl"
          :title="element.title"
          :subtext="element.subtext"
          :description="element.description">
          <img
            class="box-image"
            :src="element.imageUrl"
            alt="">
        </base-image-box>
      </div>
    </div>
    <div class="pagination">
      <BasePagination
        v-model="page"
        :total="totalPages()" />
    </div>
  </main>
</template>

<script>
import entriesList from '@/data';

export default {
  name: 'ImagesOverview',
  data() {
    const page = 1;
    const perPage = 12;
    return {
      entriesList,
      perPage,
      page,
    };
  },
  computed: {
    displayedRecords() {
      const startIndex = this.perPage * (this.page - 1);
      const endIndex = startIndex + this.perPage;
      return this.entriesList.slice(startIndex, endIndex);
    },
  },
  methods: {
    totalPages() {
      return Math.ceil(entriesList.length) / 12;
    },
  },
};
</script>

<style scoped>
.images-view {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

small {
  color: grey;
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

.pagination {
  width: 100%;
}

.pagination-input {
  margin: 16px auto 0;
  width: 200px;
}
</style>
