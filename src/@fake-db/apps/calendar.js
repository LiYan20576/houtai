import mock from '@/@fake-db/mock'
import { genId } from '@/@fake-db/utils'

const date = new Date()
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
const nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)
const prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)


var day = ''
const calculateLastWeek = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayDate = new Date(currentYear, currentMonth, lastDayOfMonth);
  const lastDayOfWeek = lastDayDate.getDay();
  const lastWeekStart = new Date(lastDayDate);
  lastWeekStart.setDate(lastDayDate.getDate() - lastDayOfWeek);
  const lastWeekEnd = new Date(lastWeekStart);
  lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
  if(Number(formatDateday(lastWeekEnd))<10){
    day=Number(formatDateday(lastWeekStart))- 6
  }else{
    day=Number(formatDateday(lastWeekStart))
  }
  console.log(day, 'xxxxxxxx')
 
}
// const formatDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }
const formatDateday = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}`;
}
// const formatDates = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate() - 6).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }
calculateLastWeek()
const data = {
  events: [
    {
      id: '1',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day)),
      end: new Date(date.getFullYear(), date.getMonth(), (day)),
      allDay: true,
      extendedProps: {
        calendar: 'ETC',
      },
    },
    {
      id: '2',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day)),
      end: new Date(date.getFullYear(), date.getMonth(), (day)),
      allDay: true,
      extendedProps: {
        calendar: 'Family',
      },
    },
    {
      id: '3',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+1)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+1)),
      allDay: true,
      extendedProps: {
        calendar: 'ETC',
      },
    },
    {
      id: '4',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+1)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+1)),
      allDay: true,
      extendedProps: {
        calendar: 'Family',
      },
    },
    {
      id: '5',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+2)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+2)),
      allDay: true,
      extendedProps: {
        calendar: 'ETC',
      },
    },
    {
      id: '6',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+2)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+2)),
      allDay: true,
      extendedProps: {
        calendar: 'Family',
      },
    },
    {
      id: '7',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+3)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+3)),
      allDay: true,
      extendedProps: {
        calendar: 'ETC',
      },
    },
    {
      id: '8',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+3)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+3)),
      allDay: true,
      extendedProps: {
        calendar: 'Family',
      },
    },
    {
      id: '9',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+4)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+4)),
      allDay: true,
      extendedProps: {
        calendar: 'ETC',
      },
    },
    {
      id: '10',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+4)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+4)),
      allDay: true,
      extendedProps: {
        calendar: 'Family',
      },
    },
    {
      id: '11',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+5)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+5)),
      allDay: true,
      extendedProps: {
        calendar: 'ETC',
      },
    },
    {
      id: '12',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+5)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+5)),
      allDay: true,
      extendedProps: {
        calendar: 'Family',
      },
    },
    {
      id: '13',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+6)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+6)),
      allDay: true,
      extendedProps: {
        calendar: 'ETC',
      },
    },
    {
      id: '14',
      url: '',
      title: '预约',
      start: new Date(date.getFullYear(), date.getMonth(), (day+6)),
      end: new Date(date.getFullYear(), date.getMonth(), (day+6)),
      allDay: true,
      extendedProps: {
        calendar: 'Family',
      },
    },
    // {
    //   id: '3',
    //   url: '',
    //   title: 'Family Trip',
    //   allDay: true,
    //   start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
    //   end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
    //   extendedProps: {
    //     calendar: 'Holiday',
    //   },
    // },
    // {
    //   id: '4',
    //   url: '',
    //   title: 'Doctor\'s Appointment',
    //   start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
    //   end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
    //   allDay: true,
    //   extendedProps: {
    //     calendar: 'Personal',
    //   },
    // },
    // {
    //   id: '5',
    //   url: '',
    //   title: 'Dart Game?',
    //   start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    //   end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    //   allDay: true,
    //   extendedProps: {
    //     calendar: 'ETC',
    //   },
    // },
    // {
    //   id: '6',
    //   url: '',
    //   title: 'Meditation',
    //   start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    //   end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    //   allDay: true,
    //   extendedProps: {
    //     calendar: 'Personal',
    //   },
    // },
    // {
    //   id: '7',
    //   url: '',
    //   title: 'Dinner',
    //   start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    //   end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    //   allDay: true,
    //   extendedProps: {
    //     calendar: 'Family',
    //   },
    // },
    // {
    //   id: '8',
    //   url: '',
    //   title: 'Product Review',
    //   start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    //   end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    //   allDay: true,
    //   extendedProps: {
    //     calendar: 'Business',
    //   },
    // },
    // {
    //   id: '9',
    //   url: '',
    //   title: 'Monthly Meeting',
    //   start: nextMonth,
    //   end: nextMonth,
    //   allDay: true,
    //   extendedProps: {
    //     calendar: 'Business',
    //   },
    // },
    // {
    //   id: '10',
    //   url: '',
    //   title: 'Monthly Checkup',
    //   start: prevMonth,
    //   end: prevMonth,
    //   allDay: true,
    //   extendedProps: {
    //     calendar: 'Personal',
    //   },
    // },
  ],
}


// ------------------------------------------------
// GET: Return calendar events
// ------------------------------------------------
mock.onGet('/apps/calendar/events').reply(config => {
  // Get requested calendars as Array
  const calendars = config.params.calendars.split(',')

  return [200, data.events.filter(event => calendars.includes(event.extendedProps.calendar))]
})

// ------------------------------------------------
// POST: Add new event
// ------------------------------------------------
mock.onPost('/apps/calendar/events').reply(config => {
  // Get event from post data
  const { event } = JSON.parse(config.data)

  event.id = String(genId(data.events))
  data.events.push(event)

  return [201, { event }]
})

// ------------------------------------------------
// POST: Update Event
// ------------------------------------------------
mock.onPost(/\/apps\/calendar\/events\/\d+/).reply(config => {
  const { event: eventData } = JSON.parse(config.data)
  const event = data.events.find(e => e.id === eventData.id)
  if (event) {
    Object.assign(event, eventData)

    return [200, { event }]
  }

  return [400, { message: 'Something went wrong' }]
})

// ------------------------------------------------
// DELETE: Remove Event
// ------------------------------------------------
mock.onDelete(/\/apps\/calendar\/events\/\d+/).reply(config => {
  // Get event id from URL
  const eventId = config.url?.substring(config.url.lastIndexOf('/') + 1)
  const eventIndex = data.events.findIndex(e => e.id === eventId)

  data.events.splice(eventIndex, 1)

  return [200]
})
