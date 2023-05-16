<template>
  <div id="main">
    <nav v-bind:class="active" v-on:click.prevent>
      <a href="#" class="dashboad" v-on:click="makeActive('dashboad')">대시보드</a>
      <a href="#" class="eagle" v-on:click="makeActive('eagle')">움직이는 공 맞추기</a>
      <a href="#" class="dance" v-on:click="makeActive('dance')">화살표 방향 누르기</a>
      <a href="#" class="treasure" v-on:click="makeActive('treasure')">보물받기</a>
      <a href="#" class="dragon" v-on:click="makeActive('dragon')">드래곤 알 차지</a>
      <a href="#" class="seed" v-on:click="makeActive('seed')">시드맵</a>
    </nav>     
    
    <div v-if="active == 'dashboad'">
      <Dashboad />
    </div>
     <div v-else-if="active == 'eagle'">
      <Eagle />
    </div>
     <div v-else-if="active == 'dance'">
      <Dance />
    </div>
     <div v-else-if="active == 'treasure'">
      <Treasure />
    </div>
     <div v-else-if="active == 'dragon'">
      <Dragon />
    </div>
     <div v-else>
      <Seed />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Dashboad from './menus/DashboadPage.vue'
import Eagle from './menus/EaglePage.vue'
import Dance from './menus/DancePage.vue'
import Treasure from './menus/TreasurePage.vue'
import Dragon from './menus/DragonPage.vue'
import Seed from './menus/SeedPage.vue'

export default {
  el: '#main',
  data () {
    return {
      active: 'dashboad'
    }
  },
  components: {
    Dashboad, Eagle, Dance, Treasure, Dragon, Seed
  },
  methods: {
    makeActive: function(item){
      this.active = item;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin:0;
  padding:0;
}

body{
  font:15px/1.3 'Open Sans', sans-serif;
  color: #5e5b64;
  text-align:center;
}

a, a:visited {
  outline:none;
  color:#389dc1;
}

a:hover{
  text-decoration:none;
}

section, footer, header, aside, nav{
  display: block;
}

/*-------------------------
  The menu
--------------------------*/

nav{
  display:inline-block;
  margin:60px auto 45px;
  background-color:#5597b4;
  box-shadow:0 1px 1px #ccc;
  border-radius:2px;
}

nav a{
  display:inline-block;
  padding: 18px 30px;
  color:#fff !important;
  font-weight:bold;
  font-size:16px;
  text-decoration:none !important;
  line-height:1;
  text-transform: uppercase;
  background-color:transparent;

  -webkit-transition:background-color 0.25s;
  -moz-transition:background-color 0.25s;
  transition:background-color 0.25s;
}

nav a:first-child{
  border-radius:2px 0 0 2px;
}

nav a:last-child{
  border-radius:0 2px 2px 0;
}

nav.dashboad .dashboad,
nav.eagle .eagle,
nav.dance .dance,
nav.treasure .treasure,
nav.dragon .dragon,
nav.seed .seed{
  background-color:#e35885;
}

p{
  font-size:22px;
  font-weight:bold;
  color:#7d9098;
}

p b{
  color:#ffffff;
  display:inline-block;
  padding:5px 10px;
  background-color:#c4d7e0;
  border-radius:2px;
  text-transform:uppercase;
  font-size:18px;
}
.resource {
  margin: 20px 0;
}
</style>
