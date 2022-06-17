import Vue from 'vue'
import VueRouter from 'vue-router'
// 라우트 전용 컴포넌트 읽어 들이기
import Dashboad from '@/components/menus/DashboadPage'
import Dance from '@/components/menus/DancePage'
// Vuex와 마찬가지로 플러그인 등록하기
Vue.use(VueRouter)
// VueRouter 인스턴스 생성하기
const router = new VueRouter({
  // URL 경로와 연결할 컴포넌트 맵핑하기
  routes: [
    {
      path: '/',
      component: Dashboad
    },
    {
      path: '/dance',
      component: Dance
    }
  ]
})
//  생성한 VueRouter 인스턴스 익스포트하기
export default router