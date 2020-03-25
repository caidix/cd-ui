export default {
  functional: true,
  inject: ['tableRoot'],
  props: {
    row: Object,
    column: Object,
    index: Number
  },
  render: (h, context) => {
    return h('div', context.injections.tableRoot.$scopedSlots[context.props.column.slot]({
      row: context.props.row,
      column: context.props.column,
      index: context.props.index
    }))
  }
}
/**
 * 
FunctionalRenderContext {data: {…}, props: {…}, children: undefined, parent: VueComponent, listeners: {…}, …}
children: undefined
data: {attrs: {…}}
injections:
  tableRoot: VueComponent {_uid: 37, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
listeners: {}
parent: VueComponent {_uid: 37, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
props: {row: {…}, column: {…}, index: 0}
scopedSlots: Object
slots: ƒ ()
_c: ƒ (a, b, c, d)
get scopedSlots: ƒ ()
__proto__: Object
 */