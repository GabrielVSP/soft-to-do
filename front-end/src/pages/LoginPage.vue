<script setup lang="ts">
import { useRouter } from 'vue-router';
import GuestLayout from '../layouts/GuestLayout.vue';
import { useForm } from '@inertiajs/inertia-vue3';
import axios from 'axios';
import { ref } from 'vue';
import { useAuth } from 'src/hooks/useAuth';

const dense = true
const router = useRouter()

defineProps<{
    canResetPassword?: boolean;
    status?: string;
}>();

const auth = useAuth()

const form = useForm({
    email: '',
    password: '',
});

const errors = ref<{ general: string }>({general: ''})

const submit = () => {

    axios.post('http://localhost:8000/api/login', {
        email: form.email,
        password: form.password
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*',
        }
    },)
    .then((res: { data: { token: string } }) => {
        
        if(res.data.token) {
            auth.setToken(res.data.token)
            router.push({ name: 'index' })
        }

    })
    .catch((error) => {

        if (error.response && error.response.status === 401) {
            errors.value = { general: "The provided credentials are incorrect." }
        } 
        
    })

};

</script>

<template>
    <GuestLayout>
        <Head title="Log in" />

        <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
            {{ status }}
        </div>

        <div class="!text-black">

        <q-form @submit.prevent="submit">

            <div class="mb-2">

                <label for="email">Email</label>

                <div class="p-1">
                    <q-input
                        id="email"
                        type="email"
                        v-model="form.email"
                        :dense="dense"
                        outlined
                        input-style="--tw-ring-offset-color: none"
                        color="black"
                        required
                    />
                    
                </div>

            </div>

            <div class="mb-2">

                <label for="password">Password</label>

                <div class="p-1">

                    <q-input
                        id="password"
                        type="password"
                        v-model="form.password"
                        :dense="dense"
                        outlined
                        input-style="--tw-ring-offset-color: none"
                        color="black"
                        required
                    />

                    <q-banner v-if="errors.general" class="text-negative !px-1 !py-0 !m-0">
                        {{ errors.general }}
                    </q-banner>

                </div>

            </div>

            <div class="w-full flex justify-between items-center">

                <div>
                    <Link
                        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Register
                    </Link>
                </div>

                <div class="w-2/3 flex justify-end items-center">

                    <RouterLink
                        to="register"
                        class="px-2 rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        New here? Register
                    </RouterLink>

                    <q-btn label="Login" type="submit" color="black" class="p-1" dense />

                </div>

            </div>

        </q-form>

        </div>

    </GuestLayout>
</template>
