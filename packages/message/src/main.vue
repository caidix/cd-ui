<template>
  <transition name="cd-message-fade">
    <div
      class="cd-message"
      :class="[
    type && `cd-message--${type}`
    ]"
      v-show="visible"
      :style="contentStyle"
    >
      <p class="cd-message__content">{{message}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: "",
      duration: 3000, // 过渡时间
      verticalOffset: 20, // 距离顶部视口高度
      type: "info",
      iconClass: "",
      onClose: null,
      closed: false,
      timer: null
    };
  },
  computed: {
    contentStyle() {
      let style = {};
      if (typeof this.verticalOffset === "number") {
        style.top = this.verticalOffset + "px";
      }
      return style;
    }
  },
  watch: {
    closed(val) {
      if (val) {
        this.visible = false;
      }
    }
  },
  methods: {
    close() {
      if (!this.closed) {
        this.closed = true;
        if (typeof this.onClose === "function") {
          this.onClose();
        }
      }
    },
    startTimeout() {
      if (this.duration > 0) {
        this.timer = window.setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    clearTimeout() {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    // mouseEvent(event) {

    // }
  },
  mounted() {
    this.startTimeout();
    // document.addEventListener('mouseenter')
  },
  beforeDestroy() {
    this.$destroy(true);
    this.$el.parentNode.removeChild(this.$el);
  }
};
</script>