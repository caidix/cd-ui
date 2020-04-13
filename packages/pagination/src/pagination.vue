<template>
  <div class="cd-pagination" v-if="showPagination">
    <button>
      <i class="icon-cd-left"></i>
    </button>
    <ul class="cd-paper">
      <li v-for="(item, index) in pageList" :key="index"></li>
    </ul>
    <button>
      <i class="icon-cd-right"></i>
    </button>
  </div>
</template>
<script>
import CdInput from "../../input";

export default {
  name: "cd-pagination",
  components: {
    CdInput
  },
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: Number,
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    showPagination() {
      return this.total > 0;
    }
  },
  watch: {
    total: val => {
      if (typeof val === "number") {
        this.pageSizes = Math.round(val / this.pageSize);
      }
    }
  },
  data() {
    return {
      internalCurrentPage: 1,
      pageSizes: 0
    };
  }
};
</script>