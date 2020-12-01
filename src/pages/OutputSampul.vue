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
              label="Cara Menerima File"
              :items="pengaturan.SelectCara"
              @change="changePengaturan()"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field 
              label="Path Template"
              @change="changePengaturan()">
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field 
              label="Path Destinasi"
              @change="changePengaturan()">
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
          <div style="height:200px; overflow-y:scroll;">
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Hasil
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="tableHasil.headers"
            :items="dataSampul"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="downloadSampul(item)"
              >
                mdi-download
              </v-icon>
              <v-icon
                small
                @click="printSampul(item)"
              >
                mdi-printer
              </v-icon>
            </template>

          </v-data-table>
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
        pengaturan :{
          SelectCara : ["download","fs"],
          SelectedCara : "",
          PathTemplate : "",
          PathDestinasi : "",
        },
        tableHasil : {
          headers : [
            {
              text : "Nama",
              align: 'start',
              sortable : true,
              value : 'siswa.nama'
            },
            {
              text : "NIS",
              value : 'siswa.NIS'
            },
            {
              text : "NISN",
              value : 'siswa.NISN'
            },
            {
              text : " ",
              value : 'actions'
            }
          ]
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

        ],
        dataSampul : [

        ]
    }),
    methods: {
      async printSampul(item){
        console.log(item);
      },
      async downloadSampul(item){
        const template = fs.readFileSync('./Templates/templatesSampul.docx');
        console.log(template.toJSON());
        let buffer = await createReport({
          template,
          data : item
        });

        const blob = new Blob([buffer], {type: 'text/docx'})
        // create download dialog
        const e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
        a.download = item.namaFile +".docx";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/docx', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
      },
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
          this.dataSampul.push(
            {
              dt : dtDasar,
              kp : dtKepala,
              siswa : dtSiswa[i],
              namaFile : nm
            }
          )
        }
      },
      changePengaturan(){
        
      }

    },
    created (){
        let Datastore = require('nedb');
        this.SiswaDB = new Datastore({ filename: 'SiswaDB.db', autoload: true });
        this.DataDB = new Datastore({ filename: 'DataDB.db', autoload: true });  
    },
  }
</script>
