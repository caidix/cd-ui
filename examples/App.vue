<template>
  <div id="app">
    <ButtonText />
    <FormText />
    <CheckBoxText />
    <BackTopText />
    <RadioBoxText />
    <TableText />
    <TreeText />
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
    TreeText,
    Demo
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
