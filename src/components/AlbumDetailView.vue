<template>
  <main>
  <div class="workfolder-title">
    <small>Arbeitsmappe</small>
    <h1 class="title">Moderne Plastik</h1>
  </div>
    <div>
  <ButtonMenu></ButtonMenu>
    </div>
    <div>
      <DragAndDrop></DragAndDrop>
    </div>
  </main>
</template>

<script>
import ButtonMenu from "@/components/ButtonMenu.vue";
import DragAndDrop from "@/components/DragAndDrop.vue";

export default {
  name: "AlbumDetailView",
  components: {DragAndDrop, ButtonMenu}
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

.workfolder-title {

}
</style>