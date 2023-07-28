<script setup>
import FullCalendar from '@fullcalendar/vue3'
import {
  blankEvent,
  useCalendar,
} from '@/views/apps/calendar/useCalendar'
import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore'
import { useResponsiveLeftSidebar } from '@core/composable/useResponsiveSidebar'

// Components
import CalendarEventHandler from '@/views/apps/calendar/CalendarEventHandler.vue'

const store = useCalendarStore()

// 👉 Event
const event = ref(structuredClone(blankEvent))
const isEventHandlerSidebarActive = ref(false)

watch(isEventHandlerSidebarActive, val => {
  console.log(event.value.id,'xxx')
  // if(event.value.id){
  //   isEventHandlerSidebarActive.value=true
  // }else{
  //   isEventHandlerSidebarActive.value=true
  // }
  if (!val)
 { 
    event.value = structuredClone(blankEvent)}
})

const { isLeftSidebarOpen } = useResponsiveLeftSidebar()
const { refCalendar, calendarOptions, addEvent, updateEvent, removeEvent, jumpToDate } = useCalendar(event, isEventHandlerSidebarActive, isLeftSidebarOpen)

// 👉 Check all
const checkAll = computed({
  get: () => store.selectedCalendars.length === store.availableCalendars.length,
  set: val => {
    if (val)
      store.selectedCalendars = store.availableCalendars.map(i => i.label)
    else if (store.selectedCalendars.length === store.availableCalendars.length)
      store.selectedCalendars = []
  },
})

// const refCalendar = ref(null);

onMounted(() => {
  // 滚动到底部
  console.log(refCalendar.value.scrollTop);
  refCalendar.value.scrollTop = refCalendar.value.scrollHeight;
});
</script>

<template>
  <div class="rili">
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
            关注“UESG优世界”官方公众号了解更多最新资讯。
            <span
              @click="gotoLogin"
              style="
                font-family: DINMedium;
                color: #0066cc;
                line-height: 18px;
                font-size: 13px;
                cursor: pointer;
              "
              >立刻关注 ></span
            >
          </div>
        </div>
      </div>
    </div>

    <div style="background-color: #fff;border-radius: 12px;">
      <!-- `z-index: 0` Allows overlapping vertical nav on calendar -->
      <VLayout style="z-index: 0;">
        <!-- 👉 Navigation drawer -->
        <!-- <VNavigationDrawer
          v-model="isLeftSidebarOpen"
          width="292"
          absolute
          touchless
          location="start"
          class="calendar-add-event-drawer"
          :temporary="$vuetify.display.mdAndDown"
        >
          <div style="margin: 1.4rem;">
            <VBtn
              block
              prepend-icon="tabler-plus"
              @click="isEventHandlerSidebarActive = true"
            >
              Add event
            </VBtn>
          </div>

          <VDivider />

          <div class="d-flex align-center justify-center pa-2 mb-3">
            <AppDateTimePicker
              :model-value="new Date().toJSON().slice(0, 10)"
              :config="{ inline: true }"
              class="calendar-date-picker"
              @input="jumpToDate($event.target.value)"
            />
          </div>

          <VDivider />
          <div class="pa-7">
            <p class="text-sm text-uppercase text-disabled mb-3">
              FILTER
            </p>

            <div class="d-flex flex-column calendars-checkbox">
              <VCheckbox
                v-model="checkAll"
                label="View all"
              />
              <VCheckbox
                v-for="calendar in store.availableCalendars"
                :key="calendar.label"
                v-model="store.selectedCalendars"
                :value="calendar.label"
                :color="calendar.color"
                :label="calendar.label"
              />
            </div>
          </div>
        </VNavigationDrawer> -->

        <VMain>
          <div flat>
            <FullCalendar
              ref="refCalendar"
              :options="calendarOptions"
            />
          </div>
        </VMain>
      </VLayout>
    </div>

    <VDialog
      :model-value="isEventHandlerSidebarActive"
      max-width="500"
    >
      <!-- 👉 Dialog close btn -->
      <DialogCloseBtn @click="isEventHandlerSidebarActive = false" />

      <VCard class="share-project-dialog pa-5 pa-sm-8">
        <h4 style="margin: 0 auto;">确认预约</h4>

      </VCard>
    </VDialog>

    <!-- <CalendarEventHandler
      v-model:isDrawerOpen="isEventHandlerSidebarActive"
      :event="event"
      @add-event="addEvent"
      @update-event="updateEvent"
      @remove-event="removeEvent"
    /> -->
  </div>
</template>

<style>
  .v-application .fc .fc-view-harness {
    min-block-size: 0 !important;
  }
  button[title="month view"] {
    display: none !important;
  }
  button[title="week view"] {
    display: none !important;
  }
  button[title="day view"] {
    display: none !important;
  }
  button[title="list view"] {
    display: none !important;
  }

  .v-application .fc .fc-view-harness{
    height: 60vh !important;
    min-block-size: 0;
  }

  /* .v-layout .v-card {
    width: 70vw !important;
  } */
</style>

<style lang="scss">
@use "@core/scss/template/libs/full-calendar";

.calendars-checkbox {
  .v-label {
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    opacity: var(--v-high-emphasis-opacity);
  }
}

.calendar-add-event-drawer {
  &.v-navigation-drawer:not(.v-navigation-drawer--temporary) {
    border-end-start-radius: 0.375rem;
    border-start-start-radius: 0.375rem;
  }
}

.calendar-date-picker {
  display: none;

  +.flatpickr-input {
    +.flatpickr-calendar.inline {
      border: none;
      box-shadow: none;

      .flatpickr-months {
        border-block-end: none;
      }
    }
  }

  & ~ .flatpickr-calendar .flatpickr-weekdays {
    margin-block: 0 4px;
  }
}
</style>

<style lang="scss" scoped>
.v-layout {
  overflow: visible !important;

  .v-card {
    overflow: visible;
  }
}
</style>
