import Button from '~/button'
import Form from '~/form'
import Backtop from '~/backtop'
import FormItem from '~/form-item'
import Input from '~/input'
const components = [
  Button, FormItem,
  Form, Input, Backtop
]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;
  components.forEach(component => {
    Vue.component(component.name, component);
  })
}
export default {
  version: '0.0.1',
  install,
  Button, FormItem,
  Form, Input, Backtop
}