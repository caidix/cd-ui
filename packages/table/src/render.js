/**
 * render函数返回的是一个js对象，没有传统 DOM 的层级关系
 * 配合上 if、else、for 等语句，将节点拆分成不同 JS 对象再组装
 */
export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    render: Function
  },
  //createElement 函数会返回一个虚拟dom，也就是我们常说的vNode
  //使用函数化组件，Render 函数提供了第二个参数 context 来提供临时上下文
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index
    }
    return ctx.props.render(h, params)
  }
}