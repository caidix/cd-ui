<template>
  <div id="app">
    <ButtonText />
    <FormText />
    <CheckBoxText />
    <BackTopText />
    <RadioBoxText />
    <!-- <DisplayText :code="code"/> -->
  </div>
</template>

<script>
import ButtonText from "./components/ButtonText";
import FormText from "./components/FormText";
import CheckBoxText from "./components/CheckBoxText";
import BackTopText from "./components/BackTopText";
import RadioBoxText from "./components/RadioBoxText";
import DisplayText from "./components/display";
import defaultCode from "./views/default-code.js";
export default {
  name: "App",
  components: {
    ButtonText,
    FormText,
    CheckBoxText,
    RadioBoxText,
    BackTopText,
    DisplayText
  },
  data() {
    return {
      code: defaultCode
    }
  },
};
</script>

<style>
#app {
  margin: 20px;
  height: 2000px;
}
</style>
