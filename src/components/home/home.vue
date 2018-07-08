<script src="./home.js"></script>

<template>

  <div class="page">
    <div class="body">
      <labels :profile="profile" @select="onSelectLabel"></labels>
      <messages :label="label" @select="onSelectThread"></messages>
      <message :thread="thread"></message>
    </div>
  </div>

</template>
