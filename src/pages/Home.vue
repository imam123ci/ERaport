<!-- This component contain dashboard Menu (No 1) -->
<style scoped>
    
</style>

<template>

  <v-container>

    <v-card class="white">
        <v-card-title class="pa-4">
            <h2>Home</h2>
        </v-card-title>
        
    </v-card>

    <v-spacer class="ma-3"></v-spacer>

    <template v-if="UI.pertama">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
          >
            Halo
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            Setel
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            Gunakan
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              class="mb-5"
              elevation="0"
            >
            <v-card-text >
              <h2>Halo !!! </h2>
              <h3>Terima Kasih telah menggunakan aplikasi E Raport.</h3>
              <br/>
              <p> 
                 Aplikasi E Raport ini dibuat untuk menggantikan aplikasi e eraport sebelumnya.
                 Kelebihan dari aplikasi ini terletak pada kecepatan pemrosesan dan kemampuan menyimpan hasil raport dalam fortmat word.
                 Penggunaan aplikasi ini kurang lebih sama dengan aplikasi sebelumnya.

                 Sebelum dapat menggunakan aplikasi, pengguna wajib memasukan data-data dasar terlebih dahulu. <b>Kilik tombol berikutnya untuk melanjutkan.</b>

              </p>
            </v-card-text>
            </v-card>

            <v-btn
              color="primary"
              @click="e1 = 2"
            >
              Berikutnya
            </v-btn>

          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              class="mb-5"
              elevation="0"
            >
            Apakah Anda sudah pernah menggunakan aplikasi ini sebelumnya ?

            <v-card-text>
              Apabila Anda belum pernah menggunakan aplikasi ini, Anda wajib memasukan data melalui menu Input data.
              <br/>
              Apabila Anda sudah pernah menggunakan aplikasi ini, Anda dapat memasukan data melalui menu pengaturan > Backup, Restore, Reset.
            </v-card-text>
            </v-card>

            <v-btn
              color="primary"
              @click="e1 = 3"
            >
              Berikutnya
            </v-btn>

            <v-btn text @click="e1 = 1">
              Kembali
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-5"
              elevation="0"
            >
            <v-card-title>
              Selesai
            </v-card-title>
            <v-card-subtitle>
              Semua sudah diset dan Anda dapat menggunakan aplikasi ini
            </v-card-subtitle>
            <v-card-text>
              Butuh informasi lebih lanjut ? klik disini
            </v-card-text>
            </v-card>

            <v-btn
              color="primary"
              @click="UI.pertama=false"
            >
              Selesai
            </v-btn>

            <v-btn text @click="e1 = 2">
              Batal
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>


    </template>


    <div  v-if="!UI.pertama">
      <v-spacer class="ma-3"></v-spacer>
      <v-row>
        <v-col class="col-10 col-md-10 col-sm-12">
          <h3>Keseluruhan</h3>
          <v-row>         
            <v-col>
              <v-card
              class="mx-auto">
                <v-card-text>
                  <div>Total Murid</div>
                  <p class="display-1 text--primary">
                    {{totalMurid}}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col >
              <v-card
              class="mx-auto">
                <v-card-text>
                  <div>Total Pelajaran</div>
                  <p class="display-1 text--primary">
                    {{totalPelajaran}}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col >
            <v-card
              class="mx-auto">
                <v-card-text>
                  <div>Total KD</div>
                  <p class="display-1 text--primary">
                    {{totalKD}}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card
                class="mx-auto">
                  <v-card-text>
                    <div>KKM</div>
                    <p class="display-1 text--primary">
                      {{kkm}}
                    </p>
                  </v-card-text>
                </v-card>
            </v-col>
          </v-row>
          <h3>Kelas</h3>
          <v-row>         
            <v-col>
              <v-card
              class="mx-auto">
                <v-card-text>
                  <div>Total Murid {{UI.SelectedKelas}}</div>
                  <p class="display-1 text--primary">
                    {{totalMuridKelas}}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col >
              <v-card
              class="mx-auto">
                <v-card-text>
                  <div>Siswa di atas KKM</div>
                  <p class="display-1 text--primary">
                    {{nilaiAtasKKM}}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col >
              <v-card
              class="mx-auto">
                <v-card-text>
                  <div>Siswa di bawah KKM</div>
                  <p class="display-1 text--primary">
                    {{nilaiBawahKKM}}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col >
            <v-card
              class="mx-auto">
                <v-card-text>
                  <div>Nilai rata-rata</div>
                  <p class="display-1 text--primary">
                    {{nilaiRataRata}}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>

            
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
              <v-card>
                <v-card-title>
                  Kelas Default
                </v-card-title>
                <v-card-title>
                  <v-select
                    label="Kelas"
                    :items="UI.SelectKelas"
                    v-model="UI.SelectedKelas"
                  >
                  </v-select>
                  <v-select
                    label="Rombel"
                    :items="UI.SelectRombel"
                    v-model="UI.SelectedRombel"
                  >
                  </v-select>
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="setDefaultKelas()">
                    Set
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>  
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card
          height="350px"
          >
          <v-card-title class="mb-0 pb-0">Nilai Rata-Rata</v-card-title>
          <v-card-text>
            <div height="200px">
              <canvas id="graph1" height="250" width="300"></canvas>
            </div>          
          </v-card-text>

          
          </v-card>
        </v-col>
        <v-col>
          <v-card
            height="350px"
          >
          <v-card-title class="mb-0 pb-0">Nilai Rata-Rata per Pelajaran</v-card-title>
          <v-card-text>
            <div height="200px">
              <canvas id="graph2" height="250" width="300"></canvas>
            </div>
            
          </v-card-text>
          </v-card>

        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card
          height="400px"
          >
          <v-card-title>Rekapitulasi Nilai</v-card-title>
          <v-card-text>
          <v-data-table
              :headers="headersNilai"
              :items="dataNilai"
              :items-per-page="15"
              class="elevation-1"
            ></v-data-table>
          </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

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
  import Chart from 'chart.js';
  
  export default {
    name: 'Home',

    data: () => ({
      e1: 1,
      snackbar : {
            status : false,
            timeout : 1000,
            text : ""
        },
      UI:{
        pertama:false,
        SelectKelas : ["kelas1","kelas2","kelas3","kelas4","kelas5","kelas6"],
        SelectedKelas : "kelas1",
        SelectRombel : ['a','b','c','d','e','f','g'],
        SelectedRombel : "a",
        SelectedSemester : "Semester 1"
      },
      dataNilai : [],
      headersNilai : [],
      totalMurid:null,
      totalPelajaran:null,
      totalKD:null,
      kkm:null,
      totalMuridKelas:null,
      nilaiBawahKKM : null,
      nilaiAtasKKM : null,
      nilaiRataRata : null,
      
    }),
    methods : {
      async refresh(){
          // check if data exist
          let isExist = await this.checkIfDBExist();
          if(isExist){
            console.log(isExist);
          }
          else{
            this.UI.pertama = true;
            return;
          }
          // Seluruh
          this.totalMurid = await this.getTotalMurid();
          this.totalPelajaran = await this.getTotalPelajaran();
          this.totalKD = await this.getTotalKD();
          this.kkm = await this.getKKM();

          //kelas
          this.totalMuridKelas = await this.getTotalMuridKelas();

          //prepare data
          if(this.kkm != null && this.totalMurid!=null && this.totalPelajaran != null && this.totalKD != null){
            this.prepareData();
          }
      },
      notify(msg){
        this.snackbar.status = true;
        this.snackbar.text = msg; 
      },
      getDefaultKelas(){
        return new Promise((resolve,reject)=>{
          this.DataDB.find(
            {_id:'kelasdefault'},
            {kelas:1,rombel:1},
            (err,docs)=>{
              if(err){
                console.log(err);
                reject(err);
              }
              if(docs.length > 0){
                this.UI.SelectedKelas = docs[0].kelas;
                this.UI.SelectedRombel = docs[0].rombel;
                resolve(docs[0]);
              }
              else{
                resolve(null)
              }
            }
          );

        }); 
                
      },
      setDefaultKelas(){
        this.DataDB.update(
          {_id:'kelasdefault'},
          {_id:'kelasdefault',kelas:this.UI.SelectedKelas, rombel:this.UI.SelectedRombel},
          {upsert:true},
          (err)=>{
            if(err){
              this.notify(err);
              return;
            }
            this.notify("Updated Default Kelas");
          }
        );
      },
      getTotalMurid(){
        return new Promise((resolve,reject)=>{
          this.SiswaDB.count(
            {}, (err,count)=>{
              if(err){
                reject(err);
              }
              resolve(count);
            }
          )
        });
      },
      getTotalPelajaran(){
        return new Promise((resolve,reject)=>{
          this.PelajaranDB.count(
            {}, (err,count)=>{
              if(err){
                reject(err);
              }
              resolve(count);
            }
          )
        });
      },
      getTotalKD(){
         return new Promise((resolve,reject)=>{
          this.KdDB.count(
            {}, (err,count)=>{
              if(err){
                reject(err);
              }
              resolve(count);
            }
          )
        });
      },
      getTotalMuridKelas(){
        return new Promise((resolve,reject)=>{
          this.SiswaDB.count(
            {kelas:this.UI.SelectedKelas}, (err,count)=>{
              if(err){
                reject(err);
              }
              resolve(count);
            }
          )
        });
      },
      getKKM(){
        return new Promise((resolve,reject)=>{
          this.DataDB.find(
            {_id:'kkm'}, (err,docs)=>{
              if(err){
                reject(err);
              }
              resolve(docs[0].kkm);
            }
          )
        });
      },
      getNilaiAtasKKM(){
        let kkm = this.kkm;
        let cnt = 0;
        this.dataNilai.forEach(dtn => {
          let temparr = [];
          for(let dn of Object.values(dtn)){
            if(!isNaN(dn) && dn != 0)
              temparr.push(dn);
          }
          if(this.averageArr(temparr) > kkm)
            cnt++;
        });
        this.nilaiAtasKKM = cnt;
      },
      getNilaiBawahKKM(){
        let kkm = this.kkm;
        let cnt = 0;
        this.dataNilai.forEach(dtn => {
          let temparr = [];
          for(let dn of Object.values(dtn)){
            if(!isNaN(dn) && dn != 0)
              temparr.push(dn);
          }
          if(this.averageArr(temparr) < kkm)
            cnt++;
        });
        this.nilaiBawahKKM = cnt;
      },
      getNilaiRataRata(){
        let nilais = [];
        this.dataNilai.forEach(dtn => {
          let temparr = [];
          for(let dn of Object.values(dtn)){
            if(!isNaN(dn) && dn != 0)
              temparr.push(dn);
          }
          nilais.push(this.averageArr(temparr));
        });
        this.nilaiRataRata = this.averageArr(nilais);
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

        });
      },

      calcNilai(namasiswa, pelajaran,tipe,desckds,nilai){
        let nilaiA = this.averageArr(nilai);
        //create deskription.

        namasiswa = namasiswa.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
        return({
          pelajaran : pelajaran,
          tipe : tipe,
          nilai : nilaiA,

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
                  nilaiKeterampilan = this.calcNilai(syarat.siswa.nama,syarat.kd.pelajaran, 'keterampilan',syarat.kd.pengetahuandesc,tempNilai);
                  resolve({
                    pelajaran : syarat.kd.pelajaran,
                    pengetahuan : nilaiPengetahuan,
                    keterampilan : nilaiKeterampilan
                  });
              });          
          });          
        });

      },
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

      async prepareData(){
        //check if data is null or not
        if(!await this.getDefaultKelas()){
          console.log("no default kelas")
          return;
        }

        // all usefull varible and hardcode one
        let kelas = this.UI.SelectedKelas;
        let rombel = this.UI.SelectedRombel;
        let semester = this.UI.SelectedSemester;
        let dtSiswa = [];
        let dtNilai = {};
        let pel = [];
        let kd = [];
        let agama = ['Budha', 'Islam', 'Protestan', 'Katolik', 'Hindu', 'Konghucu'];
  
        //get pelajaran dan KD
        dtSiswa = await this.getSiswa(kelas,rombel);
        pel = await this.getPelajaran(kelas);
        console.log(semester,dtSiswa,pel,kd,dtNilai,agama);
        // select kd group by pelajaran and tipe
        // ['pengetahuan','keterampilan', 'sikap'];
        for(let i=0;i<pel.length;i++){
          let tempkd = {};
          tempkd.pelajaran = pel[i];
          tempkd.pengetahuan = await this.getKDgroup(pel[i],'pengetahuan',kelas,semester,true);
          tempkd.keterampilan = await this.getKDgroup(pel[i],'keterampilan',kelas,semester,true);
          kd.push(tempkd);
        }
        

        //configure all template      
        let templatesiswa = {
            _id:"",
            kelas:"",
            nama:"",
            NIS:"",
            NISN:"",
        };
        //Add header to table
        this.addToHeaderNilai();

        //getnilai
        //looping per siswa here
        for(let i =0; i<dtSiswa.length;i++){
          let dts = dtSiswa[i];
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

          //function after this
          this.addToDataNilai(dts,dtNilai);
        }
        this.getNilaiAtasKKM();
        this.getNilaiBawahKKM();
        this.getNilaiRataRata();
        this.updateGraph();
      },

      addToDataNilai(dtSiswa,dtNilai){
        let tempdtNilai = {};
        for(let [k, dtn] of Object.entries(dtNilai)){
          // Mencari nilai rata-rata keterampilan dan pengetahuan
          let nilaiAll = (dtn.keterampilan.nilai + dtn.pengetahuan.nilai) / 2;
          nilaiAll =  Math.round(((nilaiAll) + Number.EPSILON) * 100) / 100;
          tempdtNilai[k] = nilaiAll
        }
        tempdtNilai.nama = dtSiswa.nama;
        this.dataNilai.push(tempdtNilai);
        
      },

      async addToHeaderNilai(){
        let tempHeaders = [];
        let agama = ['Budha', 'Islam', 'Protestan', 'Katolik', 'Hindu', 'Konghucu'];
        let pelajarans = await this.getPelajaran(this.UI.SelectedKelas);
        //add agama
        tempHeaders.push({text:'Nama Siswa',value:'nama'});
        tempHeaders.push({text:'Agama',value:'Agama'});
        pelajarans.forEach(pelajaran => {
          if(agama.includes(pelajaran)){
            return;
          }
          let tempHeader = {};
          tempHeader.text = pelajaran;
          tempHeader.value = pelajaran;
          tempHeaders.push(tempHeader);
        });
        this.headersNilai = tempHeaders;
        return tempHeaders;
      },

      getRataRataPerPelajaran(){
        let dtn = this.dataNilai;
        let rata = [];
        let j = 0;
        for(let i = 0; i< dtn.length;i++){
          j = 0;
          for(let dn of Object.values(dtn[i])){
            if(!isNaN(dn) && dn !=0){
              if(rata[j]==undefined){
                rata[j]=0
              }
              rata[j]+=dn;
            }
            j++;
          }
        }

        for(let i =0 ;i<rata.length;i++){
          rata[i]=rata[i]/dtn.length;
        }

        let header = Object.keys(dtn[0]);
        header.pop();
        this.dataNilaiPerPelajaran = rata;
        return [header,rata];
      },

      async updateGraph(){
        this.graph1.data.datasets.forEach((dataset) => {
          dataset.data.push(this.nilaiAtasKKM);
          dataset.data.push(this.nilaiBawahKKM);
        });
        this.graph1.update();
        
        //select temp headers
        let [headersPelajaran,nilaiPerPelajaran] = await this.getRataRataPerPelajaran();


        this.graph2.data.labels = headersPelajaran;
        this.graph2.data.datasets[0].data = nilaiPerPelajaran;
        this.graph2.data.datasets[0].backgroundColor = 'rgb(54, 162, 235)';
        this.graph2.update();
        
        
      },

      async checkIfDBExist(){
        const dt =  new Promise((resolve,rejects)=>{
          this.DataDB.find(
            {},
            (err,docs)=>{
              if(err){
                rejects(false);
              }
              else{
                if(docs.length < 1){
                  rejects(false)
                }else{
                  resolve(true);
                }
              }
            }
            )
        });

        await dt.then(
          (rs) =>{
            if(rs)
              return(true);
          },
          (rj)=>{
            if(!rj)
              console.log(rj);
            return(false)
          }
        )
      }

    },  
    mounted() {
      

      //this.prepareData();
      //select temp headers


      let graph2Data=
        {
        labels: [],
        datasets: [{
          label: 'Nilai Rata-Rata Kelas',
          borderWidth: 1,
          data: [
          ]
        }]
      };

      this.graph2 = new Chart(document.getElementById('graph2'), {
        type: 'bar',
        data: graph2Data,
        options : {
          maintainAspectRatio: false,
        }
      });

      this.graph1 = new Chart(document.getElementById('graph1'),{
        type:'pie',
        data: {
          datasets : [{
            data : [

            ],
            backgroundColor:[
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
            ]
          }],
          labels:[
            'Di Atas KKM',
            'Di Bawah KKM'
          ]
        },
        options : {
          maintainAspectRatio:false,
        }
      })
    },
    created (){
      let Datastore = require('nedb');
      this.SiswaDB = new Datastore({ filename: 'SiswaDB.db', autoload: true });
      this.DataDB = new Datastore({ filename: 'DataDB.db', autoload: true });  
      this.NilaiDB = new Datastore({ filename: 'NilaiDB.db', autoload: true });  
      this.PelajaranDB = new Datastore({ filename: 'PelajaranDB.db', autoload: true })
      this.KdDB = new Datastore({filename: 'KdDB.db', autoload:true});

      this.refresh();
    }

  }
</script>
