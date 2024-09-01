import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserInfo } from '@/api/userinfo';

export const useUserInfo = defineStore('userinfo', () => {
  // 使用 ref 定义状态
  const imageUrl = ref('');
  const name = ref('');
  const sex = ref('');
  const department = ref('');
  const identity = ref('');
  const account = ref('');
  const email = ref('');
  const id = ref('')

  // 定义 actions，并保持函数名为 userInfo
  const userInfo = async (id) => {
    try {
      const res = await getUserInfo(id);
      // console.log(res.data);
      imageUrl.value = res.data.imageUrl;
      name.value = res.data.name;
      sex.value = res.data.sex;
      department.value = res.data.department;
      identity.value = res.data.identity;
      account.value = res.data.account;
      email.value = res.data.email;
      id.value = res.data.id;
      // console.log(account.value, imageUrl.value, name.value);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  // 返回状态和方法
  return {
    imageUrl,
    name,
    sex,
    department,
    identity,
    account,
    email,
    id,
    userInfo, // 保持函数名为 userInfo
  };
}, {
  persist: {
    enabled: true,
    key: 'userinfo',
    storage: localStorage, // 修改拼写错误的 storeage 为 storage
  },
});