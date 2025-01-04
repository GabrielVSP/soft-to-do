<script setup lang="ts">
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';
import { ref } from 'vue'

interface Row {
  title: string;
  description: string;
  status: string;
  category: string;
  createdAt: string;
  completedAt: string;
  actions: string;
}

interface Column {
  name: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  field: string | ((row: Row) => any);
  required?: boolean;
  sortable?: boolean;
}

interface RequestProps {
  pagination: {
    page: number;
    rowsPerPage: number;
    sortBy: string;
    descending: boolean;
  };
}

const progress = ref(true)
const pending = ref(true)
const completed = ref(true)

const rows = ref<Row[]>([
  {  title: 'Fazer arroz', description: 'Faze arros', status: 'pending', category: 'comida', createdAt: 'doisdodois', completedAt: 'never', actions: '' },
]);

const columns = ref<Column[]>([
  { name: 'title', label: 'Title', align: 'left', field: row => row.title },
  { name: 'description', label: 'Description', align: 'center', field: row => row.description },
  { name: 'status', label: 'Status', align: 'center', field: row => row.status },
  { name: 'category', label: 'Category', align: 'center', field: row => row.category },
  { name: 'createdAt', label: 'Created At', align: 'center', field: row => row.createdAt },
  { name: 'completedAt', label: 'Completed At', align: 'center', field: row => row.completedAt },
  { name: 'actions', label: ' ', align: 'center', field: row => row.actions },
]);

const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});

function onRequest(props: RequestProps) {
  pagination.value = props.pagination;
}

</script>

<template>

    <AuthenticatedLayout>

        <div>
            <div class="mx-auto max-w-9xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg mb-3">

                    <div class="px-5 py-2 w-full flex flex-col md:flex-row justify-between items-start mb-3">
                        <h2 class="text-3xl font-bold md:m-0 mb-1">Tasks (6)</h2>
                    </div>

                    <div class="px-3 w-full flex justify-center md:justify-start ">
                        
                        <input type="text" name="search" id="search" class="md:w-1/3 min-w-[70%] p-2 rounded-lg border border-[#64748b] text-[#64748b]" placeholder="Search">
                        <q-btn-dropdown stretch flat icon="fas fa-filter" size="12" class="text-[#64748b] scale-90 w-fit">
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

                    <div class="w-full px-5 py-2 text-gray-900 flex flex-col items-left">

                        <q-table
                            :rows="rows"
                            :columns="columns"
                            :rows-per-page-options="[5, 10, 15]"
                            row-key="id"
                            :pagination="pagination"
                            @request="onRequest"
                        >
                            <template v-slot:top-right>
                                <q-btn color="black" label="Create task" class="rounded-md" />
                            </template>

                            <!--ACTIONS-->

                            <template v-slot:body-cell-actions="props">
                                <q-btn 
                                icon="edit" 
                                color="primary" 
                                flat 
                                @click="" 
                                />
                                <q-btn 
                                icon="delete" 
                                color="negative" 
                                flat 
                                @click="" 
                                />
                            </template>

                            <!--CATEGORY-->

                            <template v-slot:body-cell-category="props">
                                <div class="flex items-center justify-center px-16p py-7">
                                    <div class="circle w-2 h-2 rounded-full bg-red-400"></div>
                                    <span class="q-ml-sm">{{ props.row.category }}</span>
                                </div>
                            </template>
                        </q-table>

                    </div>

                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>