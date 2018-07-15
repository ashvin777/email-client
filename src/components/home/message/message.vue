
<style src="./message.scss" scoped lang="scss"></style>
<script src="./message.js"></script>

<template>
  <div class="message-container" v-if="threadDetails">
    <header v-if="threadDetails.messages">
      {{threadDetails.messages[0].headers.subject}}
    </header>

    <div class="body">

      <div class="message" v-for="(message, index) in threadDetails.messages" :key="index" v-if="isTextHTML(message)">
        {{message.id}} <div :ref="message.id"></div>
      </div>

      <div class="attachments" v-for="(message, index) in threadDetails.messages" :key="index" v-if="isAttachment(message)">
        <pre><code>{{message}}</code></pre>
      </div>

    </div>
  </div>
</template>
