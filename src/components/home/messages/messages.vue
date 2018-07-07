
<style src="./messages.scss" scoped lang="scss"></style>
<script src="./messages.js"></script>

<template>
  <div class="messages-container">
    <header>{{label.name}}</header>

    <div class="body">
      <ul>
        <li
          v-for="(thread, index) in threads"
          :key="index"
          :class="{
            active :  selected.id === thread.id,
            unread: isUnread(thread)
          }"
          @click="select(thread)">

          <div class="from">
            {{thread.messages[0].headers.From | from}}
          </div>
          <div class="subject">
            {{thread.messages[0].headers.Subject}}</div>
          <div class="timestamp">
            {{thread.messages[0].headers.Date | moment('from', 'now')}}
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>
