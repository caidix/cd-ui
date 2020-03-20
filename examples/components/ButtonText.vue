<template>
  <div>
    <cd-button
      type="success"
      :loading="loading"
      icon="on"
      :icon-position="'right'"
      plain
      to="http://www.baidu.com"
      @click="handleClick"
    >跳转到百度</cd-button>
    <cd-button type="warning" @click="handleWarning">警告</cd-button>
    <cd-button type="info" @click="handleClose">关闭警告提示</cd-button>
    <cd-button type="danger" @click="handleCloseBtn">带关闭按钮</cd-button>
    <cd-button type="primary" plain @click="handleCloseAll">关闭所有</cd-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      msg: null
    };
  },
  methods: {
    handleClick() {
      this.loading = true;
      console.log("ok");
    },
    handleWarning() {
      this.msg = this.$cdmessage({
        message: "向天再借五百年asdddddddddddddddddddddddddd",
        center: true,
        duration: 0,
        type: "warning",
        // background: true,
        onClose(el) {
          console.log(el);
        }
      });
    },
    handleCloseBtn() {
      this.$cdmessage.loading({
        message: "向天再借五百年",
        background: true,
        showClose: true
      });
    },
    handleClose() {
      this.msg.close();
    },
    handleCloseAll() {
      this.$cdmessage.closeAll();
    }
  }
};
</script>