<template>
  <div id="app">
   <ButtonText/>
   <FormText/>
   <BackTopText/>
  </div>
</template>

<script>
import ButtonText from './components/ButtonText'
import FormText from './components/FormText'
import BackTopText from './components/BackTopText'
export default {
  name:"App",
  components: {
    ButtonText,
    FormText,
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
