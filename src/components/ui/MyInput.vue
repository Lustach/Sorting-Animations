<template>
  <div class="vblg-input__container">
    <label :for="id">{{ label }}</label>
    <input
      :type="type"
      v-model="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :id="id"
      :name="id"
      autocomplete="off"
      class="vblg-input"
      min="0"
    />
  </div>
</template>

<script>
export default {
  name: "MyInput",
  props: {
    label: {
      required: true,
    },
    modelValue: {
      required: true,
    },
    id: {
      required: true,
    },
    type: {
      required: false,
      default: "text",
    },
    placeholder: {
      required: true,
      default: "input number",
    },
  },
};
</script>

<style scoped lang="scss">
.text-field {
  max-width: 100px;
  width: 100%;
  height: 38px;
  background: #ffffff;
  border: 2px solid #b0ceec;
  box-sizing: border-box;
  border-radius: 35px;
  padding-left: 18px;
  font-size: 13.23px;
  color: #0d549b !important;
  font-weight: 600;
  &:focus:not(.is-error) {
    box-shadow: 1px 1px 10px -4px rgba(64, 158, 255, 0.5);
  }
  &:hover {
    border-color: #0f75bd;
  }
  &::placeholder {
    font-style: normal;
    font-weight: 600;
    font-size: 13.23px;
    width: 230px;
    height: 70px;
    color: #b0ceec;
    position: absolute;
    top: 10px;
    left: 18px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    max-width: 328px;
    width: 100%;
    margin: 0 auto 6px auto;
    label {
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      color: #0f75bd;
    }
    .error-message {
      line-height: 16px;
      color: #f56e6e;
    }
    .is-error {
      border-color: #f56c6c;
      &:focus {
        box-shadow: 1px 1px 10px -4px #f56c6c;
      }
    }
  }
}
.vblg-input {
  &__container {
    @extend .text-field__container;
  }
  @extend .text-field;
  -webkit-outer-spin-button,
  -webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0 !important;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
