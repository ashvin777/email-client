<script src="./compose.js"></script>
<style lang="scss" scoped src="./compose.scss"></style>

<template>
  <div class="page page-compose">

    <header class="title">
      New message
    </header>

    <header>
      <div>
        <label>To</label>
        <input placeholder="Enter email address..." v-model="to"/>
        </div>
      <div>
        <label>Subject</label>
        <input placeholder="Enter subject..." v-model="subject"/>
      </div>
    </header>

    <div class="body">
      <vue-editor v-model="body"></vue-editor>
    </div>

    <div class="footer">
      <button class="primary" @click="send()">Send</button>
    </div>
  </div>
</template>
