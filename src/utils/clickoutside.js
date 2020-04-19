import Vue from "vue";

let nodeList = [];
let seed = 0;
let nowClickDom;
const rtx = "@clickOutSide";
const addEvent = (function() {
  if (document.addEventListener) {
    return function(element, event, func) {
      if (element && event && func) {
        element.addEventListener(event, func, false);
      }
    };
  } else {
    return function(element, event, func) {
      if (element && event && func) {
        element.attachEvent("on" + event, func);
      }
    };
  }
})();

addEvent(document, "mousedown", (e) => (nowClickDom = e));
addEvent(document, "mouseup", (e) => {
  nodeList.forEach((dom) => {
    dom[rtx].documentHandler(e, nowClickDom);
  });
});

function createDocumentHandler(el, binding, vnode) {
  return function(mouseup = {}, mousedown = {}) {
    if (
      !vnode ||
      !vnode.context || //vnode.context 是否存在，不存在退出
      !mouseup.target || // mouseup.target 是否存在，不存在退出
      !mousedown.target || //mousedown.target 是否存在，不存在退出
      el.contains(mousedown.target) || //el是否包含mouseup.target/mousedown.target子节点，如果包含说明点击的是绑定元素的内部，则不执行clickoutside指令内容
      el.contains(mouseup.target) ||
      el === mouseup.target || //绑定对象el是否等于mouseup.target，等于说明点击的就是绑定元素自身，也不执行clickoutside指令内容
      (vnode.context.popperElm &&
        (vnode.context.popperElm.contains(mouseup.target) ||
          vnode.context.popperElm.contains(mousedown.target)))
    ) {
      return;
    }
    el[rtx].bindingFn && el[rtx].bindingFn();
  };
}
export default {
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = seed++;
    el[rtx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methods: binding.expression,
      bindingFn: binding.value,
    };
  },
  update(el, binding, vnode) {
    el[rtx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[rtx].methods = binding.expression;
    el[rtx].bindingFn = binding.value;
  },
  unbind(el) {
    for (let index = 0; index < nodeList.length; index++) {
      let node = nodeList[index];
      if (node === el) {
        nodeList.splice(index, 1);
        break;
      }
    }
    delete el[rtx];
  },
};
