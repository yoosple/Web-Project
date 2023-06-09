<template>
  <div id="main">
    <nav v-bind:class="active" v-on:click.prevent>
      <a href="#" class="dashboad" v-on:click="makeActive('dashboad')">대시보드</a>
      <a href="#" class="maplestory" v-on:click="makeActive('maplestory')">메이플스토리 게임들</a>
      <a href="#" class="others" v-on:click="makeActive('others')">기타 게임들</a>
    </nav>     
    
    <div v-if="active == 'dashboad'">
      <Dashboad />
    </div>
    <div v-else-if="active == 'maplestory'">
      <Maplestory />
    </div>
     <div v-else>
      <Others />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Dashboad from './menus/dashboard.vue'
import Maplestory from './menus/maplestory.vue'
import Others from './menus/others.vue'

export default {
  el: '#main',
  data () {
    return {
      active: 'dashboad'
    }
  },
  components: {
    Dashboad, Maplestory, Others
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
nav.maplestory .maplestory,
nav.others .others{
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
