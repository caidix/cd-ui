<template>
  <table class="cd-calendar__year">
    <tr v-for="(row, index) in count" :key="index">
      <td
        v-for="(col, _index) in count"
        :key="_index"
        @click="$emit('year-change', years[count * index + _index])"
      >
        <span
          :class="[{ 'is-actived': years[count * index + _index] === year}]"
        >{{years[count * index + _index]}}</span>
      </td>
    </tr>
  </table>
</template>

<script>
function generateArray(start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start);
}
export default {
  name: "cd-year-picker",
  props: {
    year: {
      type: Number,
      default: 2012
    }
  },
  data() {
    return {
      count: 3
    };
  },
  computed: {
    years() {
      let start = this.year - 4;
      const end = this.year + 4;
      start = start < 1995 ? 1995 : start;
      return generateArray(start, end);
    }
  }
};
</script>