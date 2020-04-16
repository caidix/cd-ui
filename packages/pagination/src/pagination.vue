<template>
  <div
    class="cd-pagination"
    :class="{'cd-pagination__background': background}"
    v-if="showPagination"
  >
    <span v-if="showTotal" class="cd-pagination__total">共 {{total}} 条</span>
    <button class="cd-pagination--left" :class="{'is-disabled':!prevPage}" @click="handlePrevPage">
      <i class="icon-cd-left"></i>
    </button>
    <ul class="cd-paper" @click="currentChange">
      <li
        :class="['number', {
          checked: internalCurrentPage === 1
        }]"
        v-if="pageSizes> 1"
      >1</li>
      <li v-show="showMorePrev" class="number show-prev">...</li>
      <li
        v-for="i in pageList"
        :class="['number', {
          checked: i === internalCurrentPage
        }]"
        :key="i"
      >{{i}}</li>
      <li v-show="showMoreNext" class="number show-next">...</li>
      <li
        :class="['number', {
          checked: internalCurrentPage === pageSizes
        }]"
        v-if="pageSizes> 0"
      >{{pageSizes}}</li>
    </ul>
    <button class="cd-pagination--right" :class="{'is-disabled':!nextPage}" @click="handleNextPage">
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
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    background: {
      type: Boolean,
      default: false
    },
    disableOnePage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showPagination() {
      return (
        this.total > 0 && (this.disableOnePage ? this.pageSizes > 1 : true)
      );
    },
    prevPage() {
      return this.internalCurrentPage !== 1;
    },
    nextPage() {
      return this.internalCurrentPage !== this.pageSizes;
    },
    pageSizes() {
      return Math.ceil(this.total / this.pageSize);
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
  watch: {
    pageSize(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit("size-change", newValue, oldValue);
      }
    }
  },
  data() {
    return {
      internalCurrentPage: this.currentPage,
      showMorePrev: false,
      showMoreNext: false
    };
  },
  methods: {
    currentChange(event) {
      const target = event.target;
      if (target.tagName === "UL") return;
      let newPage = Number(event.target.textContent);
      const currentPage = this.internalCurrentPage;
      const pageOffset = Math.floor(this.pagerCount / 2);
      if (target.className.indexOf("show-next") !== -1) {
        newPage = currentPage + pageOffset;
      }
      if (target.className.indexOf("show-prev") !== -1) {
        newPage = currentPage - pageOffset;
      }
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageSizes) {
        newPage = this.pageSizes;
      }
      if (newPage !== currentPage) {
        this.internalCurrentPage = newPage;
        this.$emit("current-change", newPage);
      }
    },
    handlePrevPage() {
      if (this.internalCurrentPage > 1) {
        this.internalCurrentPage--;
        this.$emit("prev-page", this.internalCurrentPage);
      }
    },
    changeShowMore(showMorePrev, showMoreNext) {
      this.showMorePrev = showMorePrev;
      this.showMoreNext = showMoreNext;
    },
    handleNextPage() {
      if (this.internalCurrentPage < this.pageSizes) {
        this.internalCurrentPage++;
        this.$emit("next-page", this.internalCurrentPage);
      }
    },
    handleMorePrevPage() {
      const currentPage =
        this.internalCurrentPage - Math.floor(this.pagerCount / 2) - 1;
      if (currentPage) return;
    }
  }
};
</script>