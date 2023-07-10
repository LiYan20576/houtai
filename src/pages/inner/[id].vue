<script setup>
import { useRoute } from 'vue-router'
import { getDetail } from '@/api/index'

const route = useRoute()
const activeTab = ref(route.params.id)
const content = ref([])

const getInfo = async () => {
    const { data:res } = await getDetail(activeTab.value);
    content.value = res;
}

onMounted(() => {
  // 在页面加载时执行的方法
  getInfo()
});

</script>

<template>
  <div v-if="content.length > 0">
    <h1>{{ content[0].title }}</h1>
    <h4>{{ content[1].time }}</h4>
    <div v-html="content[2].content"></div>
  </div>
</template>

<style>
  img {
    width: 100%;
    margin: 30px auto;
  }
  p{
    padding: 0 20px;
  }
  @media screen and (max-width:1280px) {
    img{
      width: 96% !important;
    }
    p{
      padding: 0 20px !important;
    }
  }
</style>

<route lang="yaml">
meta:
  navActiveLink: home
</route>
