import CDForm from './src/form'

CDForm.install = function (Vue) {
  Vue.component(CDForm.name, CDForm)
}

// export * from './src/form-model'
export default CDForm