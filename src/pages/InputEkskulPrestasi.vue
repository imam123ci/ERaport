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
            <h2>Input Siswa</h2>
        </v-card-title>
         
        <v-card-subtitle>
        </v-card-subtitle>
        <v-card-actions>
            <v-row>
                <v-col>
                    <v-btn class="ma-1" color="blue lighten-2" @click="refresh()"> 
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
                    <v-btn class="ma-1" color="green lighten-1" @click="saveDataSiswa()"> 
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
              <p>Pilih kelas yang akan dimasukan </p> 
              <v-row>
                <v-col>
                    <v-select
                        :items="UI.SelectKelas"
                        label="Kelas"
                        v-model="UI.SelectedKelas"
                        style="z-index:900"
                        @change="getDataSiswa()"
                    >
                    </v-select>
                </v-col>
                <v-col>
                    <v-select
                        :items="UI.SelectRombel"
                        label="Rombel"
                        v-model="UI.SelectedRombel"
                        style="z-index:900"
                        @change="getDataSiswa()"
                    >
                    </v-select>
                </v-col>
              </v-row>
            </v-card-text>
         </v-form>
    </v-card>

    <v-spacer class="ma-5"></v-spacer>

    <v-card>
        
        <v-container>
            <v-btn class="ma-0" @click="tblSiswa_addColumn()"> 
            Tambah 
            </v-btn>
            <v-spacer class="ma-3"></v-spacer>

            <hot-table  ref="tblSiswa" :settings="tableSiswa"></hot-table>
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
    name: 'InputEkskulPrestasi',
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
            loading : false,
            SelectKelas : ["kelas1","kelas2","kelas3","kelas4","kelas5","kelas6"],
            SelectedKelas : "",
            SelectRombel : ["a","b","c","d","e","f","g"],
            SelectedRombel : ""
           
        },
        dataSiswa : [{
            _id:"",
            kelas:"",
            nama:"",
            NIS:"",
            NISN:"",
            agama:"",
            tinggi1:"",
            tinggi2:"",
            berat1:"",
            berat2:"",
            Kesehatan:{
                pendengaran:"",
                pengelihatan:"", 
                gigi:"",
            },
            ketidakhadiran:{
                sakit:"",
                izin:"",
                tanpaKeterangan:"",
            }
        }],
    }),

    methods : {
        refresh(){

            console.log(this.UI);
            this.getDataSiswa();

        
        },
        getDataSiswa(){
            if(this.UI.SelectedRombel == "" || this.UI.SelectedKelas  == ""){
                this.UI.loading = false;
                return;
            }
            let kelas = this.UI.SelectedKelas;
            let rombel = this.UI.SelectedRombel;
            this.UI.loading = true;
      

            this.SiswaDB.find( {$and: [{kelas:kelas},{rombel:rombel}]}, (err, docs) => {
                if(err){
                    console.log(err);
                }
                this.dataSiswa = docs;
                console.log(docs);
                this.$refs.tblSiswa.hotInstance.loadData(this.dataSiswa);            
                this.UI.loading = false;
            });


        },
        saveDataSiswa(){
            this.UI.loading = true;
            console.log("GO Sva");
            console.log(this.UI);
            let kelas = this.UI.SelectedKelas;
            let rombel = this.UI.SelectedRombel;
            
            this.SiswaDB.remove(                
                 {$and: [{kelas:kelas},{rombel:rombel}]},
                 {multi:true},
                 (err)=>{
                     if(err){
                        console.log(err);
                     }
                     
                 }
            );
            
            //add class for each row
            this.dataSiswa.map((s)=>{
                delete s._id;
                s.kelas = kelas;
                s.rombel = rombel;
                
            });

            this.SiswaDB.insert(
                this.dataSiswa,
                (err)=>{
                    if(err){
                        console.log("err" +err);
                    }
                }
            )

            this.snackbar.text = "Saving Siswa";
            this.snackbar.status = true;
            this.UI.loading = false;
        },
        tblSiswa_addColumn(){
            this.dataSiswa.push({});
            
        }
        



    },

    computed : {
         tableSiswa(){
             return {
                licenseKey: 'non-commercial-and-evaluation',
                width: '100%',
                height : 450,
                stretchH: 'all',
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
                data: this.dataSiswa,
                colHeaders: true,
                rowHeaders : true,
                nestedHeaders : [
                    [{label:'', colspan:6},
                    {label:'Ayah',colspan:2},{label:'Ibu',colspan:2}, {label:'Alamat Orang tua',colspan:5}, 
                    {label:'Wali',colspan:3}, 
                    {label:'Tinggi', colspan:2}, {label:'Berat', colspan:2}, 
                    {label:'Kesehatan', colspan:3}, {label:'Ketidakhadiran', colspan:3}
                    ],
                    ['Nama','NIS','NISN','Jenis Kelamin','Agama','TTL',
                    'Nama','Pekerjaan',
                    'Nama','Pekerjaan',
                    'Jalan', 'Kelurahan','Kecamatan','Kota','Provinsi',
                    'Nama','Pekerjaan','Alamat',
                    'Smt1', 'Smt2', 'Smt1', 'Smt2',
                    'Pendengaran', 'Pengelihatan', 'Gigi', 
                    'Sakit','Izin', 'Tanpa Keterangan'
                    ]
                ],
                fixedColumnsLeft: 1,
                columns: [
                    {
                        data : 'nama'
                    },
                    {
                        data : 'NIS'
                    },
                    {
                        data : 'NISN'
                    },
                    {
                        data : 'jenisKelamin',
                        type: 'dropdown',
                        source: ['Laki-laki', 'Perempuan']
                    },
                    {
                        data : 'agama',
                        type: 'dropdown',
                        source: ['Budha', 'Islam', 'Protestan', 'Katolik', 'Hindu', 'Konghucu']
                    },
                    {
                        data : 'ttl'
                    },
                    {
                        data : 'ortu.namaAyah' 
                    },
                    {
                        data : 'ortu.pekerjaanAyah' 
                    },
                    {
                        data : 'ortu.namaIbu' 
                    },
                    {
                        data : 'ortu.pekerjaanIbu' 
                    },
                    //'Jalan', 'Kelurahan','Kecamatan','Kota','Provinsi'
                    {
                        data : 'ortu.jalan'
                    },
                    {
                        data : 'ortu.kelurahan'
                    },
                    {
                        data : 'ortu.kecamatan'
                    },
                    {
                        data : 'ortu.kota'
                    },
                    {
                        data : 'ortu.provinsi'
                    },
                    //wali
                    {
                        data : 'wali.nama' 
                    },
                    {
                        data : 'wali.pekerjaan' 
                    },
                    {
                        data : 'wali.alamat' 
                    },
                    {
                        data : 'tinggi1',
                        type: 'numeric'
                    },
                    {
                        data : 'tinggi2',
                        type: 'numeric'
                    },
                    {
                      data : 'berat1'  ,
                      type: 'numeric',
                      numericFormat: {
                        pattern: '00,0'
                      }
                    },
                    {
                      data : 'berat2',
                      type: 'numeric',
                      numericFormat: {
                        pattern: '00,0'
                      }  
                    },
                    {
                      data : 'kesehatan.pendengaran'  
                    },
                    {
                      data : 'kesehatan.penglihatan'  
                    },                                        
                    {
                      data : 'kesehatan.gigi'  
                    },
                    {
                        data : 'ketidakhadiran.sakit',
                        type : 'numeric'
                    },
                    {
                        data : 'ketidakhadiran.izin',
                        type : 'numeric'
                    },
                    {
                        data : 'ketidakhadiran.tanpaKeterangan',
                        type : 'numeric'
                    }
                ],
             }
         }
    },

    mounted (){

    },
    created (){
        let Datastore = require('nedb');
        this.SiswaDB = new Datastore({ filename: 'SiswaDB.db', autoload: true });
        
    }
}
    


</script>
