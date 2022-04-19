<template>
  <div class="container">
    <div id="tooltip" display="none" style="position: absolute; display: none"></div>
    <svg id="my-svg" :width="canvasWidth" :height="canvasHeight">
      <g
        v-for="(item, index) in dataList"
        class="bar"
        shape-rendering="crispEdges"
        :class="[
          { hidden: index === m || index === n },
          { peek: peeking === index },
          { assign: assigning === index },
        ]"
      >
        <rect
          v-bind="{ x: index * barWidth, y: canvasHeight - item * heightRatio }"
          :width="barWidth"
          :height="item * heightRatio"
          @mousemove="showTooltip($event, item)"
          @mouseout="hideTooltip()"
        />
      </g>
      <g v-if="m >= 0" class="bar selected" shape-rendering="crispEdges">
        <rect
          v-bind="{
            x: (m + diff) * barWidth,
            y: canvasHeight - dataList[m] * heightRatio,
          }"
          :width="barWidth"
          :height="dataList[m] * heightRatio"
        />
      </g>
      <g v-if="n >= 0" class="bar selected" shape-rendering="crispEdges">
        <rect
          v-bind="{
            x: (n - diff) * barWidth,
            y: canvasHeight - dataList[n] * heightRatio,
          }"
          :width="barWidth"
          :height="dataList[n] * heightRatio"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  created() {
    this.emitter.on("sort", (id) => {
      this.sorting = true;
    });
    this.emitter.on("sorted", (id) => {
      this.sorting = false;
      this.peeking = -1;
      this.assigning = -1;
    });
    this.emitter.on("generateData", (dataList) => {
      if (this.sorting) {
        alert("Can't change dataList while sorting");
        return;
      }
      this.dataList = dataList;
      this.onResize(); // call onResize to make the bars right size
    });
    this.emitter.on("setSpeed", (speed) => {
      this.speed = speed;
    });
  },
  mounted() {
    for (let i = 1; i <= 100; i++) {
      this.dataList.push(i);
    }
    window.addEventListener("resize", this.onResize);
    this.onResize(); // call onResize to make the bars right size
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  data: () => ({
    dataList: [],
    canvasWidth: 1,
    canvasHeight: 1,
    maxHeight: 1,
    m: -1,
    n: -1,
    peeking: -1,
    assigning: -1,
    diff: 0,
    step: 1,
    sorting: false,
    speed: 0,
  }),
  methods: {
    showTooltip(mouseEvent, text) {
      let tooltip = document.getElementById("tooltip");
      if (tooltip) {
        tooltip.innerHTML = text;
        tooltip.style.display = "block";
        tooltip.style.left = mouseEvent.pageX + -20 + "px";
        tooltip.style.top = mouseEvent.pageY + -53 + "px";
      }
    },

    hideTooltip() {
      let tooltip = document.getElementById("tooltip");
      if (tooltip) tooltip.style.display = "none";
    },
    onResize() {
      let mySvg = document.querySelector("#my-svg");
      this.canvasWidth = mySvg.parentNode.clientWidth;
      this.canvasHeight = mySvg.parentNode.clientHeight;
      this.maxHeight = Math.max(...this.dataList);
    },
    shuffleInst() {
      if (this.sorting) {
        alert("Can't shuffle while sorting");
        return;
      }
      let currentIndex = this.dataList.length - 1,
        randomIndex;
      let promise = new Promise((resolve) => {
        while (currentIndex > -1) {
          randomIndex = (Math.random() * this.dataList.length) | 0;
          [this.dataList[currentIndex], this.dataList[randomIndex]] = [
            this.dataList[randomIndex],
            this.dataList[currentIndex],
          ];
          currentIndex -= 1;
        }
        resolve(0);
      });
      promise.then(() => {
        return;
      });
    },
    swap(m, n) {
      this.m = Math.min(m, n);
      this.n = Math.max(m, n);
      let done = Math.abs(this.m - this.n);
      let step = done / this.step;
      return new Promise((resolve) => {
        if (this.diff + step >= done) {
          [this.dataList[this.m], this.dataList[this.n]] = [
            this.dataList[this.n],
            this.dataList[this.m],
          ];
          this.m = -1;
          this.n = -1;
          this.diff = 0;
          setTimeout(() => {
            resolve();
          }, this.speed);
        } else {
          let interval = setInterval(() => {
            if (this.diff < done) this.diff = Math.min(this.diff + step, done);
            else {
              [this.dataList[this.m], this.dataList[this.n]] = [
                this.dataList[this.n],
                this.dataList[this.m],
              ];
              this.m = -1;
              this.n = -1;
              this.diff = 0;
              clearInterval(interval);
              resolve();
            }
          }, this.speed);
        }
      });
    },
    peekAt(n) {
      this.peeking = n;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.dataList[this.peeking]);
        }, this.speed);
      });
    },
    assignAt(i, n) {
      this.dataList[i] = n;
      this.assigning = i;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, this.speed);
      });
    },
  },
  computed: {
    barWidth() {
      return this.canvasWidth / this.dataList.length;
    },
    heightRatio() {
      return this.canvasHeight / this.maxHeight;
    },
  },
};
</script>

<style scoped lang="scss">
.bar {
  fill: #25b5ff;
  stroke: #81d3fb;
}

.bar:hover {
  fill: #1198e5;
  cursor: pointer;
}

.selected {
  fill: lightskyblue;
}

.hidden {
  fill: transparent;
}

.peek {
  fill: tomato;
}

.assign {
  fill: #39ff00;
}

#my-svg {
  background-color: white;
}

#tooltip {
  background: cornsilk;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  z-index: 1;
}
</style>
