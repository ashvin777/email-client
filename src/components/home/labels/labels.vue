
<style src="./labels.scss" scoped lang="scss"></style>
<script src="./labels.js"></script>

<template>
  <div class="labels-container">

    <header>
      <button class="primary">Compose</button>
    </header>

    <div class="body">
      <ul>
        <li
          v-for="(label, index) in labels"
          :key="index"
          :class="{ active :  selectedLabel.name === label.name }"
          @click="select(label)">
          <i :class="'icon-' +label.icon"></i>
          <span class="text">{{label.name}}</span>
          <!-- <span class="count" v-if="label.unread">{{label.unread}}</span> -->
        </li>
      </ul>
    </div>

    <footer>
      <img :src="profile.photo"/>
      <div>{{profile.name}}</div>
    </footer>
  </div>
</template>
