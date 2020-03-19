import Display from './src/display'
Display.install = function (Vue) {
  Vue.component(Display.name, Display)
}
export default Display;