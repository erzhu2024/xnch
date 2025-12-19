<template>
    <ClientOnly>
        <span class="flex items-center text-white">
            <MenuItem :menu-item="menuItem" :route-path="menuItem.path" />
        </span>
    </ClientOnly>
</template>
<script lang="ts" setup>
import MenuItem from '../menu/menu-item.vue'
defineProps({
    menuItem: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style lang="scss" scoped></style>
