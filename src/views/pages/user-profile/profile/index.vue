<script setup>
import About from './About.vue'
import ActivityTimeline from './ActivityTimeline.vue'
import Connection from './Connection.vue'
import ProjectList from './ProjectList.vue'
import Teams from './Teams.vue'
import axios from '@axios'
import { getInfo } from '@/api/index'

const router = useRoute()
const profileTabData = ref()

const fetchAboutData = async() => {
  if (router.params.tab === 'profile') {
    // axios.get('/pages/profile', { params: { tab: router.params.tab } }).then(response => {
    //   profileTabData.value = response.data
    // })
    const unionid = localStorage.getItem("oid");

    const { data:res } = await getInfo(unionid);
    console.log(res);
    const nickname = res.nickname;

    const avatarUrl = "https://weixin.uesg.cn/account/avator?unionID=" + unionid;
    console.log(avatarUrl);

    const userData = {
      avatar: avatarUrl,
      nickname: nickname
    };

    const userDataJSON = JSON.stringify(userData);
    localStorage.setItem("userData", userDataJSON);

    profileTabData.value = userData

  }
}

watch(router, fetchAboutData, { immediate: true })
</script>

<template>
  <VRow v-if="profileTabData">
    <VCol
      md="4"
      cols="12"
    >
      <About :data="profileTabData" />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <VRow>
        <VCol cols="12">
          <ActivityTimeline :data="profileTabData" />
        </VCol>

        <!-- <VCol
          cols="12"
          md="6"
        >
          <Connection :connections-data="profileTabData.connections" />
        </VCol> -->

        <!-- <VCol
          cols="12"
          md="6"
        >
          <Teams :teams-data="profileTabData.teamsTech" />
        </VCol> -->

        <!-- <VCol cols="12">
          <ProjectList />
        </VCol> -->
      </VRow>
    </VCol>
  </VRow>
</template>
