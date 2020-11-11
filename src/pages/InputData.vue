<!-- This component contain InputData Menu (2) -->

<style scoped>
  .user-tbl {
    z-index: 0;
    margin-top: 10px ;
  }

</style>
<template>
  <v-container class="user-container">
    <v-card 
        class="white"
        :loading="loading"
    >
        <v-card-title class="pa-4">
            <h2>Input Data</h2>
        </v-card-title>
         
        <v-card-subtitle>
            Masukan data-data dasar seperti indentitas sekolah, identitas kelas, identitas kepala sekolah
            , identitas guru, dan daftar pelajaran.
        </v-card-subtitle>
        <v-card-actions>
            <v-row>
                <v-col>
                    <v-btn class="ma-1" color="blue lighten-2" v-on:click="RefreshDB"> 
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
                    <v-btn class="ma-1" color="green lighten-1"> 
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


    <v-spacer></v-spacer>
    <v-row>
      <v-col >  
        <!-- Identitas Skolah -->
        <v-card class="white"  elevation="n - 1">
          <!-- Form Start Here -->
          <v-form>
            <v-card-text>
              <h2>Identitas Sekolah</h2>
              <p> Masukan Identitas Dasar Sekolah </p> 
              <v-row>
                <v-col>  
                  <v-text-field
                    :dense=true
                    v-model="sekolah.nama"
                    label="Nama Sekolah"
                  ></v-text-field> 
      
                  <v-text-field
                    :dense=true
                    v-model="sekolah.NPSN"
                    label="NPSN"
                  ></v-text-field> 
      
                  <v-text-field
                    :dense=true
                    v-model="sekolah.alamat"
                    label="Alamat Sekolah"
                  ></v-text-field> 
      
                  <v-text-field
                    :dense=true
                    v-model="sekolah.desa"
                    label="Desa/Kelurahan"
                  ></v-text-field> 
      
                  <v-text-field
                    :dense=true
                    v-model="sekolah.dinas"
                    label="Dinas"
                  ></v-text-field> 

                  <v-select
                    :dense=true
                    :items=ikk
                    label="Kabupaten / Kota"
                    v-model="sekolah.kabupaten1"
                  ></v-select> 

                  <v-text-field
                    :dense=true
                    v-model="sekolah.kabupaten2"
                    label="Kabupaten"
                  ></v-text-field> 

                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn v-on:click="CardDelete('sekolah')" text>Delete</v-btn>
              <v-btn v-on:click="CardSave('sekolah')" text>Save</v-btn>

            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
   
      <v-col>
        <!-- Identitas Kelas -->
        <v-card class="white"  elevation="n - 1">
          <!-- Form Start Here -->
          <v-form>
            <v-card-text>
              <h2>Identitas Kelas</h2>
              <p>Geser Slider sesuai banyak ruang rombel per kelas </p>
              <v-row>
                <v-col>  
                  <v-slider
                    v-model="kelas.kelas1"
                    :tick-labels="ikls_label"
                    :max="5"
                    step="1"
                    ticks="always"
                    tick-size="4"
                    label="Kelas 1"
                    color="deep-orange accent-3"
                  ></v-slider>

                  <v-slider
                    v-model="kelas.kelas2"
                    :tick-labels="ikls_label"
                    :max="5"
                    step="1"
                    ticks="always"
                    tick-size="4"
                    label="Kelas 2"
                    color="deep-orange accent-3"
                  ></v-slider>

                  <v-slider
                    v-model="kelas.kelas3"
                    :tick-labels="ikls_label"
                    :max="5"
                    step="1"
                    ticks="always"
                    tick-size="4"
                    label="Kelas 3"
                    color="deep-orange accent-3"
                  ></v-slider>

                  <v-slider
                    v-model="kelas.kelas4"
                    :tick-labels="ikls_label"
                    :max="5"
                    step="1"
                    ticks="always"
                    tick-size="4"
                    label="Kelas 4"
                    color="deep-orange accent-3"
                  ></v-slider>

                  <v-slider
                    v-model="kelas.kelas5"
                    :tick-labels="ikls_label"
                    :max="5"
                    step="1"
                    ticks="always"
                    tick-size="4"
                    label="Kelas 5"
                    color="deep-orange accent-3"
                  ></v-slider>

                  <v-slider
                    v-model="kelas.kelas6"
                    :tick-labels="ikls_label"
                    :max="5"
                    step="1"
                    ticks="always"
                    tick-size="4"
                    label="Kelas 6"
                    color="deep-orange accent-3"
                  ></v-slider>

                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn v-on:click="CardDelete('kelas')" text>Delete</v-btn>
              <v-btn v-on:click="CardSave('kelas')" text>Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <br/>
    <v-row>
      <v-col>  
        <!-- Identitas Kepala Sekolah -->
        <v-card class="white"  elevation="n - 1">
          <!-- Form Start Here -->
          <v-form>
            <v-card-text>
              <h2>Identitas Kepala Sekolah</h2>
              <p>Masukan Identitas Kepala Sekolah </p> 
              <v-row>
                <v-col>  
                  <v-text-field
                    :dense=true
                    v-model="kepala.nama"
                    label="Kepala Sekolah"
                  ></v-text-field> 
                  <v-text-field
                    :dense=true
                    v-model="kepala.NIP"
                    label="NIP Kepala Sekolah"
                  ></v-text-field>

                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn v-on:click="CardDelete('kepala')" text>Delete</v-btn>
              <v-btn v-on:click="CardSave('kepala')" text>Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>

      <v-col  >
        <!-- Identitas Guru -->
        <v-card class="white"  elevation="n - 1">
          <!-- Form Start Here -->
          <v-form>
            <v-card-text>
              <h2>Identitas Guru</h2>
              <p>Pilih kelas dan rombel, kemudian masukan data guru kelas</p>
              <v-row>
                <v-col cols="6">
                  <h5>Pilih Kelas</h5>  
                  <v-select
                    :dense=true
                    :items=kelas_label
                    label="Kelas"
                    v-model="guru.kelas"
                  ></v-select> 
                  <v-select
                    :dense=true
                    :items=ikls_label
                    label="Rombel"
                    v-model="guru.rombel"
                  ></v-select> 
                  
                </v-col>
                <v-col cols="6">
                  <h5>Guru Kelas</h5>  
                  <v-text-field
                    :dense=true
                    v-model="guru.nama"
                    label="Nama Guru"
                  ></v-text-field> 
                  <v-text-field
                    :dense=true
                    v-model="guru.NIP "
                    label="NIP Guru Kelas"
                  ></v-text-field>
      
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn v-on:click="CardDelete('guru')" text>Delete</v-btn>
              <v-btn v-on:click="CardSave('guru')" text>Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <br/>

    <!-- Daftar Pelajaran -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <h2>Daftar pelajaran</h2>
            <p> Checklist pelajaran sesuai kelas</p>

            <!-- Dialog Tambah Pelajaran -->
            <v-dialog v-model="dialogAddPelajaran.status" max-width="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              v-bind="attrs"
              v-on="on"> 
                Tambah Pelajaran 
              </v-btn>
            </template>

            <v-card>
              <v-card-title>Tambah Pelajaran</v-card-title>
              <v-card-subtitle>Masukan nama pelajaran kemudian klik add</v-card-subtitle>
              <v-card-text>
                <v-text-field
                    :dense=true
                    v-model="dialogAddPelajaran.pelajaran"
                    label="Nama Pelajaran"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialogAddPelajaran.status = false">Close</v-btn>
                <v-btn text @click="AddPelajaran()">Add</v-btn>
              </v-card-actions>
            </v-card>
            </v-dialog>
            
            <!-- Dialog Hapus Pelajaran -->
            <v-dialog v-model="dialogDeletePelajaran.status" scrollable max-width="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              v-bind="attrs"
              v-on="on"> 
                Hapus Pelajaran 
              </v-btn>
            </template>

            <v-card>
              <v-card-title>Hapus Pelajaran</v-card-title>
              <v-card-subtitle>Pilih pelajaran kemudian klik delete</v-card-subtitle>

              <v-card-text>
                <v-radio-group  v-model="dialogDeletePelajaran.pelajaran">
                  <v-radio 
                  v-for="pelajara in pelajaran.list" 
                  :key="pelajara.pelajaran"
                  :label="pelajara.pelajaran" 
                  :value="pelajara.pelajaran"></v-radio>
                  
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialogDeletePelajaran.status = false">Close</v-btn>
                <v-btn text @click="DeletePelajaran()">delete</v-btn>
              </v-card-actions>
            </v-card>
            </v-dialog>

            <br/>
            <hot-table ref="tblPelajaran" :settings="tblPelajaranSettings"></hot-table>    
            
          </v-card-text>
          <v-card-actions>
              <v-btn v-on:click="CardDelete('pelajaran')" text>Delete</v-btn>
              <v-btn v-on:click="CardSave('pelajaran')" text>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
      <v-card class="white"  elevation="n - 1">
      <!-- Form Start Here -->
      <v-form>
        <v-card-text>
          <h2>KKM</h2>
          <p>Masukan KKM Nilai</p>
          <v-row>
            <v-col cols="1" lg="1" md="2" sm="3" xs="3">
            <v-slider
                v-model="kkm.kkm"
                class="align-center"
                max="100"
                min="0"
                vertical
                @change="CalculateKKM(kkm.kkm)"
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="kkm.kkm"
                    class="ma-0 pd-0"
                    style="text-align:center "
                    label="KKM"
                    single-line
                    type="number"
                    outlined
                    dense
                    @change="CalculateKKM(kkm.kkm)"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-col>
            <v-col>
              <v-simple-table>
                <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Predikat
                    </th>
                    <th class="text-left">
                      Min
                    </th>
                    <th class="text-left">
                      Max
                    </th>
                    <th class="text-left">
                      Deskripsi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="k in kkm.ket"
                    :key="k.predikat"
                  >
                    <td>{{ k.predikat }}</td>
                    <td>{{ k.rentangMin}}</td>
                    <td>{{ k.rentangMax}}</td>
                    <td>{{ k.desc }}</td>
                  </tr>
                </tbody>
              </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
      <v-card-actions>
        <v-btn v-on:click="CardSave('kkm')" text>Save</v-btn>
      </v-card-actions>
      </v-card>
      </v-col>
    </v-row>

    
    <!-- Snackbar or Notification html -->
    <!-- note : dont change -->
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
    name: 'InputData',

    data: () => ({
      // all ui-related variable her
      snackbar : {
        status : false,
        timeout : 1000,
        text : ""
      },
      ikk : ['Kabupaten','Kota'],
      ikls_label : ['a','b','d','e','f','g','h','h'],
      kelas_label : ["kelas1","kelas2","kelas3","kelas4","kelas5","kelas6"],
      dialogAddPelajaran : {
        status : false,
        pelajaran : ""
      },
      dialogDeletePelajaran : {
        status : false,
        pelajaran : ""
      },
      loading:false,
      
      // all form model variable here
      sekolah : {
        _id : "sekolah",
        nama : "",
        NPSN : "",
        alamat : "",
        desa : "",
        dinas : "",
        kabupaten : "",
        kabupaten1 : "",
        kabupaten2 : "",
        provinsi : ""

      },
      kelas : {
        _id : "kelas",
        kelas1 : "",
        kelas2 : "",
        kelas3 : "",
        kelas4 : "",
        kelas5 : "",
        kelas6 : ""
      },
      kepala : {
        _id : "kepala",
        nama : " ",
        NIP : " "
      },
      guru : {
        _id : "guru",
        kelas : "",
        rombel: "",
        nama: "",
        NIP:""
      },
      pelajaran : {
        _id : "pelajaran",
        list : [
          ]
      },
      kkm : {
        _id : "kkm",
        kkm : 70,
        interval : 10,
        ket : [
          {predikat:'D', rentangMin:0, rentangMax:69.99, desc:"perlu bimbingan"},
          {predikat:'C', rentangMin:70, rentangMax:79.99, desc:"cukup "},
          {predikat:'B', rentangMin:80, rentangMax:89.99, desc:"baik"},
          {predikat:'A', rentangMin:90, rentangMax:99.99, desc:"sangat baik"}

        ]
      },
      // DB related variable
      db : null,
      test :null,

    }),
    computed : {

      // Variable for Hot Table daftar pelajaran
      tblPelajaranSettings () {
        return {
          licenseKey: 'non-commercial-and-evaluation',
          autoRowSize: false,
          autoColumnSize: false,
          data: this.pelajaran.list,
          colHeaders:['Pelajaran','Kelas 1','Kelas 2','Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
          stretchH: 'all',
          columns: [
            {
              data : 'pelajaran'
            },
            {
              data : 'kelas1',
              type : 'checkbox'
            },
            {
              data : 'kelas2',
              type : 'checkbox'
            },
            {
              data : 'kelas3',
              type : 'checkbox'
            },
            {
              data : 'kelas4',
              type : 'checkbox'
            },
            {
              data : 'kelas5',
              type : 'checkbox'
            },
            {
              data : 'kelas6',
              type : 'checkbox'
            }
          ],

          className : 'user-tbl',
          

        }
      }
      
    },
    methods : {
      //method for calculate kkm
      CalculateKKM(kkm){
        let tempKKM = this.kkm.ket;
        //set kkm u predikat D
        tempKKM[0].rentangMin = 0;
        tempKKM[0].rentangMax = (kkm-0.01);
        //calc inteval
        let interval = (100 - kkm) / 3;
        interval = Math.round((interval + Number.EPSILON) * 100) / 100;
        this.kkm.interval = interval;
        //set kkm u predikat lain
        for(let i=1; i< 4; i++){
          tempKKM[i].rentangMin = kkm + ((i-1)*interval);
          tempKKM[i].rentangMin = Math.round((tempKKM[i].rentangMin + Number.EPSILON) * 100) / 100;
          if(i == 3){
            tempKKM[i].rentangMax = 100;
          }
          else{
            tempKKM[i].rentangMax = kkm + (i*interval) - 0.01;
            tempKKM[i].rentangMax = Math.round((tempKKM[i].rentangMax + Number.EPSILON) * 100) / 100;
          }
        }
      },
      // Methods for resetting button
      CardDelete(subcard) {
        this.loading = true;
        // special for card pelajaran
        if(subcard == "pelajaran"){
         for(let i = 0; i < this.pelajaran.list.length; i++){
           this.pelajaran.list[i].kelas1 = false;
           this.pelajaran.list[i].kelas2 = false;
           this.pelajaran.list[i].kelas3 = false;
           this.pelajaran.list[i].kelas4 = false;
           this.pelajaran.list[i].kelas5 = false;
           this.pelajaran.list[i].kelas6 = false;
         }
         // reload Table
          this.$refs.tblPelajaran.hotInstance.loadData(this.pelajaran.list);
        }
        else {
          for(let i in eval("this."+subcard)){
            if(eval("this."+subcard)[i] != '_id'){
              eval("this."+subcard)[i] = "";
            }
          }
        }

        this.snackbar.text = "Resetting form "+ subcard;
        this.snackbar.status = true;
        this.loading=false
      },

      // Methods for saving data per each card
      CardSave(subcard) {
        this.loading = true;
        if(subcard == "pelajaran"){
          let pelajarans = this.pelajaran.list
          console.log(pelajarans);
          for(let i in pelajarans){

            this.PelajaranDB.update(
              {pelajaran : pelajarans[i]['pelajaran']},
              {$set : pelajarans[i]},
              {upsert : true},
              function (err, numReplaced, upsert) {
                console.log("errr");
                console.log(err);
                console.log(numReplaced);
                console.log(upsert);
              }
            )

          }
        }
        this.DataDB.update(
          { _id: eval("this."+(subcard))._id }, 
          { $set:  eval("this."+(subcard)) }, 
          { upsert: true}, 
          function (err) {
            console.log(err);
          }
        )

        this.snackbar.text = "Saving form "+ subcard;
        this.snackbar.status = true;
        this.loading = false;
      },

      RefreshDB(){         
        this.loading = true;
        this.DataDB.find( {}, (err, docs) => {
           for(var i in docs){
             if(docs[i]._id == "sekolah"){
               this.sekolah = docs[i];
             }
             else if(docs[i]._id == "kelas"){
              this.kelas = docs[i];
             }
             else if(docs[i]._id == "kepala"){
               this.kepala = docs[i];
             }
             else if(docs[i]._id == "guru"){
               this.guru = docs[i];
             }
             else if(docs[i]._id == "pelajaran"){
               this.pelajaran = docs[i];
             }
             else if(docs[i]._id == "kkm"){
               this.kkm = docs[i];
             }
             else {
               console.log(err);
             }
           }

           this.PelajaranDB.find({}, (er,docs)=>{
             console.log("pelajaran :")
             console.log(docs);
             console.log(err);
           });
            // Reload Table
            this.$refs.tblPelajaran.hotInstance.loadData(this.pelajaran.list);


         });
         this.loading = false;
      },

      // Method for daftar pelajaran
      AddPelajaran(){
        this.pelajaran.list.push(
          {pelajaran: this.dialogAddPelajaran.pelajaran, kelas1:false, kelas2 : false, kelas3:false, kelas4:false, kelas5:false, kelas6:false}
        )
        this.dialogAddPelajaran.pelajaran = "";
        this.$refs.tblPelajaran.hotInstance.loadData(this.pelajaran.list);
        this.dialogAddPelajaran.status = false;
      },
      DeletePelajaran(){
        console.log("del");
        for(let i = 0; i < this.pelajaran.list.length; i++){
          console.log(this.pelajaran.list[i].pelajaran," => ",this.dialogDeletePelajaran.pelajaran);
          if(this.pelajaran.list[i].pelajaran == this.dialogDeletePelajaran.pelajaran){
            this.pelajaran.list.splice(i,1);
            break;
          }
        }
        this.dialogDeletePelajaran.pelajaran = "";
        this.$refs.tblPelajaran.hotInstance.loadData(this.pelajaran.list);
        this.dialogDeletePelajaran.status = false;
      }


    },
    created () {
      var Datastore = require('nedb');
      this.DataDB = new Datastore({ filename: 'DataDB.db', autoload: true });
      this.PelajaranDB = new Datastore({ filename: 'PelajaranDB.db', autoload: true })
      this.RefreshDB();

    },
    components: {
      HotTable
    }
  }
</script>
