<template>
  <div style="text-align: center;">
    <img :src="'https://www.uesg.cn/weixin/CreatePayCode?id='+course_id" style="width: 40%;">
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute();
  const course_id = ref("");

  onMounted(() => {
    console.log(route.query.id); // 输出：100
    course_id.value = route.query.id;
  });
</script>

<style>

</style>