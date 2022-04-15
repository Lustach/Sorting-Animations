<template>
  <div class="container">
    <div id="tooltip" display="none" style="position: absolute; display: none"></div>
    <svg id="my-svg" :width="panelWidth" :height="panelHeight">
      <g
        v-for="(item, index) in data"
        class="bar"
        shape-rendering="crispEdges"
        :class="[
          { hidden: index === m || index === n },
          { peek: peeking === index },
          { assign: assigning === index },
        ]"
      >
        <rect
          v-bind="{ x: index * barWidth, y: panelHeight - item * heightRatio }"
          :width="barWidth"
          :height="item * heightRatio"
          class="test"
          @mousemove="showTooltip($event, item)"
          @mouseout="hideTooltip()"
        />
        <text
          v-bind="{ x: index * barWidth, y: panelHeight - item * heightRatio }"
          font-family="Verdana"
          font-size="10"
          fill="blue"
        ></text>
      </g>
      <g v-if="m >= 0" class="bar selected" shape-rendering="crispEdges">
        <rect
          v-bind="{ x: (m + diff) * barWidth, y: panelHeight - data[m] * heightRatio }"
          :width="barWidth"
          :height="data[m] * heightRatio"
        />
        <text
          v-bind="{ x: index * barWidth, y: panelHeight - item * heightRatio }"
          font-family="Verdana"
          font-size="10"
          fill="blue"
        >
          1
        </text>
      </g>
      <g v-if="n >= 0" class="bar selected" shape-rendering="crispEdges">
        <rect
          v-bind="{ x: (n - diff) * barWidth, y: panelHeight - data[n] * heightRatio }"
          :width="barWidth"
          :height="data[n] * heightRatio"
        />
        <text
          v-bind="{ x: index * barWidth, y: panelHeight - item * heightRatio }"
          font-family="Verdana"
          font-size="10"
          fill="blue"
        >
          1
        </text>
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
    this.emitter.on("generateData", (data) => {
      if (this.sorting) {
        alert("Can't change data while sorting");
        return;
      }
      this.data = data;
      this.onResize(); // call onResize to make the bars right size
    });
    this.emitter.on("setSpeed", (speed) => {
      this.speed = speed;
    });
  },
  mounted() {
    for (let i = 1; i <= 100; i++) {
      this.data.push(i);
    }
    window.addEventListener("resize", this.onResize);
    this.onResize(); // call onResize to make the bars right size
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      data: [],
      panelWidth: 1,
      panelHeight: 1,
      maxHeight: 1,
      m: -1,
      n: -1,
      peeking: -1,
      assigning: -1,
      diff: 0,
      step: 1,
      sorting: false,
      speed: 100,
    };
  },
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
      this.panelWidth = mySvg.parentNode.clientWidth;
      this.panelHeight = mySvg.parentNode.clientHeight;
      this.maxHeight = Math.max(...this.data);
    },
    shuffleInst() {
      if (this.sorting) {
        alert("Can't shuffle while sorting");
        return;
      }
      let currentIndex = this.data.length - 1,
        randomIndex;
      let promise = new Promise((resolve) => {
        while (currentIndex > -1) {
          randomIndex = (Math.random() * this.data.length) | 0;
          [this.data[currentIndex], this.data[randomIndex]] = [
            this.data[randomIndex],
            this.data[currentIndex],
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
      console.log(m, n);
      this.m = Math.min(m, n);
      this.n = Math.max(m, n);
      let done = Math.abs(this.m - this.n);
      let step = done / this.step;
      console.log(done, step, this.m, this.n);
      return new Promise((resolve) => {
        if (this.diff + step >= done) {
          [this.data[this.m], this.data[this.n]] = [this.data[this.n], this.data[this.m]];
          this.m = -1;
          this.n = -1;
          this.diff = 0;
          setTimeout(() => {
            resolve(0);
          }, this.speed);
        } else {
          let interval = setInterval(() => {
            if (this.diff < done) this.diff = Math.min(this.diff + step, done);
            else {
              [this.data[this.m], this.data[this.n]] = [
                this.data[this.n],
                this.data[this.m],
              ];
              this.m = -1;
              this.n = -1;
              this.diff = 0;
              clearInterval(interval);
              resolve(0);
            }
          }, this.speed);
        }
      });
    },
    peekAt(n) {
      this.peeking = n;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.data[this.peeking]);
        }, this.speed);
      });
    },
    assignAt(i, n) {
      this.data[i] = n;
      this.assigning = i;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(0);
        }, this.speed);
      });
    },
  },
  computed: {
    barWidth() {
      return this.panelWidth / this.data.length;
    },
    heightRatio() {
      return this.panelHeight / this.maxHeight;
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
