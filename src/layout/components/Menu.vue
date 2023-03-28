<template>
  <t-menu theme="dark" default-value="Dashboard" :default-expanded="defaultExpanded" :value="route.meta.menu"
    :collapsed="setting.collapsed" @change="changeHandler">

    <template #logo>
      <img v-if="setting.collapsed" width="64" class="px-1" src="@/assets/logo/logo.png" alt="logo" />
      <img v-else height="28" src="@/assets/logo/logo-full.png" alt="logo" />
    </template>

    <t-menu-item value="dashboard">
      <template #icon>
        <t-icon name="dashboard" />
      </template>
      仪表盘
    </t-menu-item>

    <t-submenu value="core">
      <template #icon>
        <t-icon name="cloud-upload" />
      </template>
      <template #title>
        <span>数据管理</span>
      </template>
      <t-menu-item value="template"> 模板管理 </t-menu-item>
      <t-menu-item value="product"> 产品管理 </t-menu-item>
      <t-menu-item value="device"> 设备管理 </t-menu-item>
    </t-submenu>

    <t-submenu value="dictionary">
      <template #icon>
        <t-icon name="view-module" />
      </template>
      <template #title>
        <span>字典管理</span>
      </template>
      <t-menu-item value="industry"> 行业类型 </t-menu-item>
      <t-menu-item value="scene"> 应用场景 </t-menu-item>
      <t-menu-item value="unit"> 数据单位 </t-menu-item>
    </t-submenu>

    <t-menu-item value="setting">
      <template #icon>
        <t-icon name="setting" />
      </template>
      系统设置
    </t-menu-item>
  </t-menu>
</template>

<script setup>
import { useSettingStore } from '@/stores/setting'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const setting = useSettingStore()

const defaultExpanded = ref([])

const router = useRouter()
const route = useRoute()

onMounted(() => {
  const p = route.path.split('/')[1]
  // const first = p.slice(0, 1).toUpperCase() + p.slice(1)
  defaultExpanded.value.push(p)
})

const changeHandler = (value) => {
  router.push({
    name: value,
  })
}

</script>

<style scoped></style>