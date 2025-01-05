<script setup lang="ts">
import axios from 'axios';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout.vue';
import moment from 'moment';
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router';

const progress = ref(true)
const pending = ref(true)
const completed = ref(true)
const showTooltip = ref(false);

interface Task {
    id: number
    title: string
    description: string
    status: string
    category_id: number
    created_at: string
    completion_date: string
    category: {
        name: string,
        color: string
    }
}

const tasks = ref<Array<Task>>([])
const searchQuery = ref('')

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

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "#FBBF24"
    case "in_progress":
      return "#3B82F6"
    case "completed":
      return "#10B981"
    default:
      return "#E5E7EB"
  }
}

const filteredTasks = computed(() => {
  return tasks.value.filter((task: Task) => {

    const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = (pending.value && task.status === 'pending') ||
                          (progress.value && task.status === 'in_progress') ||
                          (completed.value && task.status === 'completed');

    return matchesSearch && matchesStatus;
  });
})

const changeStatus = async (id: number, status: string) => {

    axios.patch('http://localhost:8000/api/tasks/'+id, {
            status: status,
            completion_date: status === 'completed' ? moment().format('YYYY-MM-DD') : null
        }, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        }
        })
        .catch((error) => {
            console.error('Error:', error.response?.data || error.message)
        }).finally(() => {
            location.reload()
        })

}

const deleteTask = async (id: number) => {
    axios.delete('http://localhost:8000/api/tasks/'+id, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        }
        })
        .catch((error) => {
            console.error('Error:', error.response?.data || error.message)
        }).finally(() => {
            location.reload()
        })
}

onMounted(() => {
    getTasks();
});

</script>

<template>

    <AuthenticatedLayout>

        <div>
            <div class="mx-auto max-w-9xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg mb-3">

                    <div class="px-5 py-2 w-full flex flex-col md:flex-row justify-between items-start mb-3">
                        <h2 class="text-3xl font-bold md:m-0 mb-1">Tasks ({{ filteredTasks.length }})</h2>
                    </div>

                    <div class="px-3 w-full flex justify-between">

                        <div class="w-[80%] flex justify-center md:justify-start">

                            <input type="text" name="search" id="search"
                                class="md:w-1/3 min-w-[70%] p-2 rounded-lg border border-[#64748b] text-[#64748b]"
                                placeholder="Search" v-model="searchQuery">

                            <q-btn-dropdown stretch flat icon="fas fa-filter" size="12"
                                class="text-[#64748b] scale-90 w-fit">
                                <q-list dense>
                                    <q-item>
                                        <q-checkbox v-model="pending" size="sm" label="Pending" color="cyan" />
                                    </q-item>
                                    <q-item>
                                        <q-checkbox v-model="progress" size="sm" label="In Progress" color="cyan" />
                                    </q-item>
                                    <q-item>
                                        <q-checkbox v-model="completed" size="sm" label="Completed" color="cyan" />
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>

                        </div>

                        <div>
                            <RouterLink to="tasks/create">
                            <q-btn color="black" text-color="white" label="Create Task" class="p-2" dense />
                            </RouterLink>
                        </div>

                    </div>

                    <div class="w-full mt-4 px-5 py-2 text-gray-900 flex flex-col items-start" v-for="task in filteredTasks" :key="task.id">

                        <div class="w-1/2 flex justify-between gap-5 items-center rounded-md mb-2 duration-500 p-2 shadow-lg border-indigo-700 cursor-pointer">

                            <div class="flex justify-between gap-5 items-center">
                                <div class="w-4 h-4 rounded-lg mx-3" :style="{ backgroundColor: getStatusColor(task.status) }" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
                                    <q-tooltip v-if="showTooltip" class="bg-white text-black shadow-lg">
                                        {{task.status}}
                                    </q-tooltip>
                                </div>
                                <div>
                                    <p class="text-lg font-bold mb-0">{{ task.title }}</p>
                                    <p>{{ task.description }}</p>
                                </div>
                                <div class="grid grid-cols-2 grid-rows-2 gap-1 self-end">
                                    <p>Category: <strong :style="{ color: task.category.color }">{{task.category.name}}</strong></p>
                                    <p>Completed At: <strong> {{task.completion_date ? moment(task.completion_date).format('DD/MM/YYYY') : '-'}} </strong></p>
                                    <p :style="{ color: getStatusColor(task.status) }"><span class="text-black">Status</span>:
                                        <q-btn-dropdown :label="task.status" unelevated dense>
                                            <q-list dense>

                                                <q-item clickable v-close-popup @click="changeStatus(task.id, 'pending')">
                                                        <q-item-section class="text-yellow-500">
                                                            <q-item-label>Pending</q-item-label>
                                                        </q-item-section>
                                                </q-item>

                                                <q-item clickable v-close-popup @click="changeStatus(task.id, 'in_progress')">
                                                    <q-item-section class="text-blue-500">
                                                        <q-item-label>In progress</q-item-label>
                                                    </q-item-section>
                                                </q-item>

                                                <q-item clickable v-close-popup @click="changeStatus(task.id, 'completed')">
                                                    <q-item-section class="text-green-500">
                                                        <q-item-label>Completed</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                            </q-list>
                                        </q-btn-dropdown>
                                </p>
                                    <p>Created At: <strong>{{moment(task.created_at).format('DD/MM/YYYY')}}</strong></p>

                                </div>
                            </div>

                            <div>
                                <q-btn-dropdown icon="fas fa-ellipsis-vertical" unelevated dense>
                                    <q-list dense>

                                        <RouterLink :to="`/tasks/${task.id}`">
                                            <q-item clickable v-close-popup>
                                                    <q-item-section>
                                                        <q-item-label>Edit</q-item-label>
                                                    </q-item-section>
                                            </q-item>
                                        </RouterLink>

                                        <q-item clickable v-close-popup @click="changeStatus(task.id, 'completed')">
                                            <q-item-section>
                                                <q-item-label>Mark as complete</q-item-label>
                                            </q-item-section>
                                        </q-item>

                                        <q-item clickable v-close-popup @click="deleteTask(task.id)">
                                            <q-item-section class="text-red-400">
                                                <q-item-label>Delete</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-btn-dropdown>
                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>
