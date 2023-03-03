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
    </div>
  </main>
</template>

<script>
export default {
  name: 'SubMenu',
};
</script>

<style scoped>
.submenu {
  margin-top: 15px;
  margin-bottom: 50px;
  max-width: 1368px;
  display: flex;
  justify-content: flex-start;
  background: white;
  border-bottom: solid 1px #c8c8c8;
}

</style>
