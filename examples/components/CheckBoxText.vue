<template>
  <div class="textCheckbox">
    <cd-checkbox v-model="single">哥哥{{single}}</cd-checkbox>
    <hr />
    <div>
      <cd-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @on-change="handleCheckAllChange"
      >全选</cd-checkbox>
    </div>
    <cd-checkbox-group v-model="value" @on-change="handleChange">
      <cd-checkbox label="弟弟"></cd-checkbox>
      <cd-checkbox label="哥哥">
        <span>哥哥</span>
      </cd-checkbox>
    </cd-checkbox-group>
    <cd-button type="primary" @click="getChecked">查看checkboxgroup</cd-button>
  </div>
</template>

<script>
const checkAllValue = ["弟弟", "哥哥"];
export default {
  data() {
    return {
      single: false,
      isIndeterminate: true,
      checkAll: true,
      allValues: checkAllValue,
      value: ["弟弟"]
    };
  },
  methods: {
    getChecked() {
      console.log(this.value);
    },
    handleChange(v) {
      console.log(v);
      let checkedCount = v.length;
      this.checkAll = checkedCount === this.allValues.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allValues.length;
    },
    handleCheckAllChange(val) {
      this.value = val ? this.allValues : [];
      this.isIndeterminate = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.textCheckbox {
  padding: 12px 14px;
  border: 1px solid #999;
  border-radius: 5px;
}
</style>