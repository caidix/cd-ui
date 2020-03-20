<template>
  <transition name="cd-message-fade" @after-leave="destoryElement">
    <div
      class="cd-message"
      :class="[
    type && `cd-message--${type}`,
    {
      'is-center': center,
      'is-close': showClose,
      'is-background':background
    }
    ]"
      v-show="visible"
      :style="contentStyle"
      @mouseenter="clearTimeout"
      @mouseleave="startTimeout"
    >
      <i :class="typeClass"></i>
      <p class="cd-message__content">{{message}}</p>
      <i class="icon-cd-delete" v-if="showClose" @click="close"></i>
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
      center: false,
      onClose: null,
      showClose: false,
      closed: false,
      timer: null,
      background: false
    };
  },
  computed: {
    contentStyle() {
      let style = {};
      if (typeof this.verticalOffset === "number") {
        style.top = this.verticalOffset + "px";
      }
      return style;
    },
    typeClass() {
      if (this.type && !this.iconClass) {
        return this.type !== "loading"
          ? `icon-cd-${this.type}-circle`
          : "icon-cd-spinner";
      } else {
        return this.iconClass ? `icon-cd-${this.iconClass}` : "";
      }
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
      if (this.timer !== null) {
        window.clearTimeout(this.timer);
        this.timer = null;
      }
    },
    destoryElement() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  mounted() {
    this.startTimeout();
    // document.addEventListener('mouseenter')
  }
};
</script>