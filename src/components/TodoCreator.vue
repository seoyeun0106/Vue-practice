<template>
   <form class="form" @submit.prevent="onSubmit">
    <input type="text" class="input" :value="text" @input="text= $event.target.value">
    <button class="btn">꾹</button>
  </form>
</template>
<script></script>
<style></style>