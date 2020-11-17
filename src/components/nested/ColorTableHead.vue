<template>
  <thead>
    <tr>
      <th><button type="button" @click="randomize({})">Randomise all</button></th>
      <th v-for="(col, colIdx) in columns" :key="colIdx">
        <button type="button" @click="randomize({ colIdx })">Randomise column</button>
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'color-table-head',
  props: ['columns'],
  methods: {
    randomize(params) {
      this.$emit('randomize', params)
    }
  }
}
</script>