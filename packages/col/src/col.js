export default {
  name: 'cd-col',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    span: {
      type: Number,
      default: 24
    },
    offset: Number,
    pull: Number,
    push: Number,
  },
  computed: {
    gutter() {
      let parent = this.$parent;
      while (parent && parent.$options.name !== 'cd-row') {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  render(h) {
    let style = {};
    let classes = [];
    if (this.gutter) {
      style.marginLeft = this.gutter / 2 + 'px';
      style.marginRight = style.marginLeft;
    }
    ['span', 'offset', 'pull', 'push'].forEach(item => {
      if (this[item] || this[item] === 0) {
        classes.push(
          item === 'span' ? `cd-col-${this[item]}` : `cd-col-${item}-${this[item]}`
        )
      }
    })
    return h(this.tag, {
      class: [
        'cd-col', classes
      ],
      style
    }, this.$slots.default)
  },
}