<script setup>
import { useRoute } from 'vue-router'
import axios from '@axios'

const router = useRoute()
const teamData = ref([])

const avatarUrl = ref("")

const teams = ref([
    // {
    //   extraMembers: 25,
    //   title: 'UESG Fundamental Analyst',
    //   avatar: avatarUrl.value,
    //   // avatarGroup: [
    //   //   { avatar: 'https://weixin.uesg.cn/account/avator?unionID=oym-u6fj5Q2asA4RTIRlAmus1340', name: 'Vinnie Mostowy' },
    //   // ],
    //   description: '通用 ESG 标准｜基础分析师',
    //   // chips: [
    //   //   {
    //   //     title: 'React',
    //   //     color: 'primary',
    //   //   },
    //   //   {
    //   //     title: 'MUI',
    //   //     color: 'info',
    //   //   },
    //   // ],
    // },
])

const fetchTeamData = () => {
  if (router.params.tab === 'teams') {
    // axios.get('/pages/profile', { params: { tab: router.params.tab } }).then(response => {
    //   teamData.value = response.data
    // })
    // teamData.value = teams.value
  }
}

// watch(router, fetchTeamData, { immediate: true })

const moreList = [
  {
    title: 'Rename Project',
    value: 'Rename Project',
  },
  {
    title: 'View Details',
    value: 'View Details',
  },
  {
    title: 'Add to favorites',
    value: 'Add to favorites',
  },
  {
    type: 'divider',
    class: 'my-2',
  },
  {
    title: 'Leave Project',
    value: 'Leave Project',
    class: 'text-error',
  },
]

// onMounted(async () => {
//   const unionid = localStorage.getItem("oid");
//   avatarUrl.value = "https://weixin.uesg.cn/account/avator?unionID=" + unionid;

// });
</script>

<template>
  <VRow v-if="teams">
    <VCol
      v-for="team in teams"
      :key="team.title"
      cols="12"
      md="6"
      lg="4"
    >
      <VCard :title="team.title">
        <template #prepend>
          <VAvatar
            size="38"
            :image="team?.avatar"
          />
        </template>

        <template #append>
          <div class="me-n3">
            <IconBtn>
              <VIcon
                size="20"
                icon="tabler-star"
                class="text-disabled"
              />
            </IconBtn>

            <MoreBtn
              :menu-list="moreList"
              item-props
              density="comfortable"
            />
          </div>
        </template>

        <VCardText>
          <span class="text-base">{{ team.description }}</span>
        </VCardText>

        <VCardText class="d-flex align-center">
          <div class="v-avatar-group">
            <VAvatar
              v-for="data in team.avatarGroup"
              :key="data.name"
              size="32"
            >
              <VImg :src="data.avatar" />

              <VTooltip
                activator="parent"
                location="top"
              >
                {{ data.name }}
              </VTooltip>
            </VAvatar>
          </div>

          <VSpacer />

          <div class="d-flex align-center gap-2">
            <VChip
              v-for="data in team.chips"
              :key="data.title"
              label
              :color="data.color"
              size="small"
              class="font-weight-medium"
            >
              {{ data.title }}
            </VChip>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
