<template>
  <div id="dataPanel">
    <div style="display: flex">
      <MyInput
        label="Data Size"
        id="data-size"
        type="number"
        v-model:dataLength="dataLength"
        :modelValue="dataLength"
        @update:modelValue="dataLength = $event"
        placeholder="bar count"
      ></MyInput>
      <MyInput
        label="Speed"
        id="speed"
        type="number"
        @update:modelValue="setSpeed"
        :modelValue="speed"
        v-model:speed="speed"
        placeholder="speed delay"
      ></MyInput>
    </div>
    <div class="dataPanel_row">Repeatition?</div>
    <div class="radio__container">
      <input
        type="radio"
        name="Repeatition_0"
        checked
        value="0"
        v-model="repeatition"
      />No <input type="radio" name="Repeatition_1" value="1" v-model="repeatition" />Some
      <input type="radio" name="Repeatition_2" value="2" v-model="repeatition" />A Lot
    </div>
    <MyButton class="dataPanel_row" @click.native="generateData" text>
      <template #title>Generate Data</template>
    </MyButton>
  </div>
</template>

<script>
import MyButton from "@/components/ui/MyButton.vue";
import MyInput from "@/components/ui/MyInput.vue";
export default {
  components: {
    MyButton,
    MyInput,
  },
  data() {
    return {
      dataLength: "100",
      speed: "0",
      repeatition: "0",
    };
  },
  methods: {
    setSpeed(value) {
      this.speed = value;
      this.emitter.emit("setSpeed", this.speed);
    },
    generateData() {
      if (this.dataLength > 1000) {
        if (
          confirm(
            "Too much data can cause massive lag\nare you sure you want to continue?"
          )
        ) {
        } else {
          return;
        }
      }
      let data = [];
      switch (this.repeatition) {
        case "0":
          for (let i = 1; i <= this.dataLength; i++) {
            data.push(i);
          }
          break;
        case "1":
          for (let i = 1; i <= this.dataLength; i++) {
            data.push((Math.random() * this.dataLength + 1) | 0);
          }
          break;
        case "2":
          for (let i = 1; i <= this.dataLength; i++) {
            data.push(((Math.random() * this.dataLength) / 10 + 1) | 0);
          }
          break;
      }
      this.emitter.emit("generateData", data);
    },
  },
};
</script>

<style scoped>
.radio__container {
  display: flex;
  align-items: center;
  gap: 4px;
}

#dataPanel {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 6px 40px 36px 40px;
  user-select: none;
  text-align: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}

.dataPanel_row {
  line-height: 30px;
}
</style>
