<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <div>
        <div class="min-h-screen bg-gray-100">

            <header class="px-2 py-1 md:py-2 lg:px-5 shadow-sm flex justify-between items-center lg:w-[90%] lg:mx-auto">

                <h1 class="text-xl p-1"><RouterLink to="/">To-do App</RouterLink></h1>

                <nav>

                    <div class="md:!hidden block">
                        <q-btn title="Mobile menu" size="12" icon="fas fa-bars" unelevated>
                            <q-menu>
                            <q-list style="min-width: 100px">
                                <q-item clickable v-close-popup>
                                <q-item-section> <RouterLink to="/tasks">Tasks</RouterLink> </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                <q-item-section>Profile</q-item-section>
                                </q-item>
                                <q-separator />
                                
                            </q-list>
                            </q-menu>
                        </q-btn>
                    </div>

                    <div class="md:!flex hidden text-[#64748b] text-lg gap-2">

                        <RouterLink to="/tasks" class=" hover:text-black duration-300">Tasks</RouterLink>
                        <RouterLink to="/profile" class=" hover:text-black duration-300">Profile</RouterLink>

                    </div>

                </nav>

            </header>

            <q-separator />

            <main>
                <slot />
            </main>
        </div>
    </div>
</template>