<script src="./home.js"></script>

<template>

  <div class="page">
    <div class="body">
      <labels :profile="profile" @select="onSelectLabel"></labels>
      <messages :label="label"></messages>
      <message></message>
    </div>
  </div>

</template>
