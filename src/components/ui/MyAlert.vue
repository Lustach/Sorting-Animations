<template>
<div class="my-alert">
<slot></slot>fasd
</div>
</template>

<script>
export default {
  name: "MyAlert",
}
</script>

<style scoped>
.my-alert{
  display: block;
  font-size: 16px;
  padding: 16px;
  transition: .3s cubic-bezier(.25,.8,.5,1);
  position: absolute;
  top: 40px;
  margin: 0 50vw 0 50vw;
  transform: translateY(-50%);
  background-color: #2196f3 !important;
  border-color: #2196f3 !important;
  color: white;
  border-radius: 4px;
}
</style>
