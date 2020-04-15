<template>
  <div class="cd-pagination" v-if="showPagination">
    <button class="cd-pagination--left" v-show="prevPage" @click="handlePrevPage">
      <i class="icon-cd-left"></i>
    </button>
    <ul class="cd-paper">
      <li
        :class="['number', {
          checked: internalCurrentPage === 1
        }]"
        @click="handlePage(1)"
        v-if="pageSizes> 0"
      >1</li>
      <li v-show="showMorePrev" :class="['number']" @click="handlePage(1)">...</li>
      <li
        v-for="i in pageList"
        :class="['number', {
          checked: i === internalCurrentPage
        }]"
        :key="i"
        @click="handlePage(i)"
      >{{i}}</li>
      <li v-show="showMoreNext" :class="['number']" @click="handlePage(1)">...</li>
      <li
        :class="['number', {
          checked: internalCurrentPage === pageSizes
        }]"
        v-if="pageSizes> 0"
        @click="handlePage(pageSizes)"
      >{{pageSizes}}</li>
    </ul>
    <button class="cd-pagination--right" v-show="nextPage" @click="handleNextPage">
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
    },
    pagerCount: {
      type: Number,
      validator(value) {
        return (
          (value | 0) === value && value > 4 && value < 22 && value % 2 === 1
        );
      },
      default: 7
    }
  },
  computed: {
    showPagination() {
      return this.total > 0;
    },
    prevPage() {
      return this.internalCurrentPage !== 1;
    },
    nextPage() {
      return this.internalCurrentPage !== this.pageSizes;
    },
    pageSizes() {
      return Math.round(this.total / this.pageSize);
    },
    pageList() {
      let pager = [];
      let showMorePrev = false;
      let showMoreNext = false;
      const pageSizes = this.pageSizes;
      const pagerCount = this.pagerCount;
      const halfPagerCount = (this.pagerCount - 1) / 2;
      const currentPage = this.internalCurrentPage;
      if (pagerCount < pageSizes) {
        if (currentPage > pagerCount - halfPagerCount) {
          showMorePrev = true;
        }
        if (currentPage < pageSizes - halfPagerCount) {
          showMoreNext = true;
        }
      }
      if (!showMorePrev && !showMoreNext) {
        for (let i = 2; i < pageSizes; i++) {
          pager.push(i);
        }
      }
      if (showMorePrev && !showMoreNext) {
        for (let i = pageSizes - pagerCount + 2; i < pageSizes; i++) {
          pager.push(i);
        }
      }
      if (!showMorePrev && showMoreNext) {
        for (let i = 2; i < pagerCount; i++) {
          pager.push(i);
        }
      }
      if (showMorePrev && showMoreNext) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          pager.push(i);
        }
      }
      this.changeShowMore(showMorePrev, showMoreNext);
      return pager;
    }
  },
  watch: {},
  data() {
    return {
      internalCurrentPage: this.currentPage,
      showMorePrev: false,
      showMoreNext: false
    };
  },
  methods: {
    handlePage(i) {
      this.internalCurrentPage = i;
    },
    handlePrevPage() {
      if (this.internalCurrentPage > 1) {
        this.internalCurrentPage--;
      }
    },
    changeShowMore(showMorePrev, showMoreNext) {
      this.showMorePrev = showMorePrev;
      this.showMoreNext = showMoreNext;
    },
    handleNextPage() {
      if (this.internalCurrentPage < this.pageSizes) {
        this.internalCurrentPage++;
      }
    },
    handleMorePrevPage() {
      const currentPage = this.internalCurrentPage - Math.floor(this.pagerCount / 2) - 1
      if (currentPage) return ;
    }
  }
};
</script>