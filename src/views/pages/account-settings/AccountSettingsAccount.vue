<script setup>
import avatar1 from '@images/avatars/avatar-14.png'
import axios from 'axios'
import {
  emailValidator,
  requiredemailValidator,
  requiredenumberValidator,
  numberValidator,
  passwordValidator,
  requiredepasswordValidator,
  requiredecodeValidator,
  requirederuleValidator,
  requirederulesValidator,
} from "@validators";
import { updateInfo } from '@/api/index'

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

const refVForm = ref();
const refInputEl = ref()
const isConfirmDialogOpen = ref(false)
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)
const validateAccountDeactivation = [v => !!v || 'Please confirm account deactivation']

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) register();
  });
};

const getcode = async () => {
  errmessage.value = "";
  // 获取手机验证码
  if (useemail.value) {
    if (email.value && coderule.value && imgcode.value) {
      const { data: res } = await SendCodeMp(email.value, imgcode.value);
      if (res.code == 100) {
        coderule.value = false;

        var time = 60;
        let intervalID = setInterval(() => {
          time--;
          getcoderule.value = time;
          if (time == -1) {
            clearInterval(intervalID);
            getcoderule.value = "获取验证码";
            coderule.value = true;
          }
        }, 1000);
      } else {
        errmessage.value = res.message ? res.message : "获取验证码失败！";
      }
    }
  } else {
    // 获取邮箱验证码
    if (email.value && coderule.value) {
      const { data: res } = await SendCodeEmail(email.value);
      if (res.code == 200) {
        coderule.value = false;

        var time = 60;
        let intervalID = setInterval(() => {
          time--;
          getcoderule.value = time;
          if (time == -1) {
            clearInterval(intervalID);
            getcoderule.value = "获取验证码";
            coderule.value = true;
          }
        }, 1000);
      } else {
        errmessage.value = res.message ? res.message : "获取验证码失败！";
      }
    }
  }
};

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
        console.log(fileReader.result);
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}

// 从接口获取动态数据
const fetchAccountData = async () => {
  // try {
  //   // const query = {
  //   //   userId: 1
  //   // };
  //   // const response = await axios.get('http://192.168.31.126:8888/getUserInfo');

  //   const response = {data:{
  //       avatarImg: avatar1,
  //       firstName: 'steve',
  //       lastName: 'Deng',
  //       email: 'steveDeng@example.com',
  //       org: 'Pixinvent',
  //       phone: '+86 18954235717',
  //       address: '123 Main St, New York, NY 10001',
  //       state: 'New York',
  //       zip: '10001',
  //       country: 'USA',
  //       language: 'English',
  //       timezone: '(GMT-11:00) International Date Line West',
  //       currency: 'USD',
  //       nickname: 'Joker'
  //   }};
  //   accountDataLocal.value = response.data;
    
  //   // 从 localStorage 中获取之前存储的 userData
  //   const userData = JSON.parse(localStorage.getItem('userData'));

  //   // 修改 avatar 字段的值
  //   userData.avatar = response.data.avatarImg;

  //   // 将修改后的 userData 对象重新存储到 localStorage 中
  //   localStorage.setItem('userData', JSON.stringify(userData));


    
  // } catch (error) {
  //   console.error('Error fetching account data:', error);
  // }
};

// 保存用户数据
const saveChanges = async () => {
  const { data:res } = await updateInfo(accountDataLocal.value.firstName,accountDataLocal.value.email,accountDataLocal.value.phone,accountDataLocal.value.avatarImg);
  console.log(res);
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
          <VForm class="mt-6" ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.firstName"
                  label="昵称"
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
                  :rules="[emailValidator,requiredemailValidator]"
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

  </VRow>

</template>
