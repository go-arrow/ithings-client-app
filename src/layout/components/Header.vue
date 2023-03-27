<template>
  <t-head-menu theme="light">
    <t-button shape="square" variant="text" size="large" class="-mx-4" @click="changeCollapsed">
      <t-icon name="view-list" />
    </t-button>

    <template #operations>
      <t-button variant="text" shape="square" size="large">
        <template #icon><t-icon name="mail" /></template>
      </t-button>
      <t-button variant="text" shape="square" size="large">
        <template #icon><t-icon name="user" /></template>
      </t-button>
      <t-button variant="text" shape="square" size="large">
        <template #icon><t-icon name="ellipsis" /></template>
      </t-button>
    </template>

  </t-head-menu>
</template>

<script setup>
import { useSettingStore } from '@/stores/setting'

const setting = useSettingStore()

const changeCollapsed = () => {
  setting.changeCollapsed()
}

</script>

<style scoped></style>