import Button from '~/button'
import Form from '~/form'
import Backtop from '~/backtop'
import Radio from '~/radio'
import RadioGroup from '~/radio-group'
import Checkbox from '~/checkbox'
import CheckboxGroup from '~/checkbox-group'
import FormItem from '~/form-item'
import Message from '~/message'
import Input from '~/input'
import Table from '~/table'
import Tree from '~/tree'
import Pagination from '~/pagination'
import Row from '~/row'
import Col from '~/col'
const components = [
  Button, FormItem, Checkbox,
  Form, Input, Backtop,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Table,
  Tree,
  Pagination,
  Row,
  Col
]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;
  components.forEach(component => {
    Vue.component(component.name, component);
  })
  Vue.prototype.$cdmessage = Message;
}

export default {
  version: '0.0.1',
  install,
  Button, FormItem, Checkbox,
  Form, Input, Backtop,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Table,
  Tree,
  Pagination,
  Row,
  Col
}