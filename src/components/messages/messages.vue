<script src="./messages.js"></script>
<style src="./messages.scss" scoped lang="scss"></style>

<template>
  <div class="messages">
    <ul>
      <li
        v-for="(message, index) in messages"
        :key="index"
        :class="{active: selected.result.id === message.result.id }"
        @click="select(message)">

        <div class="left">
          <div class="avatar"></div>
        </div>

        <div class="right">
          <div class="title" >
            {{message.details.subject}}
          </div>

          <div class="sender">
            {{message.details.from}}
          </div>

          <!-- <div class="description">
            {{message.result.snippet}}
          </div> -->
        </div>
      </li>
    </ul>
  </div>
</template>
