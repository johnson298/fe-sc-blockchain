// import Vue
import Vue from 'vue';

// Lazy load components
const components = {
  ERC: () => import('@/components/common/ERC'),
  LabelTooltip: () => import('@/components/common/LabelTooltip'),
  NumberInput: () => import('@/components/common/NumberInput'),
  'v-upload': () => import('@/components/common/VUpload'),
  'TransactionSetting': () => import('@/components/common/TransactionSetting'),
  'NetworkFail': () => import('@/components/common/NetworkFail'),
  'SelectNetwork': () => import('@/components/common/SelectNetwork'),
  'FileUpload': () => import('@/components/common/FileUpload'),
}

Object.entries(components).forEach(([name, component]) => Vue.component(name, component));
