<script setup lang="ts">
import { useRouter } from 'vue-router';
import GuestLayout from '../layouts/GuestLayout.vue';
import { useForm } from '@inertiajs/inertia-vue3';
import axios from 'axios';
import { ref } from 'vue';
import { useAuth } from 'src/hooks/useAuth';

const dense = true
const router = useRouter()
const auth = useAuth()

defineProps<{
    canResetPassword?: boolean;
    status?: string;
}>();

const errors = ref<{ general: string }>({general: ''})

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const submit = async () => {

    axios.post('http://localhost:8000/api/register', {
        name: form.email,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*',
        }
    },)
    .then((res: { data: { token: string } }) => {

        if (res.data.token) {

            auth.setToken(res.data.token)
            location.href = "http://localhost:9000/"

        }
        
    })
    .catch((error) => {
        
        if (error.response && error.response.status === 401) {
            errors.value = { general: "The provided credentials are incorrect." }
        } 

        console.log(errors)


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

                    <label for="name">Name</label>

                    <div class="p-1">

                        <q-input id="name" type="text" v-model="form.name" :dense="dense" outlined
                            input-style="--tw-ring-offset-color: none" color="black" required />

                        <q-banner v-if="form.errors.name" class="text-negative !px-1 !py-0 !m-0">
                            {{ form.errors.name }}
                        </q-banner>

                    </div>

                </div>

                <div class="mb-2">

                    <label for="email">Email</label>

                    <div class="p-1">
                        <q-input id="email" type="email" v-model="form.email" :dense="dense" outlined
                            input-style="--tw-ring-offset-color: none" color="black" required />
                        <q-banner v-if="form.errors.email" class="text-negative !px-1 !py-0 !m-0">
                            {{ form.errors.email }}
                        </q-banner>
                    </div>

                </div>

                <div class="mb-2">

                    <label for="password">Password</label>

                    <div class="p-1">

                        <q-input id="password" type="password" v-model="form.password" :dense="dense" outlined
                            input-style="--tw-ring-offset-color: none" color="black" required />

                        <q-banner v-if="form.errors.password" class="text-negative !px-1 !py-0 !m-0">
                            {{ form.errors.password }}
                        </q-banner>

                    </div>

                </div>

                <div class="mb-2">

                    <label for="password_confirmation">Confirm password</label>

                    <div class="p-1">

                        <q-input id="password_confirmation" type="password" v-model="form.password_confirmation" :dense="dense" outlined
                            input-style="--tw-ring-offset-color: none" color="black" required />

                        <q-banner v-if="form.errors.password_confirmation" class="text-negative !px-1 !py-0 !m-0">
                            {{ form.errors.password_confirmation }}
                        </q-banner>

                    </div>

                </div>

                <div class="w-full flex justify-between items-center">

                    <div>
                        <Link
                            class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Register
                        </Link>
                    </div>

                    <div class="w-2/3 flex justify-end items-center">

                        <RouterLink to="login"
                            class="px-2 rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Already have an account?
                        </RouterLink>

                        <q-btn label="Register" type="submit" color="black" class="p-1" dense />

                    </div>

                </div>

            </q-form>

        </div>

    </GuestLayout>
</template>
