<template>
  <thead>
    <tr>
      <th>
        <slot name="all"></slot>
      </th>
      <th v-for="(col, colIdx) in columns" :key="colIdx">
        <slot name="column" :column="{ colIdx }"></slot>
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'color-table-head',
  props: ['columns'],
}
</script>