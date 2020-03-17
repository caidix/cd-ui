<template>
  <div id="app">
   <ButtonText/>
   <FormText/>
   <CheckBoxText/>
   <BackTopText/>
  </div>
</template>

<script>
import ButtonText from './components/ButtonText'
import FormText from './components/FormText'
import CheckBoxText from './components/CheckBoxText'
import BackTopText from './components/BackTopText'
export default {
  name:"App",
  components: {
    ButtonText,
    FormText,
    CheckBoxText,
    BackTopText
  }
}
</script>

<style>
#app {
  margin: 20px;
  height: 2000px;
}
</style>
