import axios from 'axios';
import { ref } from 'vue';

const token = ref<string|null>(sessionStorage.getItem('accessToken'));

export function useAuth() {


    function user() {

        try {
            axios.get('http://localhost:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.data)
            
        } catch {

            return false
            
        }
        
    }

    function setToken(newToken: string) {

        sessionStorage.setItem("accessToken", newToken)

    }

    function clearToken() {
        token.value = null;
    }

  return {
    token,
    user,
    setToken,
    clearToken,
  };
}