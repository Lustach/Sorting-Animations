<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import MyCanvas from "@/components/MyCanvas.vue";
import Algorithm from "@/components/SortActions.vue";
import MyData from "@/components/SortConfig.vue";
// import MyAlert from "./components/ui/MyAlert";
export default {
  name: "App",
  components: {
    MyCanvas,
    Algorithm,
    MyData,
    // MyAlert,
  },
  created() {
    this.emitter.on("sort", (id) => {
      this.sort();
    });
    this.emitter.on("shuffle", (id) => {
      this.shuffle();
    });
  },
  mounted() {
    this.shuffle();
  },
  methods: {
    async sort() {
      let selected = this.$refs.Algorithm.getAlgorithm();
      let myCanvas = this.$refs.MyCanvas;
      let beginTime = new Date().getTime();
      if (
        await selected(myCanvas.data, myCanvas.swap, myCanvas.peekAt, myCanvas.assignAt)
      ) {
        let endTime = new Date().getTime();
        let diffTime = endTime - beginTime;
        console.log(diffTime);
        this.emitter.emit("sorted", { name: selected.name, time: diffTime });
        alert("done");
      }
    },
    async shuffle() {
      await this.$refs.MyCanvas.shuffleInst();
    },
  },
};
</script>

<template>
  <div id="canvasPanel" class="panel">
    <my-canvas ref="MyCanvas" />
  </div>
  <div id="algorithmPanel" class="panel">
    <div class="container" style="overflow: visible">
      <algorithm ref="Algorithm" />
    </div>
  </div>
  <div id="dataPanel" class="panel">
    <div class="container">
      <my-data ref="MyData" />
    </div>
  </div>
  <!-- <RouterView /> -->
</template>

<style lang="scss">
@import "@/assets/base.css";
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 5px;
  box-sizing: border-box;
}

* {
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: normal;
  color: #333333;
}

#canvasPanel {
  height: calc(100% - 200px);
  width: 100%;
}

#dataPanel {
  height: 200px;
  width: 30%;
}

#algorithmPanel {
  height: 200px;
  width: 70%;
}

.panel {
  float: left;
  box-sizing: border-box;
  padding: 5px;
}

.container {
  position: initial !important;
  border: 2px solid var(--clr-primary--800);
  width: 100%;
  height: 100%;
  -webkit-box-shadow: 1px 1px 3px 0 rgb(200 200 200);
  box-shadow: 1px 1px 3px 0 rgb(200 200 200);
  border-radius: 5px;
  overflow: hidden;
}

:root {
  --clr-primary--900: #0d549b;
  --clr-primary--800: #0f75bd;
  --clr-primary--50: #e1f5fe;
}
</style>
