<template>
  <div class="algo-info">
    <p id="algo-header">{{ info.name }}</p>
    <div>
      <p style="margin: 0;">Worst Case Performance: O({{ info.worstCase }})</p>
      <p style="margin: 0;">Best Case Performance: O({{ info.bestCase }})</p>
      <p style="margin: 0;">Average Performance: O({{ info.average }})</p>
      <p style="margin: 0;">Stable: <span :style="{'color': info.stable==='Yes' ? 'green' : 'red'}">{{ info.stable }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlgoTooltip",
  props: {
    info: {
      required: true
    }
  }
}
</script>

<style scoped>
.algo-info {
  position: absolute;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 1000;
  white-space: nowrap;
  padding:  8px 12px;
  border-radius: 8px;
  display: none;
  border: 2px solid var(--clr-primary--800);
  background-color: white;
  box-shadow: 1px 1px 10px -4px var(--clr-primary--900);
  color: var(--clr-primary--900);
  font-weight: 500;
}
#algo-header{
  margin-top: 0;
  text-align: center;
  font-weight: 600;

}
</style>
