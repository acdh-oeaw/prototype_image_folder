<template>
  <main>
    <div class="submenu">
      <base-button
        button-style="row"
        text="Alle Kunstwerke"
        :active="$route.path === '/'"
        @clicked="$router.push('/')" />
      <base-button
        button-style="row"
        text="Arbeitsmappen"
        :active="$route.path === '/albums'"
        @clicked="$router.push('/albums')" />
      <base-button
        class="submenu-item"
        button-style="row"
        text="Leitfaden Bildbenutzung" />
      <div class="search">
        <BaseSearch
          v-model="searchText"
          label="Search your Entries"
          placeholder="Durchsuche deine Arbeiten und Ereignisse" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'SubMenuSearch',
};
</script>

<style scoped>
.submenu {
  margin-top: 15px;
  margin-bottom: 50px;
  max-width: 1368px;
  display: flex;
  justify-content: flex-start;
}
.search {
  margin-left: auto;
  width: 57%;
}

</style>
