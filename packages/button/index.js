import cdButton from './src/button'
cdButton.install = function (Vue) {
  Vue.component(cdButton.name, cdButton)
}

export default cdButton;