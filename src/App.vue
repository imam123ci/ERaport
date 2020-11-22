<!-- Always use scoped style for each component-->
<style src="../node_modules/handsontable/dist/handsontable.full.css"></style>

<style scoped>
  .user-main{
    margin-left: 50px;
  }

  .user-nm {
    z-index: 1000 !important;
    position: absolute !important;
  }
 
</style>
<template>
  <v-app>
    <!-- Navigation Menu located on Components folder-->
    <NavigationMenu class="user-nm"/>
    <v-main class="grey lighten-3 user-main">
      <!-- Using v-if to show component (varible is ChooseMenu)-->
      <Home v-if="ChooseMenu==1"/>
      <InputData v-else-if="ChooseMenu==2"/>
      <InputKd v-else-if="ChooseMenu==3"/>
      <InputSiswa v-else-if="ChooseMenu==4"/>
      <InputNilaiPengetahuan v-else-if="ChooseMenu==5"/>
      <InputNilaiKeterampilan v-else-if="ChooseMenu==6"/>
      <InputNilaiSikap v-else-if="ChooseMenu==7"/>
      <OutputSampul v-else-if="ChooseMenu==8" />
      <OutputRaport v-else-if="ChooseMenu==9" />
      <SettingBRR v-else-if="ChooseMenu==10" />
    </v-main>
  </v-app>
</template>

<script>
//import component here
import NavigationMenu from './components/NavigationMenu'
import Home from './pages/Home';
import InputData from './pages/InputData';
import InputKd from './pages/InputKd';
import InputSiswa from './pages/InputSiswa';
import InputNilaiSikap from './pages/InputNilaiSikap';
import InputNilaiPengetahuan from './pages/InputNilaiPengetahuan';
import InputNilaiKeterampilan from './pages/InputNilaiKeterampilan';
import OutputSampul from './pages/OutputSampul';
import OutputRaport from './pages/OutputRaport';
import SettingBRR from './pages/SettingBRR';

// Import bus from main.js
import {Bus}   from './main';
export default {
  name: 'App',

  // list of all component
  components: {
    NavigationMenu,
    Home,
    InputData,
    InputKd,
    InputSiswa,
    InputNilaiSikap,
    InputNilaiPengetahuan,
    InputNilaiKeterampilan,
    OutputSampul,
    OutputRaport,
    SettingBRR
  },

  // store data here
  data: () => ({
    ChooseMenu: 1,
  }),

  methods: {
  },

  // bus here, see vue event lifecycle 
  created(){
     Bus.$on('chooseMenu', (data) => {
      console.log(data);
      this.ChooseMenu = data;
    });
    

  }
};
</script>
