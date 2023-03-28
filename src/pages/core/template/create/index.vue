<template>
  <div>
    <t-card :bordered="false">
      <div class="flex justify-start align-baseline">
        <t-link :underline="false" hover="color" @click="back">
          <arrow-left-icon slot="prefix-icon" size="26px"></arrow-left-icon>
        </t-link>
        <label class="text-xl font-bold ml-2">创建模板</label>
      </div>

      <div class="border border-dashed mt-3 -mx-6"></div>

      <div class="mt-5">
        <div class="flex justify-start ml-3 mb-4">
          <h1 class="font-bold text-[16px]">1. 基本信息</h1>
          <label class="text-gray-500 ml-1 leading-tight">(描述该模板基本信息情况)</label>
        </div>

        <t-form class="mb-4" ref="form" :rules="rules" :data="model">
            <t-form-item label="行业类型" name="industry">
              <t-select v-model="model.industry">
                <t-option key="1" label="行业类型(全部)" value="1" />
                <t-option key="2" label="智慧园区" value="2"/>
                <t-option key="3" label="智慧工业" value="3" />
                <t-option key="3" label="智慧水务" value="4" />
                <t-option key="3" label="智慧城市" value="5" />
              </t-select>
            </t-form-item>

            <t-form-item label="应用场景" name="scene">
              <t-select v-model="model.scene">
                <t-option key="1" label="应用场景(全部)" value="1" />
                <t-option key="2" label="公共服务" value="2"/>
                <t-option key="3" label="能源管理" value="3" />
                <t-option key="4" label="气表制造" value="4" />
                <t-option key="5" label="人工智能" value="5" />
              </t-select>
            </t-form-item>

            <t-form-item label="模板名称" name="name">
              <t-input v-model="model.search" placeholder="请输入模板名称" />
            </t-form-item>

            <t-form-item label="模板描述">
              <t-textarea
                v-model="model.desc"
                placeholder="请输入模板描述"
                :autosize="{ minRows: 3, maxRows: 5 }"
              />
            </t-form-item>
          </t-form>
      </div>
      
      <t-row class="ml-3 mb-4 mt-8">
        <t-col :span="6" class="flex justify-start">
          <h1 class="font-bold text-[16px]">2. 模板功能</h1>
          <label class="text-gray-500 ml-1 leading-tight">(描述该模板属性信息情况)</label>
        </t-col>

        <t-col :span="6" class="flex justify-end">
          <t-button @click="add">添加</t-button>
        </t-col>
      </t-row>

      <div class="mb-4">1.属性列表</div>
      <t-table class="border" row-key="index" :columns="propertyColumns" :hover="true" size="small">
        <template #op="{row}">
          <div>
            <t-link theme="primary" :underline="false" hover="color">查看</t-link>
            <t-link theme="primary" :underline="false" hover="color">编辑</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-popconfirm content="确认删除吗">
              <t-link theme="primary" :underline="false" hover="color">删除</t-link>
            </t-popconfirm>
          </div>
        </template>
      </t-table>

      <div class="my-4">2.事件列表</div>
      <t-table class="border" row-key="index" :columns="eventColumns" :hover="true" size="small">
        <template #op="{row}">
          <div>
            <t-link theme="primary" :underline="false" hover="color">查看</t-link>
            <t-link theme="primary" :underline="false" hover="color">编辑</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-popconfirm content="确认删除吗">
              <t-link theme="primary" :underline="false" hover="color">删除</t-link>
            </t-popconfirm>
          </div>
        </template>
      </t-table>

      <div class="my-4">3.服务列表</div>
      <t-table class="border mb-12" row-key="index" :columns="serviceColumns" :hover="true" size="small">
        <template #op="{row}">
          <div>
            <t-link theme="primary" :underline="false" hover="color">查看</t-link>
            <t-link theme="primary" :underline="false" hover="color">编辑</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-popconfirm content="确认删除吗">
              <t-link theme="primary" :underline="false" hover="color">删除</t-link>
            </t-popconfirm>
          </div>
        </template>
      </t-table>
    </t-card>

    <Panel ref="panel"/>

    <t-card class="fixed w-full bottom-0 -ml-4" shadow>
      <t-button class="mr-3 ml-3">保存提交</t-button>
      <t-button theme="default">取消</t-button>
    </t-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowLeftIcon } from 'tdesign-icons-vue-next'
import { useRouter } from 'vue-router'
import Panel from './components/Panel.vue'

const router = useRouter()

const back = () => {
  router.back()
}

const form = ref(null)

const model = ref({
  industry: '',
  scene: '',
  name: '',
  desc: ''
})

const rules = {
  industry: [
    { required: true, message: '行业类型必填', type: 'error', trigger: 'blur' },
  ],
  scene: [
    { required: true, message: '应用场景必填', type: 'error', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '模板名称必填', type: 'error', trigger: 'blur' },
  ],
}

const propertyColumns = [
  { colKey: 'name', title: '功能名称' },
  { colKey: 'identifier', title: '标识符' },
  { colKey: 'type', title: '数据类型	' },
  { colKey: 'accessMode', title: '读写类型		' },
  { colKey: 'op', title: '操作' },
]

const eventColumns = [
  { colKey: 'name', title: '功能名称' },
  { colKey: 'identifier', title: '标识符' },
  { colKey: 'type', title: '事件类型	' },
  { colKey: 'op', title: '操作' },
]

const serviceColumns = [
  { colKey: 'name', title: '功能名称' },
  { colKey: 'identifier', title: '标识符' },
  { colKey: 'method', title: '调用方式	' },
  { colKey: 'op', title: '操作' },
]

const panel = ref(null)

const add = () => {
  panel.value.show()
}

</script>

<style scoped>

</style>