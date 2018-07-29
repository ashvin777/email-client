
<style src="./messages.scss" scoped lang="scss"></style>
<script src="./messages.js"></script>

<template>
  <div class="messages-container">
    <header>
      <div class="top">
        <div class="label">{{label.name}}</div>
        <div class="search">
          <i class="icon-search"></i>
          <input type="search" placeholder="Search messages..."/>
        </div>
      </div>
    </header>

    <div class="body">

      <ul>
        <li
          v-for="(thread, index) in threads"
          :key="index"
          :class="{
            active : selected.id === thread.id,
            unread: isUnread(thread)
          }"
          v-if="thread && thread.messages"
          @click="select(thread)">

          <div class="icons">
            <i class="icon-paperclip" v-if="isAttachment(thread)"></i>
            <i class="icon-read" v-if="!isUnread(thread)"></i>
            <i class="icon-unread" v-if="isUnread(thread)"></i>
          </div>

          <div class="from">
            <span>{{thread.messages[0].headers.from | from}} {{thread.messages.length > 1 ? `(${thread.messages.length})` : ''}}</span>
          </div>

          <div class="subject">
            <span class="category" :class="getCategory(thread)" v-if="getCategory(thread)">{{getCategory(thread)}}</span>
            <span>{{thread.messages[0].headers.subject}}</span>
            <span class="snippet" v-html="thread.messages[0].snippet"></span>
          </div>

          <div class="timestamp">
            {{thread.messages[thread.messages.length - 1].internalDate | moment('Do MMMM (h:mm a)')}}
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>
