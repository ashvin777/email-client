
<style src="./message.scss" scoped lang="scss"></style>
<script src="./message.js"></script>

<template>
  <div class="message-container" v-if="threadDetails && threadDetails.id">
    <!-- <header v-if="threadDetails.messages">
      {{threadDetails.messages[0].headers.subject}}
    </header> -->

    <div class="body">

      <div class="message" v-for="(message, index) in threadDetails.messages" :key="index" v-if="isTextHTML(message)">
        <header>
          <div class="subject"><span class="icon-mail"></span> {{message.headers.subject}}</div>
        </header>

        <header>
          <div><b>From:</b> {{message.headers.from}}</div>
          <div><b>To:</b> {{message.headers.to}}</div>
          <div v-if="message.headers.cc"><b>Cc:</b> {{message.headers.cc}}</div>
          <div v-if="message.headers.bcc"><b>Bcc:</b> {{message.headers.bcc}}</div>
        </header>

        <div class="message-body" :ref="message.id"></div>
      </div>

      <div class="attachments" v-for="(message, index) in threadDetails.messages" :key="index" v-if="isAttachment(message)">
        <pre><code>{{message}}</code></pre>
      </div>

    </div>
  </div>
</template>
