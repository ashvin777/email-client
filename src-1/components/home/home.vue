<script src="./home.js"></script>
<style src="./home.scss" scope="scss"></style>

<template>
<div class="page page-home">

  <div class="login" @click="login()">Login</div>
  <div class="body">
    <labels-component :selected-label="selectedLabel" @update="selectedLabel = $event"></labels-component>
    <messages-component :label="selectedLabel" :selected-message="selectedMessage" @update="selectedMessage = $event"></messages-component>
    <message-details-component :selected-message="selectedMessage"></message-details-component>
  </div>
</div>

</template>