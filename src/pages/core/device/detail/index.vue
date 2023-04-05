<template>
  <div>
    <t-card :bordered="false">
      <div class="flex justify-between">
        <t-link :underline="false" hover="color" @click="back">
          <arrow-left-icon slot="prefix-icon" size="26px"></arrow-left-icon>
          <span class="text-xl font-bold ml-2">测试终端智能设备</span>
        </t-link>
        <t-link theme="primary" :underline="false" hover="color">编辑设备</t-link>
      </div>

      <div class="border border-dashed my-4 -mx-6"></div>

      <div>
        <t-row>
          <t-col :span="3">
            <span class="text-gray-400">设备ID:</span>
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
            <span class="text-gray-400">所属产品:</span>
            <span class="ml-4">威傲流量计</span>
            <t-link theme="primary" :underline="false" hover="color" class="ml-2 text-[10px]">详情</t-link>
          </t-col>
          <t-col :span="3">
            <span class="text-gray-400">IP地址:</span>
            <span class="ml-7">192.168.0.102</span>
          </t-col>
          <t-col :span="3">
            <span class="text-gray-400">设备状态:</span>
            <div class="ml-4 inline-block">
              <div class="rounded-full w-2 h-2 bg-green-600 inline-block"></div>
              <label class="ml-1">在线</label>
            </div>
          </t-col>
        </t-row>
        <t-row class="mt-3">
          <t-col :span="3">
            <span class="text-gray-400">创建时间:</span>
            <span class="ml-4">2023-03-31 16:02:31</span>
          </t-col>
          <t-col :span="3">
            <span class="text-gray-400">最后时间:</span>
            <span class="ml-4">2023-03-31 16:02:31</span>
          </t-col>
          <t-col :span="3">
            <span class="text-gray-400">激活时间:</span>
            <span class="ml-4">2023-03-31 16:02:31</span>
          </t-col>
        </t-row>
        <t-row class="mt-3">
          <t-col :span="4">
            <span class="text-gray-400">设备地址:</span>
            <span class="ml-4">上海市长宁区建韬广场3号楼B2停车场3区
            </span>
            <t-link theme="primary" :underline="false" hover="color" class="ml-2 text-[10px]">查看地图</t-link>
          </t-col>
        </t-row>
        <t-row class="mt-3">
          <t-col :span="4">
            <span class="text-gray-400">设备密钥:</span>
            <span class="ml-4">oiIzlbCsm1vAJ5QS+vBsYoIgxViRs191UYIhOlLekcI=
            </span>
            <t-link theme="primary" :underline="false" hover="color" class="ml-2 text-[10px]">复制</t-link>
          </t-col>
        </t-row>
      </div>

    </t-card>

    <div class="mt-4 bg-white pb-2">
      <t-tabs :default-value="1" class="m-4">
        <t-tab-panel :value="1" label="属性">
          <t-row :gutter="24">
            <t-col :span="3">
              <t-card shadow class="my-2">
                <div class="flex justify-between">
                  <span>温度</span>
                  <span class="text-gray-600">历史数据</span>
                </div>
                <div class="text-2xl font-bold my-3">
                  36.7 °C
                </div>
                <div class="text-gray-500">
                  <span class="border-r mr-2 pr-2">-</span>
                  <span class="border-r mr-2 pr-2">float</span>
                  <span class="border-r mr-2 pr-2">只读</span>
                </div>
              </t-card>
            </t-col>
            <t-col :span="3">
              <t-card shadow class="my-2">
                <div class="flex justify-between">
                  <span>湿度</span>
                  <span class="text-gray-600">历史数据</span>
                </div>
                <div class="text-2xl font-bold my-3">
                  58 %
                </div>
                <div class="text-gray-500">
                  <span class="border-r mr-2 pr-2">-</span>
                  <span class="border-r mr-2 pr-2">float</span>
                  <span class="border-r mr-2 pr-2">只读</span>
                </div>
              </t-card>
            </t-col>
            <t-col :span="3">
              <t-card shadow class="my-2">
                <div class="flex">
                  <span>灯泡开关</span>
                  <span class="text-gray-600">历史数据</span>
                </div>
                <div class="text-2xl font-bold my-3">
                  <t-switch id="foo" />
                </div>
                <div class="text-gray-500">
                  <span class="border-r mr-2 pr-2">-</span>
                  <span class="border-r mr-2 pr-2">bool</span>
                  <span class="border-r mr-2 pr-2">读写</span>
                </div>
              </t-card>
            </t-col>
            <t-col :span="3">
              <t-card shadow class="my-2">
                <div class="flex justify-between">
                  <span>设备电压</span>
                  <span class="text-gray-600">历史数据</span>
                </div>
                <div class="text-2xl font-bold my-3">
                  943.2 V
                </div>
                <div class="text-gray-500">
                  <span class="border-r mr-2 pr-2">-</span>
                  <span class="border-r mr-2 pr-2">float</span>
                  <span class="border-r mr-2 pr-2">只读</span>
                </div>
              </t-card>
            </t-col>
            <t-col :span="3">
              <t-card shadow class="my-2">
                <div class="flex justify-between">
                  <span>仪器转速</span>
                  <span class="text-gray-600">历史数据</span>
                </div>
                <div class="text-2xl font-bold my-3">
                  731 r/s
                </div>
                <div class="text-gray-500">
                  <span class="border-r mr-2 pr-2">-</span>
                  <span class="border-r mr-2 pr-2">int</span>
                  <span class="border-r mr-2 pr-2">只读</span>
                </div>
              </t-card>
            </t-col>
          </t-row>
        </t-tab-panel>
        <t-tab-panel :value="2" label="事件记录">
        </t-tab-panel>
        <t-tab-panel :value="3" label="服务记录">
        </t-tab-panel>
      </t-tabs>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeftIcon } from 'tdesign-icons-vue-next'

const router = useRouter()

const back = () => {
  router.back()
}
</script>

<style scoped></style>