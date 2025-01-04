<script setup lang="ts">

import { useForm } from '@inertiajs/inertia-vue3';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout.vue';
import { ref } from 'vue'
import axios from 'axios';

const dense = true
const options = ([
        {
          label: 'Google',
          value: 'Google',
          color: 'red'
        },
        {
          label: 'Facebook',
          value: 'Facebook',
          color: '#6926B6'
        },
        {
          label: 'Twitter',
          value: 'Twitter',
          color: '#6926B6'
        },
        {
          label: 'Apple',
          value: 'Apple',
          color: '#6926B6'
        },
        {
          label: 'Oracle',
          value: 'Oracle',
          color: '#6926B6'
        }
])

const form = useForm({
    title: '',
    description: '',
    category: '',
});

const submit = () => {

    axios.post('http://localhost:8000/api/login', {
        // email: form.email,
        // password: form.password
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*',
        }
    },)
        .then((res: { data: { token: string } }) => {

            localStorage.setItem('accessToken', res.data.token)
            // router.push({ name: 'index' })

        })
        .catch((error) => {
            console.error('Error:', error.response?.data || error.message);
        })

}

</script>

<template>

    <AuthenticatedLayout>

        <div>
            <div class="mx-auto max-w-9xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg mb-3">

                    <div class="px-5 py-2 w-full flex flex-col md:flex-row justify-between items-start mb-3">
                        <h2 class="text-3xl font-bold md:m-0 mb-1">Create task</h2>
                    </div>

                    <div class="w-full px-5 py-2 text-gray-900 flex flex-col items-left">

                        <q-form @submit.prevent="submit">

                            <div class="flex flex-col md:flex-row items-center gap-4">

                                <div class="md:w-1/4 w-full">

                                    <label for="title" class="font-normal">Title</label>

                                    <div class="p-1">

                                        <q-input id="title" type="text" v-model="form.title" :dense="dense" outlined
                                            input-style="--tw-ring-offset-color: none" color="black" required />

                                        <q-banner v-if="form.errors.title" class="text-negative !px-1 !py-0 !m-0">
                                            {{ form.errors.title }}
                                        </q-banner>
                                    </div>

                                </div>

                                <div class="md:w-1/4 w-full">

                                    <label for="description">Description</label>

                                    <div class="p-1">

                                        <q-input id="description" type="text" v-model="form.description" :dense="dense"
                                            outlined input-style="--tw-ring-offset-color: none" color="black"
                                            required />

                                        <q-banner v-if="form.errors.description" class="text-negative !px-1 !py-0 !m-0">
                                            {{ form.errors.description }}
                                        </q-banner>

                                    </div>

                                </div>

                                <div class="md:w-1/4 w-full">

                                    <label for="category">Category</label>

                                    <div class="p-1">

                                        <q-select v-model="form.category" :dense="dense" :options="options"
                                            color="black" outlined>

                                            <template v-slot:option="scope">
                                                <q-item v-bind="scope.itemProps">

                                                    <q-item-section avatar>
                                                        <q-icon name="fas fa-circle" :style="{ color: scope.opt.color }" />
                                                    </q-item-section>

                                                    <q-item-section>
                                                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                                                    </q-item-section>

                                                </q-item>
                                            </template>

                                        </q-select>

                                        <q-banner v-if="form.errors.category" class="text-negative !px-1 !py-0 !m-0">
                                            {{ form.errors.category }}
                                        </q-banner>

                                    </div>

                                </div>

                            </div>

                            <q-btn label="Create" type="submit" color="black" class="p-2 mt-2" />

                        </q-form>

                    </div>

                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>