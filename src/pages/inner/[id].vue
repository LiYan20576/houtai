<script setup>
import { useRoute } from 'vue-router'
import { getDetail,getIndexData } from '@/api/index'

const route = useRoute()
const activeTab = ref(route.params.id)
const content = ref([])

const getInfo = async () => {
    const { data:res } = await getDetail(activeTab.value);
    content.value = res;
}

const length = ref("");
const avatars = ref("");

const getData = async () => {
  const { data:res } = await getIndexData();
  avatars.value = res;
  avatars.value.reverse();
  length.value = avatars.value.length;
};

onMounted(() => {
  // 在页面加载时执行的方法
  getInfo();
  getData();
});

</script>

<template>
  <div v-if="content.length > 0" style="display: flex;justify-content: space-between;">

    <div class="left">
      <h1>{{ content[0].title }}</h1>
      <h4 style="padding-bottom: 15px;">{{ content[1].time }}</h4>
      <div class="content-index" v-html="content[2].content"></div>
    </div>

    <div class="right">
      <VCol v-for="(item,index) in avatars.slice(0, 3)" :key="index">
        <VCard @click="info(length-index)">
          <VImg :src="item.cover" />

          <VCardItem>
            <VCardTitle>{{ item.title }}</VCardTitle>
          </VCardItem>

          <VCardActions>
            <VBtn @click="info(length-index)">
              详情
            </VBtn>
          </VCardActions>

        </VCard>
      </VCol>
    </div>
  </div>
</template>

<style>
  .left {
    width: 60%;
    margin-right: 10%;
  }
  .right {
    width: 30%;
  }
  .content-index img{
    width: 100%;
    margin: 30px auto;
  }
  .content-index p{
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
  # layout: blank
  navActiveLink: home 
</route>
