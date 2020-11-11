<!-- This component contain dashboard Menu (No 1) -->
<style scoped>
    
</style>

<template>
  <v-container>

    <v-card 
        class="white"
        :loading="UI.loading"
    >
        <v-card-title class="pa-4">
            <h2>Input Kompetensi Dasar</h2>
        </v-card-title>
         
        <v-card-subtitle>
            Masukan data-data dasar seperti indentitas sekolah, identitas kelas, identitas kepala sekolah
            , identitas guru, dan daftar pelajaran.
        </v-card-subtitle>
        <v-card-actions>
            <v-row>
                <v-col>
                    <v-btn class="ma-1" color="blue lighten-2" @click="console.log('test');"> 
                        <v-icon left>
                        refresh
                        </v-icon>Refresh 
                    </v-btn>
                    <v-btn class="ma-2"> 
                        <v-icon left>
                        vertical_align_top
                        </v-icon>Export 
                    </v-btn>
                    <v-btn class="ma-2"> 
                        <v-icon left>
                        vertical_align_bottom
                        </v-icon>Import
                    </v-btn>
                    
                                   
                </v-col>
                <v-col align="right">
                    <v-btn class="ma-1" color="green lighten-1" @click="saveKd()"> 
                        <v-icon left>
                        save
                        </v-icon>
                        Save All
                    </v-btn>
                    <v-btn class="ma-1" color="red lighten-1"> 
                        <v-icon left>
                        delete
                        </v-icon>
                        Reset All
                    </v-btn> 
                </v-col>
            </v-row>

        </v-card-actions>
    </v-card>

    <v-spacer class="ma-5"></v-spacer>

    <v-card
        class="white"
    >
         <v-form>
            <v-card-text>
              <p>Masukan kelas, pelajaran, dan tipe KD yang akan dimasukan </p> 
              <v-row>
                <v-col cols="3">
                    <v-select
                        :items="UI.SelectKelas"
                        label="Kelas"
                        v-model="UI.SelectedKelas"
                        @change="getPelajaran()"
                        style="z-index:900"
                    >
                    </v-select>
                </v-col>
                <v-col cols="4">  
                    <v-select
                        :items="UI.SelectPelajaran"
                        label="Pelajaran"
                        solo
                        v-model="UI.SelectedPelajaran"
                        style="z-index:900"
                        @change="getKd()"
                    >
                    </v-select>

                </v-col >
                <v-col cols="4">  
                    <v-select
                        :items="UI.SelectTipe"
                        label="Tipe"
                        solo
                        v-model="UI.SelectedTipe"
                        style="z-index:900"
                        @change="getKd()"
                    >
                    </v-select>

                </v-col>
                <v-col cols="1">
                    <v-btn fab @click="getKd()">
                        <v-icon>
                            navigate_next
                        </v-icon>
                    </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
         </v-form>
    </v-card>

    <v-spacer class="ma-5"></v-spacer>

    <v-card>
        <v-container>
            <v-btn class="ma-0">Tambah</v-btn>
            <v-spacer class="ma-3"></v-spacer>
            <hot-table ref="tblKd" :settings="tableKD"></hot-table>
        </v-container>
        
    </v-card>
    

    <v-snackbar
      v-model="snackbar.status"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script>
  import { HotTable } from '@handsontable/vue';
  export default {
    name: 'InputKd',
    components: {
      HotTable
    },
    data: () => ({
        snackbar : {
            status : false,
            timeout : 1000,
            text : ""
        },
        UI : {
            loading:false,
            SelectPelajaran : [],
            SelectedPelajaran : "kelas1",
            SelectKelas : ["kelas1","kelas2","kelas3","kelas4","kelas5","kelas6"],
            SelectedKelas : "",
            SelectTipe : ['pengetahuan','keterampilan'],
            SelectedTipe : "",
        },

        KD : {
            Pengetahuan : {},
            Keterampilan : {},
        },

        dataKd : [{
            _id:"",
            kelas:"",
            pelajaran:"",
            tipe:"",
            kdId:"",
            kd:""
        }],
         
    }),
    methods: {
        getPelajaran(){
            this.UI.loading = true;
            this.PelajaranDB.find( 
                {[this.UI.SelectedKelas] : true},   
                (err,docs) => {
                    if(err){
                        console.log("err" + err);
                    }

                    this.UI.SelectPelajaran = [];
                    for(let i in docs){
                        this.UI.SelectPelajaran.push(docs[i]['pelajaran'])
                    }
            })
            this.getKd();

            this.UI.loading = false;
        },
        getKd(){
            this.UI.loading = true;
            let kelas = this.UI.SelectedKelas
            let pelajaran = this.UI.SelectedPelajaran;
            let tipe = this.UI.SelectedTipe;
            if(kelas == "" || pelajaran == "" || tipe == ""){
                console.log("kosong");
                this.UI.loading = false;
                return;
            }
            this.dataKd = [];
            this.KdDB.find(
                {$and: [{kelas:kelas},{pelajaran:pelajaran},{tipe:tipe}]},
                (err,docs) =>{
                   if(err){
                        console.log("err" + err);
                        return;
                    }
                    if(docs.length > 0){
                        this.dataKd = docs;    
                    }else{
                        this.dataKd.push({
                            kdId:"",
                            kd:""
                        });
                    }

                    this.$refs.tblKd.hotInstance.loadData(this.dataKd);

                }
            )
            this.UI.loading = false;
        },
        saveKd(){
            this.UI.loading = true;
            let kelas = this.UI.SelectedKelas
            let pelajaran = this.UI.SelectedPelajaran;
            let tipe = this.UI.SelectedTipe;

            // delete all data first
            this.KdDB.remove(
                {$and: [{kelas:kelas},{pelajaran:pelajaran},{tipe:tipe}]},
                {multi:true},
                 (err)=>{
                     if(err){
                        console.log(err);
                        return;
                     }
                 }
            )

            // insert all data
            this.dataKd.map((k)=>{
                delete k._id;
                k.kelas = kelas;
                k.pelajaran = pelajaran;
                k.tipe = tipe;
            });

            this.KdDB.insert(
                this.dataKd,
                (err)=>{
                    if(err){
                        console.log("err" +err);
                    }
                }
            )

            this.snackbar.text = "Saving Kompetensi Dasar";
            this.snackbar.status = true;
            this.UI.loading = false;
        },
        Refresh(){
            
        },
    },
    computed : {

        tableKD(){
            return {
                style: 'thead{z-index:-1;}',
                licenseKey: 'non-commercial-and-evaluation',
                width: '100%',
                height : 200,
                stretchH: 'all',
                data: this.dataKd,
                contextMenu: {
                    items : {
                        'undo':{},
                        'redo':{},
                        '---------':{},
                        'row_above':{},
                        'row_below':{},
                        'remove_row':{},
                        
                    }
                },
                colHeaders: ['No Kd', 'Kompetensi Dasar'],
                manualColumnResize: [90,100],
                columns : [
                {
                    data:'kdId'
                },
                {
                    data: 'kd'
                }
                ],          
            };
        },
    },

    created (){
        let Datastore = require('nedb');
        this.DataDB = new Datastore({ filename: 'DataDB.db', autoload: true });
        this.PelajaranDB = new Datastore({ filename: 'PelajaranDB.db', autoload: true })
        this.KdDB = new Datastore({filename: 'KdDB.db', autoload:true});
        this.Refresh();
    },


  }
</script>
