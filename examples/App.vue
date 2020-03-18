<template>
  <div id="app">
   <ButtonText/>
   <FormText/>
   <CheckBoxText/>
   <BackTopText/>
   <RadioBoxText/>
  </div>
</template>

<script>
import ButtonText from './components/ButtonText'
import FormText from './components/FormText'
import CheckBoxText from './components/CheckBoxText'
import BackTopText from './components/BackTopText'
import RadioBoxText from './components/RadioBoxText'
export default {
  name:"App",
  components: {
    ButtonText,
    FormText,
    CheckBoxText,
    RadioBoxText,
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
