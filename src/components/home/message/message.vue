
<style src="./message.scss" scoped lang="scss"></style>
<script src="./message.js"></script>

<template>
  <div class="message-container">
    <!-- <header>
      {{threadDetails.messages[0].headers.Subject}}
    </header> -->

    <div class="body">

      <!-- <div ref="message" class="message"></div> -->

      <div class="message" v-for="(message, index) in threadDetails.messages" :key="index">
        <pre><code>{{message.payload}}</code></pre>
      </div>

    </div>
  </div>
</template>
