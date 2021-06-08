import { ref } from "vue";
import { post, UserInfo } from "../../backend/api/post";

const userInfo = ref<UserInfo>({
  name: "pyx",
  token: "pyx ai chi rou",
  hobbies: ["chi rou"],
});

function getUserInfo() {
  if (Math.random() > 0.5) {
    userInfo.value.hobbies = ["chi rou"];
  } else {
    userInfo.value.hobbies = ["chi cai"];
  }
}

export const useUser = () => {
  setInterval(() => {
    getUserInfo();
  }, 1000);
  return {
    userInfo,
    getUserInfo,
  };
};
