<template>
    <VueAwesomeSideBar v-model:miniMenu="miniMenu" v-model:collapsed="collapsed" v-model:keepChildrenOpen="keepChildrenOpen" :menu="calculatorMenu" vueRouterEnabel>
        <template v-slot:menu="{ menu, onItemClick }">
            <ul>
                <li v-for="(item, index) in menu" :key="index">
                    <router-link :to="{ name: item.name }" @click="onItemClick(index)">
                        {{ item.name }}
                    </router-link>
                    <ul v-if="item.children">
                        <li v-for="(childItem, childIndex) in item.children" :key="childIndex">
                            <router-link :to="{ name: childItem.name }" @click="onItemClick(childIndex)">
                                {{ childItem.name }}
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </template>
    </VueAwesomeSideBar>
</template>
  
<script setup>
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router' // Vue Router의 createRouter와 createWebHistory 가져오기
import home from './Dashboard.vue'
import seongbi from './calculatorMenus/Growth.vue'
import symbol from './calculatorMenus/Symbol.vue'

const collapsed = ref(false)
const miniMenu = ref(false)
const keepChildrenOpen = ref(false)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', name: '대시보드', component: home },
    { path: '/seongbi', name: '성장의 비약', component: seongbi },
    { path: '/symbol', name: '심볼 계산기', component: symbol },
  ]
})

const calculatorMenu = [
    {
        name: '대시보드',
        component: home
    },
    {
        name: '계산기',
        children: [
            {
                name: '성장의 비약',
                component: seongbi,
            },
            {
                name: '심볼 계산기',
                component: symbol,
            },
        ]
    },
]
</script>