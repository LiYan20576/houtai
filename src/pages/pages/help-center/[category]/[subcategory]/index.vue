<script setup>
import { useRoute } from 'vue-router'
import axios from '@axios'

const route = useRoute()
const apiData = ref()
const activeTab = ref('')

const fetchHelpCenterCategoriesData = () => {
  return axios.get('/pages/help-center/subcategory', {
    params: {
      category: route.params.category,
      subcategory: route.params.subcategory,
    },
  }).then(res => {
    apiData.value = res.data.data
    activeTab.value = res.data.activeTab
  })
}

watch(activeTab, fetchHelpCenterCategoriesData, { immediate: true })
</script>

<template>
  <div>
    <div>
      <div style="width: 100%;">
        <div
          style="
            background-color: #FFFFFFFF;
            border-radius: 12px;
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px 64px;
            margin-bottom: 32px;
            margin-top: 32px;
          "
        >
          <div style="font-size: 13px; color: #1D1D1FFF; line-height: 18px">
            若“常见问题”处理指南未能帮您解决问题，请联系微信公众号在线客服处理。
          </div>
        </div>
      </div>
    </div>

    <!-- 👉 Search -->
    <AppSearchHeader
      v-model="faqSearchQuery"
      title="你好，请输入关键字检索帮助。"
      subtitle="或者选择一个类别以快速找到您需要的帮助"
      custom-class="mb-7"
    />

    <VRow v-if="apiData">
      <VCol
        cols="12"
        md="4"
      >
        <h6 class="text-base mb-3">
          {{ apiData.title }}
        </h6>

        <VTabs
          v-model="activeTab"
          direction="vertical"
          class="v-tabs-pill"
        >
          <VTab
            v-for="item in apiData.subCategories"
            :key="item.slug"
            :value="item.slug"
            :to="{
              name: 'pages-help-center-category-subcategory',
              params: { category: apiData.slug, subcategory: item.slug },
            }"
          >
            {{ item.title }}
          </VTab>
        </VTabs>
      </VCol>

      <VCol
        cols="12"
        md="8"
      >
        <VWindow
          v-model="activeTab"
          class="disable-tab-transition"
        >
          <VWindowItem
            v-for="subCategory in apiData.subCategories"
            :key="subCategory.slug"
            :value="subCategory.slug"
          >
            <VCard :title="subCategory.title" style="box-shadow: none !important;">
              <!-- <template #prepend>
                <VAvatar
                  color="primary"
                  variant="tonal"
                  rounded
                  size="42"
                >
                  <VIcon
                    :icon="subCategory.icon"
                    size="26"
                  />
                </VAvatar>
              </template> -->

              <VCardText>
                <VList class="card-list mb-6">
                  <VListItem
                    v-for="item in subCategory.articles"
                    :key="item.slug"
                    :to="{
                      name: 'pages-help-center-category-subcategory-article',
                      params: {
                        category: apiData.slug,
                        subcategory: subCategory.slug,
                        article: item.slug,
                      },
                    }"
                  >
                    <template #prepend>
                      <VIcon
                        icon="tabler-chevron-right"
                        size="18"
                        class="me-2"
                      />
                    </template>
                    <VListItemTitle class="text-primary">
                      {{ item.title }}
                    </VListItemTitle>
                  </VListItem>
                </VList>

                <!-- <VBtn
                  variant="tonal"
                  :to="{ name: 'pages-help-center' }"
                >
                  <VIcon
                    icon="tabler-chevron-left"
                    class="flip-in-rtl"
                  />
                  <span>Back to help center</span>
                </VBtn> -->
              </VCardText>
            </VCard>
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
  </div>
  
</template>

<route lang="yaml">
meta:
  navActiveLink: pages-help-center
</route>
