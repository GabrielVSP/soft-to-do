<script setup lang="ts">
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const dense = true

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
        },
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Register" />

        <div class="!text-black">
            
            <q-form @submit.prevent="submit">

                <div class="mb-2">
    
                    <label for="name">Name</label>

                    <div class="p-1">
                        <q-input
                            id="name"
                            type="text"
                            v-model="form.name"
                            :dense="dense"
                            outlined
                            input-style="--tw-ring-offset-color: none"
                            color="black"
                            required
                        />
                        <q-banner v-if="form.errors.name" class="text-negative !px-1 !py-0 !m-0">
                            {{ form.errors.name }}
                        </q-banner>
                    </div>

                </div>
    
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
                        <q-banner v-if="form.errors.email" class="text-negative !px-1 !py-0 !m-0">
                            {{ form.errors.email }}
                        </q-banner>
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
    
                        <q-banner v-if="form.errors.password" class="text-negative !px-1 !py-0 !m-0">
                            {{ form.errors.password }}
                        </q-banner>
    
                    </div>
    
                </div>

                <div class="mb-2">
    
                    <label for="password_confirmation">Confirm password</label>

                    <div class="p-1">
                        <q-input
                            id="password_confirmation"
                            type="password"
                            v-model="form.password_confirmation"
                            :dense="dense"
                            outlined
                            input-style="--tw-ring-offset-color: none"
                            color="black"
                            required
                        />
                        <q-banner v-if="form.errors.password_confirmation" class="text-negative !px-1 !py-0 !m-0">
                            {{ form.errors.password_confirmation }}
                        </q-banner>
                    </div>

                </div>
    
                <div class="w-full flex justify-end items-center">
    
                    <Link
                        :href="route('login')"
                        class="px-2 rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already have an account? Login
                    </Link>
                    <q-btn label="Submit" type="submit" color="primary" size="13" />
    
                </div>
    
            </q-form>
    
            </div>

    </GuestLayout>
</template>
