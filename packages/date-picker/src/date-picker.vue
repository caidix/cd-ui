<template>
  <div class="cd-date-picker" v-Clickoutside="closeModal">
    <cd-input :value="formateDate" @focus="handleFocus"></cd-input>
    <div class="cd-date-picker__panel" v-show="visiblePanel">
      <div class="cd-date-picker__control">
        <i class="cd-icon-warning"></i>
      </div>
      <div class="cd-date-picker__day">
        <span v-for="(item) in enums" :key="item">{{item}}</span>
        <span
          :class="[isCurrentMouth(item)? isToday(item)?'current':'current-mouth':'other-mouth']"
          v-for="(item, index) in formatDays"
          :key="index"
          @click="changeDate(item)"
        >{{item|getDate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CdInput from "../../input/src/input";
import utils from "@/utils/formatTimeDate";
import Clickoutside from "@/utils/clickoutside";
const enums = ["一", "二", "三", "四", "五", "六", "日"];
export default {
  name: "cd-date-picker",
  directives: { Clickoutside },
  components: {
    CdInput,
  },
  filters: {
    getDate(val) {
      return val.getDate();
    }
  },
  props: {
    value: {
      type: Date,
      default() {
        return new Date();
      }
    }
  },
  watch: {
    value(val) {
      if (val instanceof Date) {
        this.currentDate = val;
      }
    },
    currentDate(val) {
      const { year, month } = utils.getYearMonthDay(val);
      this.currentYear = Number(year);
      this.currentMonth = Number(month + 1);
    }
  },
  computed: {
    formateDate() {
      const { year, month, day } = utils.getYearMonthDay(this.currentDate);
      return `${year}-${month + 1}-${day}`;
    },
    formatDays() {
      return utils.formatDays(this.currentDate);
    }
  },
  data() {
    const { year, month } = utils.getYearMonthDay(this.value);
    return {
      visiblePanel: false,
      enums,
      currentDate: this.value,
      currentYear: year,
      currentMonth: month
    };
  },
  mounted() {},
  methods: {
    handleFocus() {
      this.visiblePanel = true;
    },
    closeModal() {
      this.visiblePanel = false;
    },
    isCurrentMouth(date) {
      const { year, month } = utils.getYearMonthDay(this.currentDate);
      const { year: y, month: m } = utils.getYearMonthDay(date);
      return year === y && month === m;
    },
    isToday(date) {
      const { year, month, day } = utils.getYearMonthDay(this.currentDate);
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    changeDate(date) {
      this.currentDate = date;
      this.$emit("update:value", date);
      this.$emit("change", date);
      this.closeModal();
    }
  }
};
</script>