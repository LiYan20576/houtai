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
  .layout-wrapper {
    background: rgb(var(--v-theme-surface)) !important;
  }
  /* .layout-page-content{
    max-inline-size:1600px !important;
  }
  .navbar-content-container,.horizontal-nav-content-container {
    max-inline-size:1600px !important;
  } */

  .layout-content-width-boxed .layout-page-content,.layout-content-width-boxed.layout-wrapper.layout-nav-type-horizontal .navbar-content-container, .layout-content-width-boxed.layout-wrapper.layout-nav-type-horizontal .layout-footer .footer-content-container, .layout-content-width-boxed .layout-horizontal-nav .horizontal-nav-content-container {
    inline-size: 100%;
    margin-inline: auto;
    max-inline-size: 1200px !important;
  }
</style>