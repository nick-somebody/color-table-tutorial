<template>
  <table>
    <color-table-head :columns="columns" @randomise="randomise" />
    <color-table-body :grid="grid" @randomise="randomise" />
  </table>
</template>

<script>
import ColorTableHead from './ColorTableHead.vue'
import ColorTableBody from './ColorTableBody.vue'

export default {
  name: "color-table",
  components: {
    ColorTableHead,
    ColorTableBody,
  },
  props: ['grid', 'columns'],
  methods: {
    randomise(params) {
      this.$emit('randomise', params)
    }
  },
};
</script>
