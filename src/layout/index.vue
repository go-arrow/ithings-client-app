<template>
  <t-layout class="h-screen">
    <t-aside :width="setting.collapsed ? '64px' : '232px'">
      <Menu />
    </t-aside>
    <t-layout>
      <t-header>
        <Header />
      </t-header>
      <t-content class="p-4 max-h-screen overflow-y-auto">
        <t-breadcrumb class="mb-4">
          <template #default>
            <t-breadcrumbItem>首页</t-breadcrumbItem>
            <t-breadcrumbItem>{{ route.meta.breadcrumb }}</t-breadcrumbItem>
          </template>
          <template #separator> > </template>
        </t-breadcrumb>

        <router-view />
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script setup>
import { useSettingStore } from '@/stores/setting'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'

const setting = useSettingStore()

const route = useRoute()

</script>

<style>
.t-table__header {
  font-size: 13px;
}

.t-table__header>tr {
  background-color: #f0f4f8;
}

.t-table__header>tr>th {
  padding: 9px 16px;
}

.t-table__th-cell-inner {
  color: #0b1d30;
  font-weight: bolder;
}
</style>