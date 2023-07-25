import { breakpointsVuetify } from '@vueuse/core'
import { AppContentLayoutNav, ContentWidth, FooterType, NavbarType } from '@layouts/enums'
import old from '@images/newLogo.svg?raw'

export const config = {
  app: {
    title: 'title',
    logo: h('img', { src: '/src/assets/logo.svg' }),
    slogo: h('div', { innerHTML: old, style: 'line-height:0; color: rgb(var(--v-global-theme-primary))' }),
    // logo: () => h('img', { src: 'assets/colored-logo.png' }, null),
    contentWidth: ref(ContentWidth.Boxed),
    contentLayoutNav: ref(AppContentLayoutNav.Vertical),
    overlayNavFromBreakpoint: breakpointsVuetify.md,
    enableI18n: true,
    isRtl: ref(false),
  },
  navbar: {
    type: ref(NavbarType.Sticky),
    navbarBlur: ref(true),
  },
  footer: { type: ref(FooterType.Static) },
  verticalNav: {
    isVerticalNavCollapsed: ref(false),
    defaultNavItemIconProps: { icon: 'tabler-circle' },
  },
  horizontalNav: {
    type: ref('sticky'),
  },
  icons: {
    chevronDown: { icon: 'tabler-chevron-down' },
    chevronRight: { icon: 'tabler-chevron-right' },
    close: { icon: 'tabler-x' },
    verticalNavPinned: { icon: 'tabler-circle-dot' },
    verticalNavUnPinned: { icon: 'tabler-circle' },
    sectionTitlePlaceholder: { icon: 'tabler-minus' },
  },
}
