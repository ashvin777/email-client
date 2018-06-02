<script src="./home.js"></script>
<style src="./home.scss" scope="scss"></style>

<template>
<div class="page page-home">

  <div class="login" @click="login()">Login</div>
  <div class="body">
    <labels-component :selected-label="selectedLabel"></labels-component>
    <messages-component></messages-component>
    <message-details-component></message-details-component>
  </div>
</div>

</template>