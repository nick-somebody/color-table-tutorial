<template>
  <div>
    <h2>Nested</h2>
    <nest-page></nest-page>
    <h2>Slotted</h2>
    <slot-page></slot-page>
  </div>
</template>

<script>
import NestPage from "./components/nested/NestPage.vue";
import SlotPage from "./components/slotted/SlotPage.vue";

export default {
  name: "App",
  components: {
    NestPage,
    SlotPage,
  }
};
</script>

