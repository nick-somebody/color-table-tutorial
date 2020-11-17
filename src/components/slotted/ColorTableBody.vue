<template>
  <tbody>
    <tr v-for="(row, rowIdx) in grid" :key="rowIdx">
      <td>
        <slot name="control" :row="{ rowIdx }"></slot>
      </td>
      <td v-for="(col, colIdx) in row" :key="colIdx">
        <slot name="cell" :cell="{ rowIdx, colIdx, color: color(col) }"></slot>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'color-table-body',
  props: ['grid'],
  methods: {
    color(col) {
      const {r, g, b} = col
      return {
        backgroundColor: `rgb(${r}, ${g}, ${b})`
      }
    }
  }
}
</script>