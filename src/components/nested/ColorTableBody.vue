<template>
  <tbody>
    <tr v-for="(row, rowIdx) in grid" :key="rowIdx">
      <td>
        <button type="button" @click="randomize({rowIdx})">Randomize Row</button>
      </td>
      <td v-for="(col, colIdx) in row" :key="colIdx">
        <button type="button" class="color-btn" :style="color(col)" @click="randomize({ rowIdx, colIdx })">
          {{color(col).backgroundColor}}
        </button>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'color-table-body',
  props: ['grid'],
  methods: {
    randomize(params) {
      this.$emit('randomize', params)
    },
    color(col) {
      const {r, g, b} = col
      return {
        backgroundColor: `rgb(${r}, ${g}, ${b})`
      }
    }
  }
}
</script>