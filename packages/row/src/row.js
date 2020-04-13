export default {
  name: 'cd-row',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    type: String,
    gutter: Number,
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
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
    return h(this.tag, {
      class: [
        'cd-row', {

        }
      ],
      style: this.style
    }, this.$slots.default)
  },
}