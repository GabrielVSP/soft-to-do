<script setup lang="ts">

import { useForm } from '@inertiajs/inertia-vue3';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout.vue';
import { onMounted, ref, watch } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

interface Task {
    id: number
    title: string
    description: string
    status: string
    category_id: number
    created_at: string
    category: {
        name: string,
        color: string
    }
}

interface Category {
    id: number
    name: string
    color: string
}

const route = useRoute()
const router = useRouter()

const taskId = route.params.id
const dense = true

const task = ref<Task>()
const user = ref<{id: string}>()
const options = ref([])
const statusOptions = [
    {
        label: 'Pending',
        value: 'pending',
    },
    {
        label: 'In Progress',
        value: 'in_progress',
    },
    {
        label: 'Completed',
        value: 'completed',
    },
]

const getTask = async () => {

    try {

        const res = await axios.get('http://localhost:8000/api/tasks/'+ (taskId !== 'create' ? taskId : ''), {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        })

        if(res.data) {
            task.value = res.data
            form.title = res.data.title
            form.description = res.data.description
            form.category = res.data.category.name
        }

    } catch(error) {

        console.log("Error while fetching Tasks", error)

    }

}

async function getUser() {

    try {

        const res = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                    },
        })

        user.value = res.data

    } catch {
        console.log("Erro while fetching user data")
    }

}

async function getCategories() {
  try {
    const response = await axios.get('http://localhost:8000/api/categories')

    options.value = response.data.map((provider: Category) => ({
      label: provider.name,
      value: provider.id, 
      color: provider.color || '#000000',
    }))

  } catch (error) {
    console.error('Error while fetching categories', error);
  }
}

const form = useForm({
    title: '',
    description: '',
    category: {
        value: ''
    },
    status: ''
});

const submit = () => {
    
    if(task.value) {

        axios.patch('http://localhost:8000/api/tasks/'+taskId, {
            title: form.title,
            description: form.description,
            category_id: form.category?.value,
        }, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        }
        })
        .catch((error) => {
            console.error('Error:', error.response?.data || error.message);
        }).finally(() => {
            router.push({name: 'tasks'})
        })

    }

    if(!task.value?.title) {

        axios.post('http://localhost:8000/api/tasks', {
            title: form.title,
            description: form.description,
            category_id: form.category?.value,
            user_id: user.value?.id
        }, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        }
        })
        .catch((error) => {
            console.error('Error:', error.response?.data || error.message);
        }).finally(() => {
            router.push({name: 'tasks'})
        })

    }
    
}

onMounted(() => {
    getTask()
    getCategories()
    getUser()
})

</script>

<template>

    <AuthenticatedLayout>

        <div>
            <div class="mx-auto max-w-9xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg mb-3">

                    <div class="px-5 py-2 w-full flex flex-col md:flex-row justify-between items-start mb-3">
                        <h2 class="text-3xl font-bold md:m-0 mb-1">{{task?.title ? 'Update' : 'Create' }} task</h2>
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

                                <div class="md:w-1/4 w-full">

                                    <label for="category">Category</label>

                                    <div class="p-1">

                                        <q-select v-model="form.status" :dense="dense" :options="statusOptions"
                                            color="black" outlined />
                
                                        <q-banner v-if="form.errors.category" class="text-negative !px-1 !py-0 !m-0">
                                            {{ form.errors.category }}
                                        </q-banner>

                                    </div>

                                </div>

                            </div>

                            <q-btn :label="task?.title ? 'Update' : 'Create'" type="submit" color="black" class="p-2 mt-2" />

                        </q-form>

                    </div>

                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>