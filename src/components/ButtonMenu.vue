<template>
<div class="button-menu">
  <ul class="menu-list">
    <li>
      <BaseDropButton
          :buttons="button1">
      </BaseDropButton>
    </li>
    <li>
      <BaseDropButton
          :buttons="button2">
      </BaseDropButton>
    </li>
    <li>
      <BaseDropButton
          :buttons="button3">
      </BaseDropButton>
    </li>
    <li>
      <BaseDropButton
          :buttons="button4">
      </BaseDropButton>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "ButtonMenu",
  data() {
    return {
      button1: [{
        label: 'Download',
        action: 'delete',
        icon: 'download',
      }],
      button2: [{
        label: 'Zum Bearbeiten einladen',
        action: 'delete',
        icon: 'people',
      }],
      button3: [{
        label: 'Kunstwerk hinzufügen',
        action: 'delete',
        icon: 'plus',
      }],
      button4: [{
        label: 'Arbeitsmappe löschen',
        action: 'delete',
        icon: 'waste-bin',
      }],
    }
  },
}
</script>

<style scoped>
.button-menu {
  padding-bottom: 3px;
}

.menu-list {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
</style>