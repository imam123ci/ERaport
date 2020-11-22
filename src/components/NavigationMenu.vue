<!-- This component contain side navigation menu, always show up on application -->

<!-- Always use scoped style for each component-->
<style scoped>
   
    .user-navbar{
        margin-top: 100px;
        z-index: 10;
    }

    .user-nopad{
      margin-bottom: 0;
    }
</style>

<template>

      <v-navigation-drawer
          v-bind:expand-on-hover="true"
          v-bind:mini-variant="true"
          permanent="permanent"
          :absolute="true"
        >
          <v-list
            dense
            nav
            class="py-0 user-navbar"
          >
            
            <v-divider></v-divider>
            <!-- List of all menu-->
            <!-- v-bind for change active menu, v-on when menu is clicked-->
            <!-- Icon name based on material icon -->


            <!-- Dashboard Menu -->
            <v-list-item v-bind:class="{'deep-orange accent-3':Activemenu[1]}" v-on:click="chooseMenu(1)">
              <v-list-item-icon>
                <v-icon>dashboard</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content > 
                <v-list-item-title > <h3 class = "font-weight-medium"  >Dashboard </h3></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item-title>
              <p class="user-nopad overline">Input Data</p>
            </v-list-item-title>
            <!-- Input Data Dasar -->
            <v-list-item v-bind:class="{'deep-orange accent-3':Activemenu[2]}" v-on:click="chooseMenu(2)">
              <v-list-item-icon>
                <v-icon>input</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content > 
                <v-list-item-title > <h3 class = "font-weight-medium"  >Input Data Dasar </h3></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!-- Input Data Pelajaran -->
            <v-list-item v-bind:class="{'deep-orange accent-3':Activemenu[3]}" v-on:click="chooseMenu(3)">
              <v-list-item-icon>
                <v-icon>class</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content > 
                <v-list-item-title > <h3 class = "font-weight-medium"  >Input Kompetensi Dasar </h3></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!-- Input Data Peserta -->
            <v-list-item v-bind:class="{'deep-orange accent-3':Activemenu[4]}" v-on:click="chooseMenu(4)">
              <v-list-item-icon>
                <v-icon>school</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content > 
                <v-list-item-title > <h3 class = "font-weight-medium"  >Input Peserta Didik </h3></v-list-item-title>
              </v-list-item-content>
            </v-list-item>


            <!-- Input Nilai Menu -->
            <v-list-item-title>
              <p class="user-nopad overline">Input Nilai</p>
            </v-list-item-title>

            <v-list-item v-bind:class="{'deep-orange accent-3':Activemenu[5]}" v-on:click="chooseMenu(5)">
              <v-list-item-icon>
                <v-icon>format_list_numbered</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content > 
                <v-list-item-title > <h3 class = "font-weight-medium">Input Nilai Pengetahuan</h3></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-bind:class="{'deep-orange accent-3':Activemenu[6]}" v-on:click="chooseMenu(6)">
              <v-list-item-icon>
                <v-icon>format_list_numbered</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content > 
                <v-list-item-title > <h3 class = "font-weight-medium">Input Nilai Keterampilan</h3></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-bind:class="{'deep-orange accent-3':Activemenu[7]}" v-on:click="chooseMenu(7)">
              <v-list-item-icon>
                <v-icon>format_list_numbered</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content > 
                <v-list-item-title > <h3 class = "font-weight-medium">Input Nilai Sikap</h3></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item-title>
              <p class="user-nopad overline">Output Data</p>
            </v-list-item-title>
            <!-- Output Menu -->
            <v-list-item v-bind:class="{'deep-orange accent-3':Activemenu[8]}" v-on:click="chooseMenu(8)">
              <v-list-item-icon>
                <v-icon>history_edu</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content > 
                <v-list-item-title > <h3 class = "font-weight-medium">Jilid & Identitas</h3></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          <v-list-item v-bind:class="{'deep-orange accent-3':Activemenu[9]}" v-on:click="chooseMenu(9)">
              <v-list-item-icon>
                <v-icon>history_edu</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content > 
                <v-list-item-title > <h3 class = "font-weight-medium">Raport Semester</h3></v-list-item-title>
              </v-list-item-content>
          </v-list-item>

          <v-list-item-title>
            <p class="user-nopad overline">Setting / Pengaturan</p>
          </v-list-item-title>
          
          <v-list-item v-bind:class="{'deep-orange accent-3':Activemenu[10]}" v-on:click="chooseMenu(10)">
              <v-list-item-icon>
                <v-icon>settings</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content > 
                <v-list-item-title > <h3 class = "font-weight-medium">Backup Restore Reset</h3></v-list-item-title>
              </v-list-item-content>
              
          </v-list-item>

          <!-- <v-list-item v-bind:class="{'deep-orange accent-3':Activemenu[11]}" v-on:click="chooseMenu(11)">
              <v-list-item-icon>
                <v-icon>settings</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content > 
                <v-list-item-title > <h3 class = "font-weight-medium">Server Setting</h3></v-list-item-title>
              </v-list-item-content>
              
          </v-list-item> -->

          </v-list>
        </v-navigation-drawer>
</template>



<script>
  // import bus here
  import {Bus} from '../main'

  export default {
    name: 'NavigationMenu',
     data () {
      return {
        //variable for menu acsent
        Activemenu : [false,false,false,false,false,false,false,false,false,false]
      }
    },
    methods: {
      //function to change menu
      chooseMenu : function(p){
          this.Activemenu =  [false,false,false,false,false,false,false,false,false,false];
          this.Activemenu[p] = true;
          // use event bus
          Bus.$emit('chooseMenu', p);
      }
    },
    
  }
</script>



