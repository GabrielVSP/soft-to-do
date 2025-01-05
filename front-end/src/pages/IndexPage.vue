<script setup lang="ts">
import axios from 'axios';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/inertia-vue3';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const tasks = ref<Array<{ id: number, title: string, description: string }>>([])

const getTasks = async () => {

    try {

        const res = await axios.get('http://localhost:8000/api/tasks', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        })

        tasks.value = res.data

    } catch(error) {

        console.log("Error while fetching Tasks", error)

    }

}

const tasksByStatus = (status: string) => {
      return tasks.value.filter((task: any) => task.status === status);
}

onMounted(() => {
    getTasks();
});

</script>

<template>

    <AuthenticatedLayout>

        <div>
            <div class="mx-auto max-w-9xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">

                    <div class="w-full p-6 text-gray-900 flex flex-col items-center justify-evenly lg:flex-row">

                        <div class="mb-1 p-3 w-11/12 shadow-lg lg:w-1/3">

                            <div class="mb-3">
                                <h3 class="text-lg font-bold border-b border-yellow-500 w-fit">Pending ({{tasksByStatus('pending').length}})</h3>
                            </div>

                            <div class="p-2" v-for="task in tasksByStatus('pending')" :key="task.id">

                                <RouterLink :to="`/tasks/${task.id}`">
                                    <div class="flex justify-between items-center rounded-md hover:bg-indigo-500 hover:text-white duration-500 p-2 border-b-2 border-indigo-700 cursor-pointer">
                                        <p class="text-md mb-0">{{ task.title }}</p>
                                        <q-icon name="fas fa-arrow-up-right-from-square" class="" />
                                    </div>
                                </RouterLink>

                            </div>

                        </div>

                        <div class="mb-1 p-3 w-11/12 shadow-lg lg:w-1/3">

                            <div class="mb-3">
                                <h3 class="text-lg font-bold border-b border-blue-500 w-fit">In Progress ({{tasksByStatus('in_progress').length}})</h3>
                            </div>

                            <div class="p-2" v-for="task in tasksByStatus('in_progress')" :key="task.id">

                                <RouterLink :to="`/tasks/${task.id}`">
                                    <div class="flex justify-between items-center rounded-md hover:bg-indigo-500 hover:text-white duration-500 p-2 border-b-2 border-indigo-700 cursor-pointer">
                                        <p class="text-md mb-0">{{ task.title }}</p>
                                        <q-icon name="fas fa-arrow-up-right-from-square" class="" />
                                    </div>
                                </RouterLink>

                            </div>

                        </div>

                        <div class="mb-1 p-3 w-11/12 shadow-lg lg:w-1/3">

                            <div class="mb-3">
                                <h3 class="text-lg font-bold border-b border-green-500 w-fit">Completed ({{tasksByStatus('completed').length}})</h3>
                            </div>

                            <div class="p-2" v-for="task in tasksByStatus('completed')" :key="task.id">

                                <RouterLink :to="`/tasks/${task.id}`">
                                    <div class="flex justify-between items-center rounded-md hover:bg-indigo-500 hover:text-white duration-500 p-2 border-b-2 border-indigo-700 cursor-pointer">
                                        <p class="text-md mb-0">{{ task.title }}</p>
                                        <q-icon name="fas fa-arrow-up-right-from-square" class="" />
                                    </div>
                                </RouterLink>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>