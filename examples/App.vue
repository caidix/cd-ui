<template>
  <div id="app">
    <ButtonText />
    <FormText />
    <CheckBoxText />
    <BackTopText />
    <RadioBoxText />
    <TableText />
    <TreeText />
    <HelloWorld />
    <Demo />
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
import TableText from "./components/TableText";
import TreeText from "./components/TreeText";
import HelloWorld from "./components/HelloWorld";
import Demo from "./components/renderTemplate/demo";
import defaultCode from "./views/default-code.js";
export default {
  name: "App",
  components: {
    ButtonText,
    TableText,
    FormText,
    CheckBoxText,
    RadioBoxText,
    BackTopText,
    DisplayText,
    HelloWorld,
    TreeText,
    Demo
  },
  mounted(){
    console.log(this.$options)
    console.log(this)
  },
  data() {
    return {
      code: defaultCode
    };
  }
};
</script>

<style>
#app {
  margin: 20px;
  height: 2000px;
}
</style>
