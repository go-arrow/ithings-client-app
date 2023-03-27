<template>
  <t-layout class="h-screen">
    <t-aside :width="setting.collapsed ? '64px' : '232px'">
      <Menu />
    </t-aside>
    <t-layout>
      <t-header>
        <Header />
      </t-header>
      <t-content>
        <router-view />
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script setup>
import { useSettingStore } from '@/stores/setting'

import Header from './components/Header.vue'
import Menu from './components/Menu.vue'

const setting = useSettingStore()

</script>

<style scoped></style>