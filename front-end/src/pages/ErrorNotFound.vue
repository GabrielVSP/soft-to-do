<template>
  <div class="fullscreen text-black text-center q-pa-md flex flex-center">
    <div>
      <div class="text-5xl">
        404
      </div>

      <div class="text-lg" style="opacity:.4">
        Looks like there is nothig here
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound'
});
</script>
