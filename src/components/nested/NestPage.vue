<template>
  <div>
    <div class="row">
      <div class="label">Rows:</div>
      <button type="button" @click="addRow">+</button>
      <div class="count">{{ grid.length }}</div>
      <button type="button" @click="remRow">-</button>
    </div>
    <div class="row">
      <div class="label">Cols:</div>
      <button type="button" @click="addCol">+</button>
      <div class="count">{{ columns.length }}</div>
      <button type="button" @click="remCol">-</button>
    </div>
    <color-table :grid="grid" :columns="columns" @randomize="randomize"></color-table>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import ColorTable from "./ColorTable.vue";
import { newRgb } from "../../helpers";

export default {
  name: "home-page",
  components: {
    ColorTable
  },
  setup() {
    const grid = reactive([
      [ newRgb() ]
    ])
    const columns = computed(() => {
      if (grid.length) {
        return grid[0]
      }
      return [] 
    })
    return { grid, columns }
  },
  methods: {
    addRow() {
      this.grid.push(this.columns.map((row) => {
        return newRgb()
      }))
    },
    remRow() {
      this.grid.splice(this.grid.length - 1, 1)
    },
    addCol() {
      for (let i = 0; i < this.grid.length; i++) {
        const row = this.grid[i];
        row.push(newRgb())
      }
    },
    remCol() {
      for (let i = 0; i < this.grid.length; i++) {
        const row = this.grid[i];
        row.splice(row.length - 1, 1)
      }
    },
    randomGrid() {
      for (let i = 0; i < this.grid.length; i++) {
        const row = this.grid[i];
        for (let j = 0; j < row.length; j++) {
          const cell = row[j];
          const {r, g, b} = newRgb()
          cell.r = r
          cell.g = g
          cell.b = b
        }
      }
    },
    randomRow(rowIdx) {
      const row = this.grid[rowIdx];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        const {r, g, b} = newRgb()
        cell.r = r
        cell.g = g
        cell.b = b
      }
    },
    randomColumn(colIdx) {
      for (let i = 0; i < this.grid.length; i++) {
        const row = this.grid[i];
        const cell = row[colIdx];
        const {r, g, b} = newRgb()
        cell.r = r
        cell.g = g
        cell.b = b
      }
    },
    randomCell(rowIdx, colIdx) {
      const cell = this.grid[rowIdx][colIdx]
      const {r, g, b} = newRgb()
      cell.r = r
      cell.g = g
      cell.b = b
    },
    randomize(params) {
      const hasRow = params.hasOwnProperty('rowIdx')
      const hasCol = params.hasOwnProperty('colIdx')
      const { rowIdx, colIdx } = params
      if (hasRow && hasCol) {
        this.randomCell(rowIdx, colIdx)
      } else if (hasRow) {
        this.randomRow(rowIdx)
      } else if (hasCol) {
        this.randomColumn(colIdx)
      } else {
        this.randomGrid()
      }
    }
  }
};
</script>
