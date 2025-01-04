<script setup lang="ts">
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/inertia-vue3';
</script>

<template>

    <AuthenticatedLayout>

        <div>
            <div class="mx-auto max-w-9xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">

                    <div class="w-full p-6 text-gray-900 flex flex-col items-center justify-evenly lg:flex-row">

                        <div class="mb-1 p-3 w-11/12 shadow-lg lg:w-1/3">

                            <div class="mb-3">
                                <h3 class="text-lg font-bold border-b border-yellow-500 w-fit">Pending (3)</h3>
                            </div>

                            <div class="p-2">

                                <div class="flex justify-between items-center rounded-md hover:bg-indigo-500 hover:text-white duration-500 p-2 border-b-2 border-indigo-700 cursor-pointer">
                                    <p class="text-md mb-0">lorem ipsum sit dolor ame net</p>
                                    <q-icon name="fas fa-arrow-up-right-from-square" class="" />
                                </div>

                            </div>

                        </div>

                        <div class="mb-1 p-3 w-11/12 shadow-lg lg:w-1/3">

                            <div class="mb-3">
                                <h3 class="text-lg font-bold border-b border-blue-500 w-fit">In Progress (2)</h3>
                            </div>

                            <div class="p-2">

                                <div class="flex justify-between items-center rounded-md hover:bg-indigo-500 hover:text-white duration-500 p-2 border-b-2 border-indigo-700 cursor-pointer">
                                    <p class="text-md mb-0">lorem ipsum sit dolor ame net</p>
                                    <q-icon name="fas fa-arrow-up-right-from-square" class="" />
                                </div>

                            </div>

                        </div>

                        <div class="mb-1 p-3 w-11/12 shadow-lg lg:w-1/3">

                            <div class="mb-3">
                                <h3 class="text-lg font-bold border-b border-green-500 w-fit">Completed (1)</h3>
                            </div>

                            <div class="p-2">

                                <div class="flex justify-between items-center rounded-md hover:bg-indigo-500 hover:text-white duration-500 p-2 border-b-2 border-indigo-700 cursor-pointer">
                                    <p class="text-md mb-0">lorem ipsum sit dolor ame net</p>
                                    <q-icon name="fas fa-arrow-up-right-from-square" class="" />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>