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
              <t-option key="2" label="智慧园区" value="2" />
              <t-option key="3" label="智慧工业" value="3" />
              <t-option key="3" label="智慧水务" value="4" />
              <t-option key="3" label="智慧城市" value="5" />
            </t-select>
          </t-form-item>

          <t-form-item label="应用场景" name="scene">
            <t-select v-model="model.scene">
              <t-option key="1" label="应用场景(全部)" value="1" />
              <t-option key="2" label="公共服务" value="2" />
              <t-option key="3" label="能源管理" value="3" />
              <t-option key="4" label="气表制造" value="4" />
              <t-option key="5" label="人工智能" value="5" />
            </t-select>
          </t-form-item>

          <t-form-item label="模板名称" name="name">
            <t-input v-model="model.search" placeholder="请输入模板名称" />
          </t-form-item>

          <t-form-item label="模板描述">
            <t-textarea v-model="model.desc" placeholder="请输入模板描述" :autosize="{ minRows: 3, maxRows: 5 }" />
          </t-form-item>
        </t-form>
      </div>

      <t-row class="ml-3 mb-4 mt-8">
        <t-col :span="6" class="flex justify-start">
          <h1 class="font-bold text-[16px]">2. 模板功能</h1>
          <label class="text-gray-500 ml-1 leading-tight">(描述该模板属性/事件/服务信息情况)</label>
        </t-col>

        <t-col :span="6" class="flex justify-end">
          <t-button @click="add">添加</t-button>
        </t-col>
      </t-row>

      <div class="mb-4">1.属性列表</div>
      <t-table class="border" row-key="index" :columns="propertyColumns" :data="properties" :hover="true" size="small">
        <template #op="{ row }">
          <div>
            <t-link theme="primary" :underline="false" hover="color" @click="queryProperty(row)">查看</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-link theme="primary" :underline="false" hover="color" @click="editProperty(row)">编辑</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-popconfirm content="确认删除吗" @confirm="removeProperty(row)">
              <t-link theme="primary" :underline="false" hover="color">删除</t-link>
            </t-popconfirm>
          </div>
        </template>
      </t-table>

      <div class="my-4">2.事件列表</div>
      <t-table class="border" row-key="index" :columns="eventColumns" :data="events" :hover="true" size="small">
        <template #op="{ row }">
          <div>
            <t-link theme="primary" :underline="false" hover="color" @click="queryEvent(row)">查看</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-link theme="primary" :underline="false" hover="color" @click="editEvent(row)">编辑</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-popconfirm content="确认删除吗" @confirm="removeEvent(row)">
              <t-link theme="primary" :underline="false" hover="color">删除</t-link>
            </t-popconfirm>
          </div>
        </template>
      </t-table>

      <div class="my-4">3.服务列表</div>
      <t-table class="border mb-12" row-key="index" :columns="serviceColumns" :data="services" :hover="true" size="small">
        <template #op="{ row }">
          <div>
            <t-link theme="primary" :underline="false" hover="color" @click="queryService(row)">查看</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-link theme="primary" :underline="false" hover="color" @click="editService(row)">编辑</t-link>
            <label class="px-2 text-gray-400">/</label>
            <t-popconfirm content="确认删除吗" @confirm="removeService(row)">
              <t-link theme="primary" :underline="false" hover="color">删除</t-link>
            </t-popconfirm>
          </div>
        </template>
      </t-table>
    </t-card>

    <t-dialog v-model:visible="visible" :header="header" :footer="false" theme="info" :on-close="close" width="650px">
      <template #body>
        <div class="overflow-y-auto h-80">
          <pre>{{ content }}</pre>
        </div>
      </template>
    </t-dialog>

    <Panel ref="panel" @create="create" @update="update" />

    <t-card class="fixed w-full bottom-0 -ml-4" shadow>
      <t-button class="mr-3 ml-3">保存提交</t-button>
      <t-button theme="default">取消</t-button>
    </t-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowLeftIcon, HelpCircleIcon } from 'tdesign-icons-vue-next'
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
  { colKey: 'name', title: '属性名称' },
  { colKey: 'identifier', title: '标识符' },
  { colKey: 'dataType.type', title: '数据类型' },
  {
    colKey: 'accessMode', title: '读写类型', cell: (h, { row }) => {
      return row.accessMode == 'r' ? '只读' : '读写'
    }
  },
  { colKey: 'op', title: '操作', width: '300' },
]

const eventColumns = [
  { colKey: 'name', title: '事件名称' },
  { colKey: 'identifier', title: '标识符' },
  {
    colKey: 'type', title: '事件类型', cell: (h, { row }) => {
      if (row.type == 'info') {
        return '信息'
      } else if (row.type == 'warn') {
        return '警告'
      } else if (row.type == 'error') {
        return '故障'
      }
    }
  },
  { colKey: 'op', title: '操作' },
]

const serviceColumns = [
  { colKey: 'name', title: '服务名称' },
  { colKey: 'identifier', title: '标识符' },
  {
    colKey: 'callType', title: '调用方式', cell: (h, { row }) => {
      if (row.callType == 'sync') {
        return '同步'
      } else {
        return '异步'
      }
    }
  },
  { colKey: 'op', title: '操作' },
]

const panel = ref(null)

const properties = ref([])
const events = ref([])
const services = ref([])

const add = () => {
  panel.value.show(false, properties.value, events.value, services.value)
}

const create = (item) => {
  console.log('create -> ', item)

  if (item.type == 'property') {
    const data = { ...item.item }
    data['accessMode'] = data.dataType.accessMode
    delete data.dataType['accessMode']
    properties.value.push(data)
  } else if (item.type == 'event') {
    const data = { ...item.item }
    events.value.push(data)
  } else if (item.type == 'service') {
    const data = { ...item.item }
    services.value.push(data)
  }
}

const update = (item) => {
  console.log('update -> ', item)

  if (item.type == 'property') {
    let index = 0
    properties.value.forEach((tmp, i) => {
      if (item.identifier == tmp.identifier) {
        index = i
        return
      }
    })

    const data = { ...item.item }
    data['accessMode'] = data.dataType.accessMode
    delete data.dataType['accessMode']

    properties.value.splice(index, 1, data)
  } else if (item.type == 'event') {
    let index = 0
    events.value.forEach((tmp, i) => {
      if (item.identifier == tmp.identifier) {
        index = i
        return
      }
    })
    const data = { ...item.item }
    events.value.splice(index, 1, data)
  } else if (item.type == 'service') {
    let index = 0
    services.value.forEach((tmp, i) => {
      if (item.identifier == tmp.identifier) {
        index = i
        return
      }
    })
    const data = { ...item.item }
    services.value.splice(index, 1, data)
  }
}

const close = () => {
  visible.value = false
}

const visible = ref(false)
const header = ref('')
const content = ref('')

const queryProperty = (row) => {
  visible.value = true
  header.value = '物模型属性描述'

  properties.value.forEach(item => {
    if (row.identifier == item.identifier) {
      content.value = JSON.stringify(item, null, 4)
      return
    }
  })
}

const editProperty = (row) => {
  panel.value.show(true, properties.value, events.value, services.value)
  panel.value.inject('property', row)
}

const removeProperty = (row) => {
  let index = 0
  properties.value.forEach((item, i) => {
    if (row.identifier == item.identifier) {
      index = i
      return
    }
  })
  properties.value.splice(index, 1)
}

const queryEvent = (row) => {
  visible.value = true
  header.value = '物模型事件描述'

  events.value.forEach(item => {
    if (row.identifier == item.identifier) {
      content.value = JSON.stringify(item, null, 4)
      return
    }
  })
}

const editEvent = (row) => {
  panel.value.show(true, properties.value, events.value, services.value)
  panel.value.inject('event', row)
}

const removeEvent = (row) => {
  let index = 0
  events.value.forEach((item, i) => {
    if (row.identifier == item.identifier) {
      index = i
      return
    }
  })
  events.value.splice(index, 1)
}

const queryService = (row) => {
  visible.value = true
  header.value = '物模型服务描述'

  services.value.forEach(item => {
    if (row.identifier == item.identifier) {
      content.value = JSON.stringify(item, null, 4)
      return
    }
  })
}

const editService = (row) => {
  panel.value.show(true, properties.value, events.value, services.value)
  panel.value.inject('service', row)
}

const removeService = (row) => {
  let index = 0
  services.value.forEach((item, i) => {
    if (row.identifier == item.identifier) {
      index = i
      return
    }
  })
  services.value.splice(index, 1)
}

</script>

<style scoped></style>