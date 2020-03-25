<template>
  <transition name="cdst-fade-in">
    <div
      class="cd-backtop"
      :class="{'cd-backtop__normal':!$slots.default}"
      v-if="visible"
      :style="{
        'right':styleRight,
        'bottom': styleBottom
      }"
      @click.stop="scrollToTop"
    >
      <slot>
        <i v-if="!$slots.default" class="icon-cd-left"></i>
      </slot>
    </div>
  </transition>
</template>

<script>
import { throttle } from "@/utils/assist";
export default {
  name: "cd-Backtop",
  props: {
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      visible: false,
      container: null,
      el: null
    };
  },
  computed: {
    styleBottom() {
      return `${this.bottom}px`;
    },
    styleRight() {
      return `${this.right}px`;
    }
  },
  mounted() {
    this.init();
    this.throttleScrollHandler = throttle(this.onScroll, 100);
    this.container.addEventListener("scroll", this.throttleScrollHandler);
  },
  beforeDestroy() {
    this.container.removeEventListener("scroll", this.throttleScrollHandler);
  },
  methods: {
    init() {
      this.container = window.document;
      this.el = document.documentElement;
    },
    onScroll() {
      let scrollTop = this.el.scrollTop;
      this.visible = scrollTop >= this.height;
    },
    scrollToTop() {
      let scrollTop = this.el.scrollTop;
      if ((scrollTop === 0 || scrollTop) && scrollTop < this.height) {
        this.visible = false;
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
      this.$emit("on-click");
    }
  }
};
</script>