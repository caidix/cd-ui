<template>
  <div id="app">
    <cd-button type="primary">button</cd-button>
    <cd-form labelPosition='right' ref="form" :model="formValidate" :rules="ruleValidate">
      <cd-form-item prop="name" label="姓名：" :show-message="false">
        <cd-input v-model="formValidate.name" type="text" />
      </cd-form-item>
      <cd-form-item prop="mail" label="邮箱：">
        <cd-input v-model="formValidate.mail" type="text" />
      </cd-form-item>
    </cd-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    console.log(this);
  },
  data() {
    return {
      formValidate: {
        name: "",
        mail: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          window.alert("提交成功");
        } else {
          window.alert("表单校验失败");
        }
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
