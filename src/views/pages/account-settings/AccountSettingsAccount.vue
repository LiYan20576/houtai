<script setup>
import avatar1 from '@images/avatars/avatar-14.png'
import axios from 'axios'

const accountData = {
  avatarImg: avatar1,
  firstName: 'john',
  lastName: 'Doe',
  email: 'johnDoe@example.com',
  org: 'Pixinvent',
  phone: '+1 (917) 543-9876',
  address: '123 Main St, New York, NY 10001',
  state: 'New York',
  zip: '10001',
  country: 'USA',
  language: 'English',
  timezone: '(GMT-11:00) International Date Line West',
  currency: 'USD',
  Name: 'joker'
}
const user = {'id':1,'fullName':"John Doe",'username':"johndoe",'avatar':"http://192.168.31.126:8888/images/ava.jpg",'email':"admin@demo.com",'role':"admin"}
localStorage.setItem('userData', JSON.stringify(user))

const refInputEl = ref()
const isConfirmDialogOpen = ref(false)
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)
const validateAccountDeactivation = [v => !!v || 'Please confirm account deactivation']

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}

// 从接口获取动态数据
const fetchAccountData = async () => {
  try {
    // const query = {
    //   userId: 1
    // };
    // const response = await axios.get('http://192.168.31.126:8888/getUserInfo');

    const response = {data:{
        avatarImg: avatar1,
        firstName: 'steve',
        lastName: 'Deng',
        email: 'steveDeng@example.com',
        org: 'Pixinvent',
        phone: '+86 18954235717',
        address: '123 Main St, New York, NY 10001',
        state: 'New York',
        zip: '10001',
        country: 'USA',
        language: 'English',
        timezone: '(GMT-11:00) International Date Line West',
        currency: 'USD',
        nickname: 'Joker'
    }};
    accountDataLocal.value = response.data;
    
    // 从 localStorage 中获取之前存储的 userData
    const userData = JSON.parse(localStorage.getItem('userData'));

    // 修改 avatar 字段的值
    userData.avatar = response.data.avatarImg;

    // 将修改后的 userData 对象重新存储到 localStorage 中
    localStorage.setItem('userData', JSON.stringify(userData));


    
  } catch (error) {
    console.error('Error fetching account data:', error);
  }
};

// 保存用户数据
const saveChanges = async () => {
  try {
    const response = await axios.post('http://192.168.31.126:8888/saveChanges',accountDataLocal.value);

    accountDataLocal.value = response
    
    // 从 localStorage 中获取之前存储的 userData
    const userData = JSON.parse(localStorage.getItem('userData'));

    // 修改 avatar 字段的值
    userData.avatar = response.data.avatarImg;

    // 将修改后的 userData 对象重新存储到 localStorage 中
    localStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Error fetching account data:', error);
  }
};

// 在组件挂载前触发请求
onBeforeMount(() => {
  fetchAccountData();
});

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="个人信息">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-4">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="tabler-cloud-upload"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">上传新照片</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="secondary"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">重置</span>
                <VIcon
                  icon="tabler-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              允许 JPG, GIF or PNG. 最大不能超过 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText class="pt-2">
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.firstName"
                  label="姓名"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.email"
                  label="电子邮箱"
                  type="email"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.phone"
                  label="电话号码"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click="saveChanges">保存修改</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  重置
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Delete Account -->
      <VCard title="Delete Account">
        <VCardText>
          <!-- 👉 Checkbox and Button  -->
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              :rules="validateAccountDeactivation"
              label="I confirm my account deactivation"
            />
          </div>

          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-3"
            @click="isConfirmDialogOpen = true"
          >
            Deactivate Account
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- Confirm Dialog -->
  <ConfirmDialog
    v-model:isDialogVisible="isConfirmDialogOpen"
    confirmation-question="Are you sure you want to deactivate your account?"
    confirm-title="Deactivated!"
    confirm-msg="Your account has been deactivated successfully."
    cancel-title="Cancelled"
    cancel-msg="Account Deactivation Cancelled!"
  />
</template>
