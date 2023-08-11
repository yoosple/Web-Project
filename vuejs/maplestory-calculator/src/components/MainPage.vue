<template>
    <VueAwesomeSideBar
      v-model:miniMenu="miniMenu"
      v-model:collapsed="collapsed"
      :menu="calculatorMenu"
      vueRouterEnable
    ></VueAwesomeSideBar>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; // Vue Router import 추가
  import Dashboard from './Dashboard.vue';
  import GrowthCalculator from './calculatorMenus/Growth.vue';
  import SymbolCalculator from './calculatorMenus/Symbol.vue';
  
  const router = useRouter(); // Vue Router 사용
  
  const collapsed = ref(false);
  const miniMenu = ref(false);
  
  const calculatorMenu = [
    {
      name: '대시보드',
      href: '/',
      component: Dashboard, // 대시보드 컴포넌트 연결
    },
    {
      name: '계산기',
      children: [
        {
          name: '성장의 비약',
          href: '/growth',
          component: GrowthCalculator, // 성장의 비약 컴포넌트 연결
        },
        {
          name: '심볼 계산기',
          href: '/symbol',
          component: SymbolCalculator, // 심볼 계산기 컴포넌트 연결
        },
      ],
    },
  ];
  </script>