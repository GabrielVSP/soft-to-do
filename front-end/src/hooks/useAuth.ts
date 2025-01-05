import axios from 'axios';
import { ref } from 'vue';

const token = ref<string|null>(sessionStorage.getItem('accessToken'));

export function useAuth() {

    function setToken(newToken: string) {

        sessionStorage.setItem("accessToken", newToken)

    }

    function clearToken() {
        token.value = null;
    }

  return {
    token,
    setToken,
    clearToken,
  };
}