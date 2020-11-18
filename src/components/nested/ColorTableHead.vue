<template>
  <thead>
    <tr>
      <th><button type="button" @click="randomise({})">Randomise all</button></th>
      <th v-for="(col, colIdx) in columns" :key="colIdx">
        <button type="button" @click="randomise({ colIdx })">Randomise column</button>
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'color-table-head',
  props: ['columns'],
  methods: {
    randomise(params) {
      this.$emit('randomise', params)
    }
  }
}
</script>