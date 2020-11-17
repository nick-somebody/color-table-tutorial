<template>
  <table>
    <color-table-head :columns="columns" @randomize="randomize" />
    <color-table-body :grid="grid" @randomize="randomize" />
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
    randomize(params) {
      this.$emit('randomize', params)
    }
  },
};
</script>
