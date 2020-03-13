function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.call(child, componentName, eventName, params);
    }
  })
}
export default {
  methods: {
    /**
    * @desc 向上遍历找寻对应组件名称的父组件分发事件
    * @param {*} componentName
    * @param {*} eventName
    * @param {*} params
    */
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      // 当有父级且父级没有命名或是名字不等于传入的名字时
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    /**
    * @desc 向下遍历找寻对应组件名称的子组件分发事件
    * @param {*} componentName
    * @param {*} eventName
    * @param {*} params
    */
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  },
}