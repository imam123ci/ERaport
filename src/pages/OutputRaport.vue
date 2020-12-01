
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
            <h2>Raport Semester</h2>
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
          <v-row> 
            <v-col>
              <v-select
                  :items="UI.SelectSemester"
                  label="Semeter"
                  solo
                  v-model="UI.SelectedSemester"

              >
              </v-select>
            </v-col>
            <v-col>
              <template>
                <v-menu
                  ref="menu"
                  v-model="UI.DateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formatedDate"
                      label="Tanggal Raport"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="id-ID"
                    ref="picker"
                    :landscape=true
                    v-model="UI.Ddate"
                  ></v-date-picker>
                </v-menu>
              </template>
            </v-col>
          </v-row>

        </v-card-text>

        <v-card-actions>
          <v-btn ma-2 @click="getDataSekolah();">Create Report</v-btn>
        </v-card-actions>
       
    </v-card>
    
    <v-spacer class="ma-5"></v-spacer>
    <v-expansion-panels>
      <!-- <v-expansion-panel>
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
      </v-expansion-panel> -->

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
            :items="dataRaport"
            :items-per-page="15"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="downloadRaport(item)"
              >
                mdi-download
              </v-icon>
              <v-icon
                small
                @click="printRaport(item)"
              >
                mdi-printer
              </v-icon>
            </template>

          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
  
    
    </v-expansion-panels>
  

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
  import createReport from 'docx-templates';
  import fs from 'fs';
  import moment from 'moment';



  export default {
    name: 'OutputRaport',

    data: () => ({
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
            SelectedSemester : "",
            Ddate: new Date().toISOString().substr(0, 10),
            DateMenu:""
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
        dataRaport:[],
        dataKkm:{

        },
        dataSiswa : [

        ],
        dataDasar : [

        ]
    }),
    methods: {
      notify(msg){
        this.snackbar.status = true;
        this.snackbar.text = msg; 
      },

      getKkm(){
          this.DataDB.find( 
              {_id:'kkm'}, 
              (err, docs) => {
                  if(err){
                      console.log(err);
                      return;
                  }
                  this.dataKkm = docs[0];
              }
          )
      },
      // must run everytime
      getDataSekolah(){
        let kelas = this.UI.SelectedKelas;
        let rombel = this.UI.SelectedRombel;
        let semester = this.UI.SelectedSemester;
        if(kelas == "" || rombel == "" ||semester==""){
          return;
        }
        
        this.DataDB.find( {_id : {$in: ['sekolah', 'kepala']}}, (err, docs) => {
          if(err){
            console.log(err);
          }
          this.dataDasar = docs;
          this.prepareData();
        });
      },

      //getGuru()
      //output object
      getGuru(){
        let kelas = this.UI.SelectedKelas;
        let rombel = this.UI.SelectedRombel;
     
        return new Promise((resolve,reject)=>{
          this.DataDB.find(
            {_id:'guru',kelas:kelas,rombel:rombel},
            (err,docs)=>{
              if(err){
                reject(err)
              }
              //return object
              resolve(docs[0])
            }
          )
        });
      },
      
      //GetSiswa
      //return array of objeck
      getSiswa(kelas,rombel){
        return new Promise((resolve, reject)=>{
          let siswa = [];
          setTimeout(()=>{
            this.SiswaDB.find(
              {kelas:kelas, rombel:rombel},
              (err,docs)=>{
                if(err){
                  console.log(err);
                  reject(err);
                }
                siswa = docs;
                resolve(siswa);
              }
            )
          },500)
        })
      },

      //pelajaran:arraay , kelas:'string, semester:string
      //return object array of object
      getKD(pelajaran, kelas, semester){
        return new Promise((resolve, reject)=>{
          let kd = [];
          let syarat = {
            $and :[
              {pelajaran: {$in:pelajaran}},
              {kelas:kelas},
            ]};
            if(semester == 'Semester 1'){
              syarat.$and.push({semester1 : true});
            }
            else if(semester == 'Semester 2'){
              syarat.$and.push({semester2 : true});
            }
            this.KdDB.find(
              syarat,
              {kdId:1,pelajaran:1,tipe:1},
              (err,docs) => {
                if(err){
                  console.log(err);
                  reject(err);
                }
                kd = docs;
                resolve(kd);
              }
            );
        })
      },
      getKDgroup(pelajaran,tipe, kelas, semester,isKdID){
        return new Promise((resolve, reject)=>{
          let kd = [];
          let syarat = {
            $and :[
              {pelajaran: pelajaran},
              {kelas:kelas},
              {tipe: tipe}
            ]};
         
            if(semester == 'Semester 1'){
              syarat.$and.push({semester1 : true});
            }
            else if(semester == 'Semester 2'){
              syarat.$and.push({semester2 : true});
            }
            this.KdDB.find(
              syarat,
              {kdId:1,kd:1,pelajaran:1,tipe:1},
              (err,docs) => {
                if(err){
                  console.log(err);
                  reject(err);
                }
                if(isKdID){
                  docs.map((d)=>{
                    kd.push(d.kdId);
                  });
                }else{
                  docs.map((d)=>{
                    kd.push(d.kd);
                  });
                }
                
                resolve(kd);
              }
            );

        })
      },

      //kelas : string
      //return array of string
      getPelajaran(kelas){
        return new Promise((resolve, reject)=>{
          let pelajaran = [];
          let syarat = {[kelas]:true};
  
          setTimeout(()=>{
            this.PelajaranDB.find(
              syarat,
              {pelajaran:1},
              (err,docs)=>{
                if(err){
                  reject(err);
                }
                docs.map((d)=>{
                  pelajaran.push(d.pelajaran);
                });
                resolve(pelajaran);
              }
            )
          },500)
        });
      },

      //kalkulasi nilai akhir
      calcNilai(namasiswa, pelajaran,tipe,desckds,nilai){
        let nilaiA = this.averageArr(nilai);
        let predikat = this.calcPredikat(nilaiA,false);
        //create deskription.
        let desc = [];
        namasiswa = namasiswa.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
        let khubungbaik =[ 'Serta, ',("Selain itu, " + namasiswa + " "),(namasiswa + " juga ")];
        let khubungburuk = [ 'Namun, ', "Akan tetapi, "];
        for(let i=0;i<nilai.length;i++){
          let deskripsi = "";
          let descnilai = this.calcPredikat(nilai[i], true);
          let prednilai = this.calcPredikat(nilai[i],false);
          let desckd =  desckds[i];
          deskripsi = descnilai + " dalam "+ desckd;
          if(i == 0){
            deskripsi = namasiswa + " "+ deskripsi;
          }
          else{
            if(prednilai == 'A' || prednilai == 'B' || prednilai == 'C'){
              let rdm = Math.floor((Math.random() * khubungbaik.length));
              deskripsi = khubungbaik[rdm] + deskripsi;
            }
            else if( prednilai == 'D'){
              let rdm = Math.floor((Math.random() * khubungburuk.length))
              deskripsi = khubungburuk[rdm] + deskripsi;
            }
            else{
              deskripsi = (namasiswa + " juga ") + deskripsi;
            }
          }
          desc.push(deskripsi);
        }
      
        let deskripsiString = desc.join(" ");
        return({
          pelajaran : pelajaran,
          tipe : tipe,
          nilai : nilaiA,
          predikat : predikat,
          deskripsi : deskripsiString,
        });

      },
      getNilai(syarat){
        return new Promise((resolve,rejects)=>{
          //{$and:[{"siswa.kelas":kelas},{"siswa.rombel":rombel}]},
          //making where statement
          let where = { 
            $and : [
              {'siswa.NIS':syarat.siswa.NIS}, 
              {'siswa.NISN':syarat.siswa.NISN},
              {'pelajaran.pelajaran':syarat.kd.pelajaran},
              {'pelajaran.tipe': 'pengetahuan'},
              {'pelajaran.kd': {$in : syarat.kd.pengetahuan}}
            ]
          }
          let nilaiPengetahuan = {};
          let nilaiKeterampilan = {};
         
          // get pengetahuan
          this.NilaiDB
            .find(where)
            .exec((err,docs)=>{
              if(err){
                rejects(err);
              }
              let tempNilai = [];
              for(let i=0;i<docs.length;i++){
                tempNilai.push(docs[i].nilaiAkhir);
              }
              nilaiPengetahuan = this.calcNilai(syarat.siswa.nama,syarat.kd.pelajaran, 'pengetahuan',syarat.kd.pengetahuandesc,tempNilai);
          
              
              //Keterampilan
              where = { 
                $and : [
                  {'siswa.NIS':syarat.siswa.NIS}, 
                  {'siswa.NISN':syarat.siswa.NISN},
                  {'pelajaran.pelajaran':syarat.kd.pelajaran},
                  {'pelajaran.tipe': 'keterampilan'},
                  {'pelajaran.kd': {$in : syarat.kd.keterampilan}}
                ]
              }

              this.NilaiDB
                .find(where)
                .exec((err,docs)=>{
                  if(err){
                    rejects(err);
                  }
                  let tempNilai = [];
                  for(let i=0;i<docs.length;i++){
                    tempNilai.push(docs[i].nilaiAkhir);
                  }
                  nilaiKeterampilan = this.calcNilai(syarat.siswa.nama,syarat.kd.pelajaran, 'keterampilan',syarat.kd.keterampilandesc,tempNilai);
                  
                  resolve({
                    pelajaran : syarat.kd.pelajaran,
                    pengetahuan : nilaiPengetahuan,
                    keterampilan : nilaiKeterampilan
                  });
              });          
          });

          
        });

      }, 

      getLuaranSikap(pelajaran,kdId){
        //trim data
        pelajaran = pelajaran.replace(/'/g,"");
        pelajaran = pelajaran.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase());
        return new Promise((resolve,reject)=>{
            this.KdDB.find(
              {tipe:'sikap',pelajaran:pelajaran,kdId:kdId},
              {_id:0},
              (err,docs)=>{
                  if(err){
                      this.notify(err);
                      reject(err);
                  }
                  if(docs[0 ] != undefined){
                    resolve(docs[0].kd);
                  }else{
                    resolve("");
                  }
                  
              }
            )        
          })
        },

      getNilaiSikap(syarat){
         let where = { 
            $and : [
              {'siswa.NIS':syarat.siswa.NIS}, 
              {'siswa.NISN':syarat.siswa.NISN},
              {'tipe': 'sikap'}
            ]
          }
        return new Promise((resolve,rejects)=>{
          this.NilaiDB
          .find(where)
          .exec((err,docs)=>{
            if(err){
              console.log(err);
              rejects(err);
            }

            
            resolve(this.calcSikap(syarat.siswa.nama, docs[0]));
          })
        });
      },

      async calcSikap(namasiswa , nilai){
        namasiswa = namasiswa.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
        //loopingforeachnilaisikap
        let nsosial=nilai.sosial;
        //nilai sosial
        let dsosial ={baik:[],buruk:[]};
        
        for(let [key,values] of Object.entries(nsosial)){
          if(values != undefined && values != ""){
            let td = await this.getLuaranSikap(key.replace(/'/g,''),values);
            if(td != ""){
              if(values == 'C'){
                dsosial.buruk.push(td);
              }
              else{
                if(values == 'A'){
                  dsosial.baik.unshift(td);                  
                }
                else{
                  dsosial.baik.push(td);
                }
              }
            }
          }
        }
        // join nilai A dan B
        // buat nilai sikap sosial
        let dasosial =dsosial.baik.join(";");
        dasosial = namasiswa + " " + dasosial + ".";
        if(dsosial.buruk.length>0){
          dasosial = dasosial + "Dengan bimbingan dan pendampingan yang lebih, Ananda akan mampu meningkatkan " ;
          dasosial = dasosial + dsosial.buruk.join(";") + ".";
        }

        let nspiritual =nilai.spiritual;
        //nilai spiritual
        let dspiritual ={baik:[],buruk:[]};
        
        for(let [key,values] of Object.entries(nspiritual)){
          if(values != undefined && values != ""){
            let td = await this.getLuaranSikap(key.replace(/"|'/g,''),values);
            if(td != ""){
              if(values == 'C'){
                dspiritual.buruk.push(td);
              }
              else{
                if(values == 'A'){
                  dspiritual.baik.unshift(td);                  
                }
                else{
                  dspiritual.baik.push(td);
                }
              }
            }
          }
        }
        // join nilai A dan B
        // buat nilai sikap spiritual
        let daspiritual = dspiritual.baik.join(";");
        daspiritual = namasiswa + " " + daspiritual + ".";
        if(dspiritual.buruk.length>0){
          daspiritual = daspiritual + "Dengan bimbingan dan pendampingan yang lebih, Ananda akan mampu meningkatkan " ;
          daspiritual = daspiritual + dsosial.buruk.join(";") + ".";
        }

        return({
          sosial : dasosial,
          spiritual : daspiritual,
        })


      },


      //Download and print
       async downloadRaport(item){
        let template;
        if(this.UI.SelectedSemester == 'Semester 2'){
          template = fs.readFileSync('./Templates/templateSemester2.docx');
        }
        else {
          template = fs.readFileSync('./Templates/templateSemester1.docx');
        }

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
      printRaport(){

      },
      //populate word or create raport
      async createR(dtTanggal,dtSiswa, dtDasar, dtKepala , dtGuru,dtNilai, dtNilaiSikap){
        let dtAll = {
          siswa : dtSiswa,
          dtt : dtTanggal,
          dtk : dtKepala,
          dts : dtDasar,
          dtg : dtGuru,
          dtn: dtNilai,
          dtns:dtNilaiSikap
        }
        let namaFile,template

        if(this.UI.SelectedSemester == 'Semester 2'){
          namaFile = "Sem2"+dtSiswa.kelas+dtSiswa.rombel+"_"+dtSiswa.nama+"_"+dtSiswa.NIS;
          template = fs.readFileSync('./Templates/templateSemester2.docx');
        }
        else {
          namaFile = "Sem1"+dtSiswa.kelas+dtSiswa.rombel+"_"+dtSiswa.nama+"_"+dtSiswa.NIS;
          template = fs.readFileSync('./Templates/templateSemester1.docx');
        }

        let buffer = await createReport({
          template,
          data : dtAll,
        })

        fs.writeFileSync('./Raport/Semester1/'+namaFile+'.docx',buffer);
      },

      //Preparing all data
      async prepareData(){
        // all usefull varible and hardcode one
        let kelas = this.UI.SelectedKelas;
        let rombel = this.UI.SelectedRombel;
        let semester = this.UI.SelectedSemester;
        let dtSiswa = [];
        let dtDasar = {};
        let dtKepala = {};
        let dtNilai = {};
        let pel = [];
        let kd = [];
        let agama = ['Budha', 'Islam', 'Protestan', 'Katolik', 'Hindu', 'Konghucu'];

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

        //configure guru kelas
        let templateGuru = {
          nama : "",
          NIP : "",
        };

        let dtGuru = await this.getGuru();
        dtGuru = {...templateGuru,...dtGuru};

        //Configure year and tahun pelajaran
        let tgl = this.UI.Ddate;
        let year = (moment(tgl).year());
        let month = (moment(tgl).month());
        let thnpel;
        if(month > 7 || month < 1){
          thnpel = year.toString()+"/"+ (year+1).toString();
        }
        else{
          thnpel = (year-1).toString() +"/"+ (year).toString();
        }
        let dtt={
          tgl:tgl,
          thnp:thnpel
        }

        //configure kelas dan rombel
        let kelasf = kelas[5]+"/"+rombel;

        //get pelajaran dan KD
        dtSiswa = await this.getSiswa(kelas,rombel);
        pel = await this.getPelajaran(kelas);
        // select kd group by pelajaran and tipe
        // ['pengetahuan','keterampilan', 'sikap'];
        for(let i=0;i<pel.length;i++){
          let tempkd = {};
          tempkd.pelajaran = pel[i];
          tempkd.pengetahuan = await this.getKDgroup(pel[i],'pengetahuan',kelas,semester,true);
          tempkd.pengetahuandesc = await this.getKDgroup(pel[i],'pengetahuan',kelas,semester,false);
          tempkd.keterampilan = await this.getKDgroup(pel[i],'keterampilan',kelas,semester,true);
          tempkd.keterampilandesc = await this.getKDgroup(pel[i],'keterampilan',kelas,semester,false);
          tempkd.sikap = await this.getKDgroup(pel[i],'sikap',kelas,semester,true);
          tempkd.sikapdesc = await this.getKDgroup(pel[i],'sikap',kelas,semester,false);
          kd.push(tempkd);
        }
        // console.log("get Kd group")
        // console.log(kd);
        

        // configure all template 
        
        let templatesiswa = {
            _id:"",
            kelas:"",
            kelasF:kelasf,
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
            ekstrakurikuler:{
              1:{ekskul:"",deskripsi:""},
              2:{ekskul:"",deskripsi:""},
              3:{ekskul:"",deskripsi:""}
            },
            prestasi:{
              1:{jenis:"",deskripsi:""},
              2:{jenis:"",deskripsi:""},
              3:{jenis:"",deskripsi:""},
            },
            saran:"",
            lulus:"",

        };

      
        //getnilai
        //looping per siswa here
        for(let i =0; i<dtSiswa.length;i++){
          let dts = dtSiswa[i];
          //apply template,
          if(('ekstrakurikuler' in dts)){
            dts.ekstrakurikuler = {...templatesiswa.ekstrakurikuler, ...dts.ekstrakurikuler};
          }
          if(('prestasi' in dts)){
            dts.prestasi = {...templatesiswa.prestasi,...dts.prestasi};
          }
          dts = {...templatesiswa, ...dts};


          dtNilai = {};
          let s = {
                siswa : {
                  nama : dts.nama,
                  rombel : dts.rombel,
                  NIS  : dts.NIS,
                  NISN : dts.NISN,
                }
              };
          //cari nilai sikap
          let dtNilaiSikap = await this.getNilaiSikap(s);
          //looping per pelajaran
          for(let j=0; j<kd.length;j++){
            let dtkd = kd[j];
            s.kd = dtkd;
            let tempdtNilai = await this.getNilai(s);
            
            
            if(agama.includes(dtkd.pelajaran))
            {
              if(dts.agama == dtkd.pelajaran){
                dtNilai.Agama = (tempdtNilai);
              }
            }
            else{
              dtNilai[dtkd.pelajaran] = (tempdtNilai);
            }
            
          }

          //create word
          this.createR(dtt,dts,dtDasar,dtKepala,dtGuru,dtNilai,dtNilaiSikap);          
          //async createR(dtTanggal,dtSiswa, dtDasar, dtKepala , dtGuru,dtNilai, dtNilaiSikap){

          //push to array
          this.dataRaport.push(
            {
              siswa : dts,
              dtt : dtt,
              dtk : dtKepala,
              dts : dtDasar,
              dtg : dtGuru,
              dtn: dtNilai,
              dtns:dtNilaiSikap
            }
          )
        }
        this.notify("Generared Raport");

      },

      // other function
      averageArr(arr){
            let l = 0;
            let s = 0;
            for(let i=0; i<arr.length;i++){
                if(arr[i] == undefined || arr[i] === "" || arr[i] === null){
                    continue;
                }
                else{
                    l++;
                    s = s + arr[i];
                }
            }
            if(l == 0){
                return 0;
            }

            return(Math.round(((s/l) + Number.EPSILON) * 100) / 100);
        },
        calcPredikat(tNilai,isDesc){
            // Perhitungan predikat kkm
            let tKkm = this.dataKkm.ket;
            let tPredikat = "D";
            let tPredikatDesc = 'perlu bimbingan';
            if(tKkm.length > 0){
                for(let j = 3; j >= 0; j--){
                    if(tNilai >= tKkm[j].rentangMin){
                        tPredikat = tKkm[j].predikat;
                        tPredikatDesc = tKkm[j].desc;
                        break;
                    }
                }
            }
            if(isDesc){
              return(tPredikatDesc);
            }else{
              return(tPredikat);
            }
            
        },
        

    },
    computed:{
      formatedDate(){
        moment.locale('id');
        return this.UI.Ddate ? moment(this.UI.Ddate).format('D MMMM YYYY') : ''
      }
    },
    created (){
        let Datastore = require('nedb');
        this.SiswaDB = new Datastore({ filename: 'SiswaDB.db', autoload: true });
        this.DataDB = new Datastore({ filename: 'DataDB.db', autoload: true });  
        this.NilaiDB = new Datastore({ filename: 'NilaiDB.db', autoload: true });  
        this.PelajaranDB = new Datastore({ filename: 'PelajaranDB.db', autoload: true })
        this.KdDB = new Datastore({filename: 'KdDB.db', autoload:true});
        this.getKkm();
        
    },
  }
</script>
