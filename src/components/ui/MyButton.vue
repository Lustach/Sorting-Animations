<template>
  <button class="my-btn" :class="{'my-btn--text': text, 'my-btn--outline':outline,'my-btn--active' : active}">
    <slot name="title"></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    text: {
      type: Boolean,
    },
    outline: {
      type: Boolean,
    },
    active: {
      type: Boolean,
    }
  }
}
</script>

<style scoped>
.my-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  color: white;
  max-width: 328px;
  width: 100%;
  height: 38px;
  background: #0f75bd;
  border: 2px solid #b0ceec;
  box-sizing: border-box;
  border-radius: 35px;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-size: 16px;
  text-align: center;
  padding: 0;
  cursor: pointer;
  transition-property: border-color, box-shadow, color;
  transition-duration: 0.4s, 0.4s, 0.4s;
  transition-timing-function: ease, ease, ease;
  margin: 0 10px;
}

.my-btn:hover:not(:disabled), .my-btn:focus:not(:disabled) {
  background: #188add;
  border-color: #188add;
  box-shadow: 0 0 4px 0 #188add;
}

.my-btn:active:not(:disabled) {
  background: #03558a;
  border: #03558a;
}

.my-btn:disabled {
  background-color: #b0ceec;
  border: 2px solid #b0ceec;
}

.my-btn--text {
  background-color: #fff;
  border: none;
  border-radius: 0;
  box-shadow: none;
  color: #0f75bd;
  width: auto;
  margin: 0;
  font-weight: 600;
}

.my-btn--text:hover {
  text-decoration: underline;
  background: none;
}

.my-btn--text:hover:not(:disabled), .my-btn--outline:focus:not(:disabled) {
  background-color: white !important;
  color: #0f75bd;
  border: none;
  box-shadow: none;
}

.my-btn--outline {
  background: #fff;
  color: #0f75bd
}

.my-btn--outline:hover {
  background: #fff;
}

.my-btn--outline:hover:not(:disabled), .my-btn--outline:focus:not(:disabled) {
  background-color: white;
  color: #0f75bd;
  border: 2px solid #0f75bd;
  box-shadow: 0 0 14px 0 #188add;
}
.my-btn--text:active:not(:disabled), .my-btn--text:focus:not(:disabled){
  background: #fff;
  box-shadow: none;
  text-decoration: underline;
}
.my-btn--active {
  border: 2px solid #0f75bd;
}

/*.my-btn-outline {*/
/*  background-color: white;*/
/*  color: #0f75bd;*/
/*  border: 2px solid #b0ceec;*/
/*}*/
</style>
