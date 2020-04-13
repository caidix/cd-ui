<template>
  <div style="border:1px solid #000;margin:10px;">
    <cd-row :gutter="20" type="flex" justify="center">
      <cd-col :span="10">123</cd-col>
      <cd-col :span="10" :offset="3">456</cd-col>
    </cd-row>
  </div>
</template>

<script>
export default {};
</script>