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
<color-table>
  <color-table-head :columns="columns">
    <template v-slot:all>
      <button type="button" @click="randomGrid()">
        Randomise all
      </button>
    </template>
    <template v-slot:column="{ column: { colIdx } }">
      <button type="button" @click="randomColumn(colIdx)">
        Randomise column
      </button>
    </template>
  </color-table-head>
  <color-table-body :grid="grid">
    <template v-slot:control="{ row: { rowIdx } }">
      <button type="button" @click="randomRow(rowIdx)">
        Randomize Row
      </button>
    </template>
    <template v-slot:cell="{ cell: { rowIdx, colIdx, color } }">
      <button class="color-btn" type="button" @click="randomCell(rowIdx, colIdx)" :style="color">
        {{ color.backgroundColor }}
      </button>
    </template>
  </color-table-body>
</color-table>
  </div>
</template>

<script>
import ColorTable from "./ColorTable.vue";
import ColorTableHead from './ColorTableHead.vue'
import ColorTableBody from './ColorTableBody.vue'
import { newRgb } from "../../helpers";
import { computed, reactive } from 'vue';

const computeColumns = (grid) => {
  return () => {
    if (grid.length) {
      return grid[0]
    }
    return [] 
  }
}

export default {
  name: "home-page",
  components: {
    ColorTable,
    ColorTableHead,
    ColorTableBody,
  },
  setup() {
    const grid = reactive([
      [ newRgb() ]
    ])
    const columns = computed(computeColumns(grid))
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
  }
};
</script>
