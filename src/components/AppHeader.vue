<template>
  <main>
    <div class="header">
      <h1
        class="title"
        style="font-size: 25px; padding-top: 7px; padding-left: 20px;
        font-family: 'Source Sans Pro, Helvetica Neue, Helvetica,Arial' ,sans-serif;">
        base
      </h1>
      <div class="display-items">
        <base-drop-down
          class="drop-down"
          placeholder="Max Mustermann" />
        <BaseButton
          text="Image+"
          button-style="row"
          :active="true"
          icon="subscribe" />
        <BaseButton
          text="Recherche"
          button-style="row"
          icon="subscribe" />
        <BaseButton
          text="Hilfe"
          button-style="row"
          icon="subscribe" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped>
.header {
  display: flex;
  color: #080808;
  max-width: 1368px;
  top: 16px;
  width: 100%;
  background: white;
  margin: auto;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, .05));
  align-items: center;
}

.display-items {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}

.drop-down {
  display: flex;
  align-items: center;
}

</style>
