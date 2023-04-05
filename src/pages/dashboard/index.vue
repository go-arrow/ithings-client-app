<template>
  <div>
    <div class="flex">
      <div class="w-3/4">
        <div class="shadow my-4 h-[160px] bg-white p-4 mr-4">
          <div class="flex justify-between">
            <div class="text-[16px] font-bold">平台概览</div>
            <t-button shape="circle" theme="default">
              <template #icon> <refresh-icon /></template>
            </t-button>
          </div>

          <t-row class="mt-6">
            <t-col :span="2" class="border-r">
              <div class="text-gray-400">产品数</div>
              <div class="text-2xl font-bold mt-2">23</div>
            </t-col>
            <t-col :span="2" class="border-r ml-6">
              <div class="text-gray-400">设备数</div>
              <div class="text-2xl font-bold mt-2">141</div>
            </t-col>
            <t-col :span="2" class="border-r ml-6">
              <div class="text-gray-400">
                <div class="rounded-full w-2 h-2 bg-green-500 inline-block mr-1"></div>在线设备数
              </div>
              <div class="text-2xl font-bold mt-2">98</div>
            </t-col>
            <t-col :span="2" class="ml-4 border-r ml-6">
              <div class="text-gray-400">昨日API调用数</div>
              <div class="text-2xl font-bold mt-2">2523
                <arrow-up-icon style="color: green" size="15px" />
              </div>
            </t-col>
            <t-col :span="2" class="ml-6">
              <div class="text-gray-400">昨日消息数</div>
              <div class="text-2xl font-bold mt-2">8743
                <arrow-down-icon style="color: red" size="15px" />
              </div>
            </t-col>
          </t-row>
        </div>
        <div class="shadow my-4 h-[496px] bg-white p-4 mr-4">
          <div class="text-[16px] font-bold">核心流程指南</div>
          <img src="@/assets/flow.png" class="mt-10" alt="">

          <div class="border p-4 mt-5">
            <div class="flex">
              <div class="text-[15px] font-bold mr-2">创建产品</div>
              <t-link theme="primary">前往></t-link>
            </div>
            <div class="text-gray-600">这是设备接入的第一步，产品为同种设备类型，产品下的设备拥有相同的物模型（功能）、数据格式、远程升级。</div>
          </div>

          <t-button class="mt-4">前往创建产品</t-button>
        </div>
      </div>

      <div class="w-1/4">
        <div class="shadow my-4 h-[400px] bg-white p-4">
          <div class="text-[16px] font-bold">事件通知</div>
          <div class="mt-6">
            <div>1. 产品设备异常故障事件告警</div>
            <div class="text-[13px] text-gray-400 mt-1">2023年03月06日</div>
          </div>
          <div class="mt-6">
            <div>2. 云南水厂PLC网络访问连接异常处置</div>
            <div class="text-[13px] text-gray-400 mt-1">2023年03月05日</div>
          </div>
          <div class="mt-6">
            <div>3. 服务器平台域名解析到期通知</div>
            <div class="text-[13px] text-gray-400 mt-1">2023年03月03日</div>
          </div>
          <div class="mt-6">
            <div>4. 参与平台的调查与分析</div>
            <div class="text-[13px] text-gray-400 mt-1">2023年03月01日</div>
          </div>
          <div class="mt-6">
            <div>5. 物联网最新边缘计算网关试用</div>
            <div class="text-[13px] text-gray-400 mt-1">2023年02月06日</div>
          </div>
        </div>

        <div class="bg-white w-full h-[240px]">
          <img src="@/assets/q.png" width="80%" alt="">
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
import { ArrowUpIcon, ArrowDownIcon, RefreshIcon } from 'tdesign-icons-vue-next'
</script>

<style scoped></style>