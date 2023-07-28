<script setup>
import { useTheme } from 'vuetify'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'
import { useAppAbility } from "@/plugins/casl/useAppAbility";

const ability = useAppAbility();
const userAbilities = [
  {
    action: "manage",
    subject: "all",
  },
];
localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
ability.update(userAbilities);
// localStorage.setItem("userData", 200);

const {
  syncInitialLoaderTheme,
  syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme,
  isAppRtl,
  handleSkinChanges,
} = useThemeConfig()

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
handleSkinChanges()



</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
<style>
  .footer-link:hover {
    text-decoration: underline !important;
  }
</style>
<style>
  @font-face {
    font-family: 'DINSemiBold';
    src: url('https://www.uesg.org.cn/font/0727/PublicSans-Bold-600.otf') format('truetype');
  }
  @font-face {
    font-family: 'DINRegular';
    src: url('https://www.uesg.org.cn/font/0727/PublicSans-Regular-400.otf') format('truetype');
  }
  @font-face {
    font-family: 'DINMedium';
    src: url('https://www.uesg.org.cn/font/0727/PublicSans-Medium-500.otf') format('truetype');
  }
  *{
    font-family: 'DINRegular';
  }

  .layout-wrapper {
    background: rgb(var(--v-theme-surface)) !important;
  }
  /* .layout-page-content{
    max-inline-size:1600px !important;
  } */
  .navbar-content-container,.horizontal-nav-content-container {
    max-inline-size:1600px !important;
  }
  /* .layout-content-width-boxed.layout-wrapper.layout-nav-type-vertical .layout-navbar, .layout-content-width-boxed.layout-wrapper.layout-nav-type-vertical .layout-footer {
    inline-size: 100%;
    margin-inline: auto;
    max-inline-size:1600px !important;
} */
.layout-content-width-boxed.layout-wrapper.layout-nav-type-vertical .layout-footer {
  max-inline-size:100% !important;
  padding: 0 !important;
  background-color: #fff;
}
.layout-footer-sticky.layout-wrapper.layout-nav-type-vertical .layout-footer {
  background-color: #F3F3F3FF !important;
}
.layout-footer-sticky.layout-wrapper.layout-nav-type-vertical .layout-footer .footer-content-container {
  max-inline-size:980px !important;
  margin: 0 auto;
  box-shadow: unset !important;
  padding: 0 24px !important;
  background-color: #F3F3F3FF !important;
}
.layout-nav-type-vertical .layout-vertical-nav .nav-section-title {
  block-size: unset !important;
}
.layout-nav-type-vertical .layout-vertical-nav .nav-link > :first-child {
  margin-inline: unset !important;
  padding-inline: 24px !important;
}
.layout-nav-type-vertical .layout-vertical-nav .nav-link > a:hover::before {
  opacity: 0 !important;
}
.layout-page-content {
    padding-block: 0;
  }
  .layout-footer {
    position: static !important;
  }

  /* .layout-content-width-boxed .layout-page-content,.layout-content-width-boxed.layout-wrapper.layout-nav-type-horizontal .navbar-content-container, .layout-content-width-boxed.layout-wrapper.layout-nav-type-horizontal .layout-footer .footer-content-container, .layout-content-width-boxed .layout-horizontal-nav .horizontal-nav-content-container {
    inline-size: 100%;
    margin-inline: auto;
    max-inline-size: 1200px !important;
  } */
</style>