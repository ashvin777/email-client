<script src="./message-details.js"></script>
<style src="./message-details.scss" scoped lang="scss"></style>

<template>
  <div class="message-details">
    <header v-if="messageDetails.details">
      {{messageDetails.details.subject}}
    </header>

    <div ref="message" class="message"></div>
  </div>
</template>
