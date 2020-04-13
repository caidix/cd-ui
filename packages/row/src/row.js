export default {
  name: "cd-row",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    type: String,
    gutter: Number,
    justify: {
      type: String,
      default: "start"
    },
    align: {
      type: String,
      default: "top"
    }
  },
  computed: {
    style() {
      let style = {};
      if (this.gutter && Number.isInteger(this.gutter)) {
        style.marginLeft = `-${this.gutter / 2}px`;
        style.marginRight = style.marginLeft;
      }
      return style;
    }
  },
  render(h) {
    return h(
      this.tag,
      {
        class: [
          "cd-row",
          this.justify !== "start" ? `is-justify-${this.justify}` : "",
          this.align !== "top" ? `is-align-${this.align}` : "",
          this.type && this.type === "flex" ? "cd-row--flex" : ""
        ],
        style: this.style
      },
      this.$slots.default
    );
  }
};
