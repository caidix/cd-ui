<template>
  <div ref="display"></div>
</template>
<script>
import Vue from "vue";
function randomStr(len = 32) {
  const $chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const maxPos = $chars.length;
  let str = "";
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}
export default {
  props: {
    code: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      component: null,
      html: "",
      js: "",
      css: "",
      id: randomStr()
    };
  },
  methods: {
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(regex);
      if (!openingTag) return "";
      else openingTag = openingTag[0];
      return source.slice(
        source.indexOf(openingTag) + openingTag.length,
        source.lastIndexOf(`</${type}>`)
      );
    },
    splitCode() {
      const script = this.getSource(this.code, "script").replace(
        /export default/,
        "return "
      );
      const style = this.getSource(this.code, "style");
      const template =
        '<div id="app">' + this.getSource(this.code, "template") + "</div>";

      this.js = script;
      this.css = style;
      this.html = template;
    },
    renderCode() {
      this.splitCode();
      if (this.html !== "" && this.js !== "") {
        console.log(this.js)
        // new Function 函数将字符串类型的js转换为对象。
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function
        const parseStrToFunc = new Function(this.js)();
        parseStrToFunc.template = this.html;
        const Component = Vue.extend(parseStrToFunc);
        // 在这里调用了 $mount 方法对组件进行了手动渲染，此时并未对组件进行挂载，但是渲染后的component
        // 已经是一个标准的vue实例， 可以访问到它的$el属性(即实例)
        this.component = new Component().$mount();
        // 也可以将渲染的元素根节点挂在载body上：document.body.appendChild(component.$el);
        this.$refs.display.appendChild(this.component.$el);

        if (this.css !== "") {
          const style = document.createElement("style");
          style.type = "text/css";
          // 设立唯一ID，便于检索销毁
          style.id = this.id;
          style.innerHTML = this.css;
          document.getElementsByTagName("head")[0].appendChild(style);
        }
      }
    },
    destroyCode() {
      const $target = document.getElementById(this.id);
      if ($target) $target.parentNode.removeChild($target);

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    }
  },
  beforeDestroy() {
    this.destroyCode();
  },
  mounted() {
    this.renderCode();
  },
  watch: {
    // 当code改变时，将之前的销毁并重新render一次
    code() {
      this.destroyCode();
      this.renderCode();
    }
  }
};
</script>