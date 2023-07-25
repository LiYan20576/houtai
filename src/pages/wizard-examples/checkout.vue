<script setup>
import AddressContent from '@/views/wizard-examples/checkout/Address.vue'
import CartContent from '@/views/wizard-examples/checkout/Cart.vue'
import ConfirmationContent from '@/views/wizard-examples/checkout/Confirmation.vue'
import PaymentContent from '@/views/wizard-examples/checkout/Payment.vue'
import googleHome from '@images/pages/google-home.png'
import iphone11 from '@images/pages/iphone-11.png'

// const checkoutSteps = [
//   {
//     title: 'Cart',
//     icon: 'custom-cart',
//   },
//   {
//     title: 'Address',
//     icon: 'custom-address',
//   },
//   {
//     title: 'Payment',
//     icon: 'custom-payment',
//   },
//   {
//     title: 'Confirmation',
//     icon: 'custom-trending',
//   },
// ]

const checkoutData = ref({
  cartItems: [
    {
      id: 1,
      name: 'Google - Google Home - White',
      seller: 'Google',
      inStock: true,
      rating: 4,
      price: 299,
      discountPrice: 359,
      image: googleHome,
      quantity: 1,
      estimatedDelivery: '18th Nov 2021',
    },
    {
      id: 2,
      name: 'Apple iPhone 11 (64GB, Black)',
      seller: 'Apple',
      inStock: true,
      rating: 4,
      price: 899,
      discountPrice: 999,
      image: iphone11,
      quantity: 1,
      estimatedDelivery: '20th Nov 2021',
    },
  ],
  promoCode: '',
  orderAmount: 1198,
  deliveryAddress: 'home',
  deliverySpeed: 'free',
  deliveryCharges: 0,
  addresses: [
    {
      title: 'John Doe (Default)',
      desc: '4135 Parkway Street, Los Angeles, CA, 90017',
      subtitle: '1234567890',
      value: 'home',
    },
    {
      title: 'ACME Inc.',
      desc: '87 Hoffman Avenue, New York, NY, 10016',
      subtitle: '1234567890',
      value: 'office',
    },
  ],
})

const currentStep = ref(0)


const lastWeeks = ref([]);

onMounted(() => {
  findLastWeeks();
});

function findLastWeeks() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const nextMonthFirstDay = new Date(currentYear, currentMonth + 1, 1);

  for (let month = 0; month < 12; month++) {
    const lastDayOfMonth = new Date(currentYear, month + 1, 0);
    let lastWeekStart = new Date(lastDayOfMonth);
    let lastWeekEnd = new Date(lastDayOfMonth);

    while (lastWeekEnd.getDay() !== 0) {
      lastWeekEnd.setDate(lastWeekEnd.getDate() + 1);
    }
    lastWeekStart.setDate(lastWeekEnd.getDate() - 6);

    if (
      lastWeekEnd >= nextMonthFirstDay ||
      month === 11
    ) {
      lastWeeks.value.push({
        start: formatDate(lastWeekStart),
        end: formatDate(lastWeekEnd),
      });
      break;
    }
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
</script>

<template>
  <VCard>
    <!-- <VCardText>
      <AppStepper
        v-model:current-step="currentStep"
        class="checkout-stepper"
        :items="checkoutSteps"
        :direction="$vuetify.display.smAndUp ? 'horizontal' : 'vertical'"
      />
    </VCardText>

    <VDivider /> -->

    <VCardText>
      <!-- 👉 stepper content -->
      <VWindow
        v-model="currentStep"
        class="disable-tab-transition"
      >
        <VWindowItem>
          <CartContent
            v-model:current-step="currentStep"
            v-model:checkout-data="checkoutData"
          />
        </VWindowItem>

        <VWindowItem>
          <AddressContent
            v-model:current-step="currentStep"
            v-model:checkout-data="checkoutData"
          />
        </VWindowItem>

        <VWindowItem>
          <PaymentContent
            v-model:current-step="currentStep"
            v-model:checkout-data="checkoutData"
          />
        </VWindowItem>

        <VWindowItem>
          <ConfirmationContent v-model:checkout-data="checkoutData" />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.checkout-stepper {
  .stepper-icon-step {
    .step-wrapper + svg {
      margin-inline: 3.5rem !important;
    }
  }
}
</style>
