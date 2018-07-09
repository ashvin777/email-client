
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
      <div class="bottom">

        <ul class="tabs">
          <li class="tab"
            v-for="(category, index) in categories"
            :class="{ active: selectedCategory.id === category.id }"
            @click="selectCategory(category)"
            :key="index">
            {{category.name}}
          </li>
        </ul>
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
          @click="select(thread)">

          <div class="icons">
            <i class="icon-paperclip" v-if="isMimeMixedType(thread)"></i>
            <i class="icon-read" v-if="!isUnread(thread)"></i>
            <i class="icon-unread" v-if="isUnread(thread)"></i>
          </div>

          <div class="from">
            <span v-for="(message, index) in thread.messages" :key="index">{{message.headers.From | from}}</span>
          </div>

          <div class="subject">
            <span class="category" :class="getCategory(thread)" v-if="getCategory(thread)">{{getCategory(thread)}}</span>
            {{thread.id}}
            <span>{{thread.messages[0].headers.Subject}}</span>
            <span class="snippet" v-html="thread.messages[0].snippet"></span>
          </div>

          <div class="timestamp">
            {{thread.messages[0].headers.Date | moment('Do MMMM (h:mm a)')}}
          </div>

        </li>
        <infinite-loading @infinite="loadMore"></infinite-loading>
      </ul>
    </div>
  </div>
</template>
