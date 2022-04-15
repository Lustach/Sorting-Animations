<template>
  <div id="algo-panel__container">
    <div class="algo-actions__wrapper">
      <div class="algo-actions_behaviour">
        <MyButton @click.native="initShuffle" text>
          <template #title> Shuffle </template>
        </MyButton>
        <MyButton @click.native="initSort" text style="margin: 0 10px">
          <template #title> Sort </template>
        </MyButton>
      </div>
      <div class="algo-sorting__container">
        <MyButton
          v-for="(item, index) in sortingAlgoList"
          :algname="item.algorithm"
          :key="index"
          outline
          :active="item.active"
          :class="[
            { selected: selected === item.algorithm },
            { disabled: item.disabled },
          ]"
          @mousemove.native="showDetail"
          @mouseout.native="hideDetail"
          @click.native="changeAlgorithm(item)"
        >
            <template #title>{{ item.name }}
            <div class="algo-sorting-execution-time" v-if="item.averageTime !== ''">
              {{ item.averageTime }}<span style="margin-left: 1px">ms</span>
            </div>
            </template>
        </MyButton>
        <AlgoTooltip :info="info"></AlgoTooltip>
      </div>
    </div>
  </div>
</template>

<script>
import algorithms from "@/sorting_algos/AlgorithmWrapper";
import algorithmInfo from "@/sorting_algos/AlgorithmInfo";

import AlgoTooltip from "@/components/ui/AlgoTooltip.vue";
import MyButton from "@/components/ui/MyButton.vue";

export default {
  components: {
    AlgoTooltip,
    MyButton,
  },
  created() {
    this.emitter.on("sorted", (algoInfo) => {
      for (let algorithm in this.sortingAlgoList) {
        if (this.sortingAlgoList[algorithm].algorithm === algoInfo.name)
          this.sortingAlgoList[algorithm].averageTime = algoInfo.time;
      }
      this.sorting = false;
    });
  },
  data() {
    return {
      selected: "",
      info: {},
      sorting: false,
      sortingAlgoList: [
        {
          name: "InsertionSort",
          algorithm: "insertionSort",
          averageTime: "",
          disabled: false,
          active: false,
        },
        {
          name: "QuickSort",
          algorithm: "quickSort",
          averageTime: "",
          disabled: false,
          active: false,
        },
        {
          name: "MergeSort(IP)",
          algorithm: "mergeSortIP",
          averageTime: "",
          disabled: false,
          active: false,
        },
        {
          name: "ShellSort",
          algorithm: "shellSort",
          averageTime: "",
          disabled: false,
          active: false,
        },
      ],
    };
  },
  methods: {
    getAlgorithm() {
      return algorithms[this.selected];
    },
    changeAlgorithm(algorithm) {
      if (!algorithm.disabled) this.selected = algorithm.algorithm;
      this.sortingAlgoList.forEach((e) => (e.active = false));
      algorithm.active = true;
    },
    initSort() {
      if (this.sorting) {
        alert("Already sorting");
        return;
      }
      if (this.selected !== "") {
        this.sorting = true;
        this.emitter.emit("sort", 0);
      } else alert("Please select an algorithm before sorting");
    },
    initShuffle() {
      this.emitter.emit("shuffle", 0);
    },
    showDetail(event) {
      let element = event.currentTarget;
      let algorithm = event.currentTarget.getAttribute("algname");
      let algorithmInfoPanel = document.querySelector(".algo-info");
      algorithmInfoPanel.style.display = "block";
      this.info = algorithmInfo[algorithm];
      algorithmInfoPanel.style.top =
        element.offsetTop - algorithmInfoPanel.clientHeight - 20 + "px";
      algorithmInfoPanel.style.left = element.offsetLeft + "px";
    },
    hideDetail() {
      let algorithmInfoPanel = document.querySelector(".algo-info");
      algorithmInfoPanel.style.display = "none";
      this.info = {};
    },
  },
};
</script>

<style scoped>
#algo-panel__container {
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 12px 8px;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  user-select: none;
  overflow: visible;
  border-radius: inherit;
}

.algo-actions_behaviour {
  display: flex;
  justify-content: flex-end;
}

.algo-sorting__container {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  box-sizing: border-box;
  display: flex;
}
.algo-sorting__container_btn div {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.algo-sorting-execution-time {
  margin-left: 10px;
  color: #00ff00;
  font-size: 14px;
}
</style>
