<script setup lang="ts">
import MyCanvas from "@/components/MyCanvas.vue";
import Algorithm from "@/components/SortActions.vue";
import MyData from "@/components/SortConfig.vue";
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
</template>
