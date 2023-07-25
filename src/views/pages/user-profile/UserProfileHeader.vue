<script setup>
import axios from '@axios'
import { useRouter } from "vue-router";

const router = useRouter();

const profileHeaderData = ref()

const fetchHeaderData = () => {
  axios.get('/pages/profile-header').then(response => {
    profileHeaderData.value = response.data
  })
}

const logout = () => {
  router.push("/loginv1")
}

fetchHeaderData()
</script>

<template>
  <VCard v-if="profileHeaderData">
    <VImg
      :src="profileHeaderData.coverImg"
      min-height="125"
      max-height="250"
      cover
    />

    <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
      <div class="d-flex h-0">
        <VAvatar
          rounded
          size="120"
          :image="profileHeaderData.profileImg"
          class="user-profile-avatar mx-auto"
        />
      </div>

      <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
        <h6 class="text-h6 text-center text-sm-start font-weight-medium mb-3" style="color: #000000FF;font-weight: 500;font-size: 17px;line-height: 24px;">
          {{ profileHeaderData?.fullName }}
        </h6>

        <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
          <div class="d-flex flex-wrap justify-center justify-sm-start flex-grow-1 gap-2">
            <span class="d-flex">
              <!-- <VIcon
                size="20"
                icon="tabler-color-swatch"
                class="me-1"
              /> -->
              <img src="https://www.uesg.org.cn/icon/2_画板 1.svg" style="width: 20px;height: 20px;" alt="">
              <span class="text-body-1" style="color: #000000FF;font-weight: 500;font-size: 17px;line-height: 24px;">
                {{ profileHeaderData?.designation }}
              </span>
            </span>

            <!-- <span class="d-flex align-center">
              <VIcon
                size="20"
                icon="tabler-map-pin"
                class="me-2"
              />
              <span class="text-body-1">
                {{ profileHeaderData?.location }}
              </span>
            </span>

            <span class="d-flex align-center">
              <VIcon
                size="20"
                icon="tabler-calendar"
                class="me-2"
              />
              <span class="text-body-1">
                {{ profileHeaderData?.joiningDate }}
              </span>
            </span> -->
          </div>

          <VBtn prepend-icon="tabler-check" @click="logout">
            退出登录
          </VBtn>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.user-profile-avatar {
  border: 5px solid rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-surface)) !important;
  inset-block-start: -3rem;

  .v-img__img {
    border-radius: 0.125rem;
  }
}
</style>
