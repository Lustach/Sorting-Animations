<template>
  <div id="dataPanel">
    <div>
      <div class="dataPanel_row">
        Data Size <input type="number" v-model="dataLength" />
      </div>
      <div class="dataPanel_row">
        Speed <input type="number" v-model="speed" @change="setSpeed" />
      </div>
    </div>
    <div class="dataPanel_row">Repeatition?</div>
    <div class="radio__container">
      <div>
        <input
          type="radio"
          name="Repeatition_0"
          checked
          value="0"
          v-model="repeatition"
        />No
      </div>
      <div>
        <input type="radio" name="Repeatition_1" value="1" v-model="repeatition" />Some
      </div>
      <div>
        <input type="radio" name="Repeatition_2" value="2" v-model="repeatition" />A Lot
      </div>
    </div>
    <MyButton class="dataPanel_row" @click.native="generateData" text>
      <template #title>Generate Data</template>
    </MyButton>
  </div>
</template>

<script>
import MyButton from "@/components/ui/MyButton.vue";

export default {
  components: {
    MyButton,
  },
  data() {
    return {
      dataLength: 100,
      speed: 0,
      repeatition: "0",
    };
  },
  methods: {
    setSpeed() {
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
