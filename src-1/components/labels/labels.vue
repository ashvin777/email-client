<script src="./labels.js"></script>
<style src="./labels.scss" scoped lang="scss"></style>

<template>
  <div class="labels">
    <header>
      <button>Compose</button>
    </header>
    <ul>
      <li
        v-for="(label, index) in labels"
        :key="index"
        :class="{ active :  selectedLabel.label === label.label }"
        @click="select(label)">
        {{label.label}}
      </li>
    </ul>
  </div>
</template>
