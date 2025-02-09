<script setup lang="ts">
import {ref} from 'vue'
import Count from "../components/Count.vue"
const count = ref("初期値")

const emitTest = (message: string): void => {
  console.log(message)
  count.value = message
}

</script>
<template>
 
   <Count @send="emitTest" />
    <p>{{ count }}</p>

</template>