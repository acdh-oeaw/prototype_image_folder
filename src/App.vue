<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      selected: {},
    }
  }
})
</script>

<template>
  <main>
		<h1>A dropdown</h1>
    <BaseDropDown
      :showLabel="false"
      v-model="selected"
      :options="[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'Blue' },
        { label: 'Green', value: 'Green' },
        { label: 'Turquoise', value: 'Turquoise' },
      ]"
      header-style="single"
      label="Select a Color"
      placeholder="Select A Color"
    />
  </main>
</template>

<style>
main {
	padding-block: 2rem;
	padding-inline: 2rem;
}
</style>
