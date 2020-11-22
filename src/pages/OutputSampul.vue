<!--
Note :
- settingan fs waktu build
- buat jd pdf

-->
<style scoped>
    
</style>

<template>
  <v-container>

    <v-card class="white">
        <v-card-title class="pa-4">
            <h2>Jilid dan Identitas</h2>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-select
                  :items="UI.SelectKelas"
                  label="Kelas"
                  solo
                  v-model="UI.SelectedKelas"
                  
              >
              </v-select>
            </v-col>
            <v-col>
              <v-select
                  :items="UI.SelectRombel"
                  label="Rombel"
                  solo
                  v-model="UI.SelectedRombel"
              >
              </v-select>
            </v-col>
          </v-row>
          <!-- <v-row> 
            <v-col>
              <v-select
                  :items="UI.SelectSemester"
                  label="Semeter"
                  solo
                  v-model="UI.SelectedSemester"

              >
              </v-select>
            </v-col>
          </v-row> -->

        </v-card-text>

        <v-card-actions>
          <v-btn ma-2 @click="   getSiswa();">Create Report</v-btn>
        </v-card-actions>
       
    </v-card>

    <v-spacer class="ma-3"></v-spacer>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Pengaturan
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col>
              <v-select
              label="Cara Menerima File">
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Path Template">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Path Destinasi">
              </v-text-field>
            </v-col>
          </v-row>          
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Log
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Data
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
  
    
    </v-expansion-panels>
    
  </v-container>
</template>

<script>
  import createReport from 'docx-templates';
  import fs from 'fs';

  export default {
    name: 'OutputSampul',

    data: () => ({
        log:[

        ],
        snackbar : {
            status : false,
            timeout : 1000,
            text : ""
        },
        UI : {
            loading : false,
            SelectPelajaran : [],
            SelectedPelajaran : "kelas1",
            SelectKelas : ["kelas1","kelas2","kelas3","kelas4","kelas5","kelas6"],
            SelectedKelas : "",
            SelectRombel : ['a','b','c','d','e','f','g'],
            SelectedRombel : "",
            SelectSemester : ['Semester 1', 'Semester 2'],
            SelectedSemester : "all",
        },
        dataSiswa : [

        ],
        dataDasar : [

        ]
    }),
    methods: {
      async createR(dtDasar, dtKepala,dtSiswa, nmFile){
        const template = fs.readFileSync('./Templates/templatesSampul.docx');
        console.log(template.toJSON());
        let buffer = await createReport({
          template,
          data : {
            dt : dtDasar,
            kp : dtKepala,
            siswa : dtSiswa,
          },
        })
        fs.writeFileSync('./Raport/Sampul/'+nmFile+'.docx',buffer);
      },

      getSiswa(){
        let kelas = this.UI.SelectedKelas;
        let rombel = this.UI.SelectedRombel;
        let semester = this.UI.SelectedSemester;
        if(kelas == "" || rombel == "" ||semester==""){
          return;
        }
        //define siswa template
        let template = {
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
            },
            ortu : {
              namaAyah:"",
              namaIbu:"",
              jalan:"",
              kelurahan:"",
              kecamatan:"",
              kota:"",
              provinsi:"",
            },
            wali : {
              nama:"",
              pekerjaan:"",
              alamat:"",
            }
        }
        this.SiswaDB.find(
          {kelas:kelas, rombel:rombel},
          (err,docs)=>{
            if(err){
              console.log(err);
              return;
            }
            console.log(docs);
            this.dataSiswa = docs;
            for(let i=0; i< docs.length; i++){
              docs[i] = {...template,...docs[i]};
            }
            this.getDataSekolah();
          }
        )

        
      },

      getDataSekolah(){
        let kelas = this.UI.SelectedKelas;
        let rombel = this.UI.SelectedRombel;
        let semester = this.UI.SelectedSemester;
        if(kelas == "" || rombel == "" ||semester==""){
          return;
        }

        let templateSekoalah = {
          _id : "sekolah",
          nama : "",
          NPSN : "",
          alamat : "",
          pos :"",
          tel : "",
          web : "",
          email : "",
          desa : "",
          dinas : "",
          kabupaten : "",
          kabupaten1 : "",
          kabupaten2 : "",
          provinsi : "",
          NIS : ","
        };

        let templateKP = {
          NIP : "",
          nama : ""
        }
        
        this.DataDB.find( {_id : {$in: ['sekolah', 'kepala']}}, (err, docs) => {
          if(err){
            console.log(err);
          }
          for(let i=0; i<docs[i];i++){
            if(docs[i]._id == 'sekolah'){
              docs[i]= {...templateSekoalah, ...docs[i]};
            }
            else if (docs[i]._id == 'kepala'){
              docs[i] = {...templateKP, ...docs[i]};
            }
          }
          this.dataDasar = docs;
          console.log(docs);
          this.prepareData();
        });
        
        
      },
      prepareData(){
        console.log("prepate data");
        let kelas = this.UI.SelectedKelas;
        let rombel = this.UI.SelectedRombel;
        let dtSiswa = this.dataSiswa;
        let dtDasar = {};
        let dtKepala = {};
        if(this.dataDasar[0]._id == 'sekolah'){
          dtDasar = this.dataDasar[0];
          dtKepala = this.dataDasar[1];
        }
        else if(this.dataDasar[1].id == 'sekolah'){
          dtDasar = this.dataDasar[1];
          dtKepala = this.dataDasar[0];
        }
        else{
          console.log("data not found");
          return;
        }

        for(let i=0; i< dtSiswa.length; i++){
          let nm = "Sampul"+kelas+rombel+"_"+dtSiswa[i].nama+"_"+dtSiswa[i].NIS;
          this.createR(dtDasar,dtKepala,dtSiswa[i],nm);  
        }
      }

    },
    created (){
        let Datastore = require('nedb');
        this.SiswaDB = new Datastore({ filename: 'SiswaDB.db', autoload: true });
        this.DataDB = new Datastore({ filename: 'DataDB.db', autoload: true });  
    },
  }
</script>
