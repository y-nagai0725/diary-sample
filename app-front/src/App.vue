<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import DiaryMain from "./components/DiaryMain.vue";
</script>

<template>
  <div class="container">
    <TheHeader />

    <main>
      <DiaryMain />
    </main>

    <TheFooter />
  </div>
</template>

<style lang="scss">
.container {

}
</style>
