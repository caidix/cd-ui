
<template>
  <div class="radiotextbox">
    未于组内
    <cd-radio v-model="simple">选我</cd-radio>
    <cd-radio>选我</cd-radio>
    <hr />组内
    <cd-radio-group vertical v-model="groupValue" @on-change="change">
      <cd-radio label="帅哥" disabled></cd-radio>
      <cd-radio label="酷哥"></cd-radio>
      <cd-radio label="猛哥"></cd-radio>
    </cd-radio-group>
    <cd-button type="info" plain @click="handleRadio">更改radioValue</cd-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      simple: false,
      groupValue: "帅哥"
    };
  },
  methods: {
    change(data) {
      console.log(data);
    },
    handleRadio() {
      this.groupValue = "酷哥";
    }
  }
};
</script>
<style lang="scss" scoped>
.radiotextbox {
  padding: 12px 14px;
  border: 1px solid #999;
  border-radius: 5px;
}
</style>