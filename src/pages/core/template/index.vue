<template>
  <div>
    <t-card :bordered="false">
      <div class="mb-4">
        <span class="text-xl font-bold">模板管理</span>
        <span class="text-[14px] text-gray-400">(系统核心流程指南)</span>
      </div>

      <div class="flex mb-4">
        <div class="w-[300px] border flex p-4 mr-4 shadow">
          <label class="font-bold text-3xl text-blue-700 mr-3">01</label>
          <div>
            <label class="text-[16px]">创建物模板</label>
            <p class="text-[11px] text-gray-500">物模板是抽象产品功能的集合</p>
          </div>
        </div>
        <div class="w-[300px] border flex p-4 mr-4 shadow">
          <label class="font-bold text-3xl text-blue-700 mr-3">02</label>
          <div>
            <label class="text-[16px]">创建产品</label>
            <p class="text-[11px] text-gray-500">产品是同品类设备的集合</p>
          </div>
        </div>
        <div class=" w-[300px] border flex p-4 mr-4 shadow">
          <label class="font-bold text-3xl text-blue-700 mr-3">03</label>
          <div>
            <label class="text-[16px]">创建设备</label>
            <p class="text-[11px] text-gray-500">创建设备获取连接平台所需的身份信息</p>
          </div>
        </div>
        <div class="w-[300px] border flex p-4 mr-4 shadow">
          <label class="font-bold text-3xl text-blue-700 mr-3">04</label>
          <div>
            <label class="text-[16px]">数据解析</label>
            <p class="text-[11px] text-gray-500">如果不符合标准物模板则需要自定义解析</p>
          </div>
        </div>
        <div class="w-[300px] border flex p-4 shadow">
          <label class="font-bold text-3xl text-blue-700 mr-3">05</label>
          <div>
            <label class="text-[16px]">数据流转</label>
            <p class="text-[11px] text-gray-500">利用规则引擎进行数据流转</p>
          </div>
        </div>
      </div>

      <div class="border border-dashed my-4 -mx-6"></div>

      <div class="flex justify-between">
        <t-form class="mb-4" ref="form" :data="model" layout="inline" label-width="0">
          <t-form-item>
            <t-select v-model="model.industry">
              <t-option key="1" label="行业类型(全部)" value="1" />
              <t-option key="2" label="智慧园区" value="2" />
              <t-option key="3" label="智慧工业" value="3" />
              <t-option key="3" label="智慧水务" value="4" />
              <t-option key="3" label="智慧城市" value="5" />
            </t-select>
          </t-form-item>

          <t-form-item>
            <t-select v-model="model.scene">
              <t-option key="1" label="应用场景(全部)" value="1" />
              <t-option key="2" label="公共服务" value="2" />
              <t-option key="3" label="能源管理" value="3" />
              <t-option key="4" label="气表制造" value="4" />
              <t-option key="5" label="人工智能" value="5" />
            </t-select>
          </t-form-item>

          <t-form-item>
            <t-input v-model="model.search" placeholder="请输入搜索条件">
              <template #suffix-icon>
                <search-icon class="cursor-pointer" />
              </template>
            </t-input>
          </t-form-item>
        </t-form>
        <t-button @click="handleCreateTemplate">新建模板</t-button>
      </div>

      <t-table class="border" row-key="index" :columns="columns" :data="data" :pagination="pagination" :hover="true">
        <template #op="{ row }">
          <div>
            <t-link theme="primary" :underline="false" hover="color">详情</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-popconfirm content="确认删除吗">
              <t-link theme="primary" :underline="false" hover="color">删除</t-link>
            </t-popconfirm>
          </div>
        </template>
      </t-table>
    </t-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchIcon } from 'tdesign-icons-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref(null)

const model = ref({
  industry: '1',
  scene: '1',
  search: '',
})

const columns = [
  { colKey: 'name', title: '名称' },
  { colKey: 'industry', title: '行业类型' },
  { colKey: 'scene', title: '应用场景' },
  { colKey: 'op', title: '操作' },
]

const data = []
const total = 100

const pagination = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  total,
}

for (let i = 0; i < total; i++) {
  data.push({
    index: i,
    name: ['智能井盖', 'WiFi探针采集器', '智能仪表', '环境监测设备'][i % 4],
    industry: ['智慧工业', '智慧城市', '能源电力', '其它行业'][i % 4],
    scene: ['气表制造', '智慧工业', '水务市政', '环境感知'][i % 4],
  })
}

const handleCreateTemplate = () => {
  router.push({
    name: 'templateCreate'
  })
}


</script>

<style scoped></style>