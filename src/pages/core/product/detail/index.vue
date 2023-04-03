<template>
  <div>
    <t-card :bordered="false">
      <div class="flex justify-between">
        <t-link :underline="false" hover="color" @click="back">
          <arrow-left-icon slot="prefix-icon" size="26px"></arrow-left-icon>
          <span class="text-xl font-bold ml-2">威傲流量计</span>
        </t-link>
        <t-link theme="primary" :underline="false" hover="color">编辑产品</t-link>
      </div>

      <div class="border border-dashed my-4 -mx-6"></div>

      <div>
        <t-row>
          <t-col :span="3">
            <span class="text-gray-400">产品ID:</span>
            <span class="ml-7">MSNoWK1vIo</span>
          </t-col>
          <t-col :span="3">
            <span class="text-gray-400">节点类型:</span>
            <span class="ml-4">直连设备</span>
          </t-col>
          <t-col :span="3">
            <span class="text-gray-400">联网方式:</span>
            <span class="ml-4">以太网</span>
          </t-col>
          <t-col :span="3">
            <span class="text-gray-400">接入协议:</span>
            <span class="ml-4">MQTT</span>
          </t-col>
        </t-row>
        <t-row class="mt-3">
          <t-col :span="3">
            <span class="text-gray-400">数据协议:</span>
            <span class="ml-4">JSON</span>
          </t-col>
          <t-col :span="3">
            <span class="text-gray-400">产品类型:</span>
            <span class="ml-4">智慧水务/市政路网</span>
          </t-col>
          <t-col :span="3">
            <span class="text-gray-400">设备数量:</span>
            <span class="ml-4">32</span>
          </t-col>
          <t-col :span="3">
            <span class="text-gray-400">创建时间:</span>
            <span class="ml-4">2023-03-31 16:02:31</span>
          </t-col>
        </t-row>
        <t-row class="mt-3">
          <t-col :span="4">
            <span class="text-gray-400">产品密钥:</span>
            <span class="ml-4">oiIzlbCsm1vAJ5QS+vBsYoIgxViRs191UYIhOlLekcI=
            </span>
            <t-link theme="primary" :underline="false" hover="color" class="ml-2 text-[10px]">复制</t-link>
          </t-col>
        </t-row>
      </div>

    </t-card>

    <div class="mt-4 bg-white pb-2">
      <t-tabs :default-value="1" class="m-4">
        <t-tab-panel :value="1" label="物模板">
          <Feature />
        </t-tab-panel>
        <t-tab-panel :value="2" label="通讯Topic">
          <Topic />
        </t-tab-panel>
        <t-tab-panel :value="3" label="数据解析">
          <p style="margin: 20px">选项卡3内容区</p>
        </t-tab-panel>
      </t-tabs>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeftIcon } from 'tdesign-icons-vue-next'
import Topic from './components/Topic.vue'
import Feature from './components/Feature.vue'

const router = useRouter()

const back = () => {
  router.back()
}
</script>

<style scoped></style>