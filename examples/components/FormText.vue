<template>
  <div>
    <cd-form
      labelPosition="right"
      ref="form"
      :model="formValidate"
      :labelWidth="80"
      :rules="ruleValidate"
    >
      <cd-form-item prop="name" label="姓名：">
        <cd-input v-model="formValidate.name" type="text" />
      </cd-form-item>
      <cd-form-item prop="mail" label="邮箱：">
        <cd-input v-model="formValidate.mail" type="text" />
      </cd-form-item>
      <cd-form-item prop="checkbox" label="身份：">
        <cd-checkbox-group v-model="formValidate.checkbox">
          <cd-checkbox label="弟弟">弟弟</cd-checkbox>
          <cd-checkbox label="哥哥">哥哥</cd-checkbox>
        </cd-checkbox-group>
      </cd-form-item>
    </cd-form>
    <button @click="handleSubmit">
      <i class="icon-cd-twiter"></i> 提交
    </button>
    <button @click="handleReset">重置</button>
    <i class="icon-cd-delete"></i>
    <br />输入
    <cd-input v-model="value" type="password" showPassword></cd-input>
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      formValidate: {
        name: "",
        mail: "",
        checkbox: []
      },
      ruleValidate: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        checkbox: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "至少要选择一项",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.formValidate);
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
    },
    handerBlur(e) {
      console.log(e);
    }
  }
};
</script>