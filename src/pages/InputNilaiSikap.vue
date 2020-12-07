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
            <h2>Input Nilai Sikap</h2>
        </v-card-title>
         
        <v-card-subtitle>
            Masukan nilai setiap murid
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
                    <v-btn class="ma-1" color="green lighten-1" @click="saveNilaiAll()"> 
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

    <v-expansion-panels>
        <v-expansion-panel
        >
        <v-expansion-panel-header>
            <b>Pengaturan keluaran nilai sikap</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
             <hot-table name="tblDl" ref="tblDl" :settings="tableDl"></hot-table>    
        </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>

    <v-spacer class="ma-5"></v-spacer>
    <v-card>
       <v-form>
            <v-card-text>
              <p>Masukan kelas, pelajaran, dan tipe KD yang akan dimasukan </p> 
              <h3>Kelas</h3>
              <v-row>
                

                  <v-col>
                    <v-select
                        :items="UI.SelectKelas"
                        label="Kelas"
                        solo
                        v-model="UI.SelectedKelas"
                        @change="getNilai()"
                        style="z-index:900"
                    >
                    </v-select>
                  </v-col>
                  <v-col>
                    <v-select
                        :items="UI.SelectRombel"
                        label="Rombel"
                        solo
                        v-model="UI.SelectedRombel"
                        @change="getNilai()"
                        style="z-index:900"
                    >
                    </v-select>
                  </v-col>
              </v-row>
            
            
            </v-card-text>
         </v-form>
    </v-card>
   
    <v-spacer class="ma-5"></v-spacer>
     <v-card v-if="UI.SelectedTipe == 'sikap'">
        <v-card-title>
            Nilai Sikap
        </v-card-title>
        <v-card-text>
 <hot-table name="tblSikap" ref="tblSikap" :settings="tableSikap"></hot-table>            
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="green"
                text
                @click="saveNilai()"
            >
                Save
            </v-btn>
         </v-card-actions>
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
    name: 'InputNilaiSikap',
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
            SelectPelajaran : [],
            SelectedPelajaran : "kelas1",
            SelectKelas : ["kelas1","kelas2","kelas3","kelas4","kelas5","kelas6"],
            SelectedKelas : "",
            SelectTipe : ['pengetahuan','keterampilan', 'sikap'],
            SelectedTipe : "sikap",
            SelectKd : [],
            SelectedKd : "",
            SelectedKdDesc : "",
            SelectRombel : ['a','b','c','d','e','f','g'],
            SelectedRombel : "",
        },
        //store previous UI data
        UIhist : {
            SelectedKelas : "",
            SelectedPelajaran : "",
            SelectedRombel : "",
            SelectedKd : ""
        },
        dataKkm :{
            _id : "kkm",
            kkm : 0,
            interval : 0,
            ket : []
        },
        dataLS : [
            {
                tipe:"sikap",
                pelajaran: "Taat Beribadah",
                kdId:"A",
                kd:"",
            },
            {
                tipe:"sikap",
                pelajaran: "Berperilaku Syukur",
                kdId:"A",
                kd:"",
            },
            {
                tipe:"sikap",
                pelajaran: "Berdoa",
                kdId:"A",
                kd:"",
            },
            {
                tipe:"sikap",
                pelajaran: "Toleransi Agama",
                kdId:"A",
                kd:"",
            },
            {
                tipe:"sikap",
                pelajaran: "Jujur",
                kdId:"A",
                kd:"",
            },
            {
                tipe:"sikap",
                pelajaran: "Disiplin",
                kdId:"A",
                kd:"",
            },
            {
                tipe:"sikap",
                pelajaran: "Bertanggung Jawab",
                kdId:"A",
                kd:"",
            },
            {
                tipe:"sikap",
                pelajaran: "Santun",
                kdId:"A",
                kd:"",
            },
            {
                tipe:"sikap",
                pelajaran: "Peduli",
                kdId:"A",
                kd:"",
            },
            {
                tipe:"sikap",
                pelajaran: "Pecaya Diri",
                kdId:"A",
                kd:"",
            }
        ],
        dataNilai: {
            pengetahuan : [
                {
                    siswa : {
                        nama : '',
                        NIS : '',
                        NISN : '',
                        kelas : '',
                        rombel : '',
                    },
                    pelajaran : {
                        pelajaran : '',
                        tipe:'',
                    },
                    harin : [],
                    NPH : '',
                    NPTS : '',
                    NPAS : '',
                    nilaiAkhir: '',
                    predikat : ''
                }
            ],
            keterampilan : [{
                siswa : {
                    nama : '',
                    NIS : '',
                    NISN : '',
                    kelas : '',
                    rombel : '',
                },
                pelajaran : {
                    pelajaran : '',
                    tipe:'',
                },
                praktik : '',
                produk : '',
                proyek : '',
                nilaiAkhir: '',
                predikat : ''
            }],
            sikap : [{
                siswa : {
                        nama : '',
                        NIS : '',
                        NISN : '',
                        kelas : '',
                        rombel : '',
                    },
                spiritual : {
                    'taat beribadah' : '',
                    'berperilaku syukur' : '',
                    'berdoa' : '',
                    'toleransi beragama' : '',
                },
                sosial : {
                    'jujur' : '',
                    'disiplin' : '',
                    'bertanggung jawab' : '',
                    'santun' : '',
                    'peduli': '',
                    'percaya diri' : '',
                }
            }],
        },
    }),
     methods: {
        async refresh(){
            let isExist = await this.checkIfDBExist();
            if(isExist){
                this.getDefaultKelas();
                this.getKkm();
                await this.getAllLuaranSikap();
            }
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
            })
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
        },

        refreshTable(){
            this.$refs.tblSikap.hotInstance.loadData(this.dataNilai.sikap);
            //this.$refs.tblDl.hotInstance.loadData(this.dataLS);
        },
      
        getNilai(){
            console.log("get nilai");
            this.UI.loading = true;
            let kelas,rombel = null;
            this.dataNilai.sikap = [];
            kelas = this.UI.SelectedKelas;
            rombel = this.UI.SelectedRombel;
            let tipe = this.UI.SelectedTipe;
            if(kelas == "" || rombel == ""){
                 this.UI.loading = false;
                return;
            }
            this.NilaiDB.find(
                {$and:[{"siswa.kelas":kelas},{"siswa.rombel":rombel},{"tipe":tipe}]},
                {_id:0})
                .sort({"siswa.nama":1})
                .exec((err,docs) => {
                    if(err){
                        console.log(err);
                        return;
                    }
                    if(docs == undefined || docs.length == 0){
                        // somehow this code run in asynchronus 
                        // so i seperate data input and table rendere in other function
                        console.log("create nilai")
                        this.createNilaiSikap();
                    }else{
                        console.log("data get");
                        this.dataNilai.sikap = docs;
                        console.log(this.dataNilai.sikap);
                        this.refreshTable(); 
                    } 
                                  
                }
            )
            this.UI.loading = false;
           
        },

        // isArchive store data without click save
        saveNilai(){
            console.log("savenilai");
            this.UI.loading = true;
            let kelas,rombel,tipe = "";
            kelas = this.UI.SelectedKelas;
            rombel = this.UI.SelectedRombel;
            tipe = this.UI.SelectedTipe;
    
            if(kelas == "" || rombel == "" ){
                console.log("kosong");
                this.UI.loading = false;
                return;
            }

            this.NilaiDB.remove(
                {$and:[{"siswa.kelas":kelas},{"siswa.rombel":rombel},{'tipe':tipe}]},
                {multi:true},
                (err) => {
                    if(err){
                        console.log(err);
                        this.UI.loading=false;
                        return;
                    }
                }
            );

            let dNilai = [];
            dNilai = this.dataNilai.sikap;



            this.NilaiDB.insert(
                dNilai,
                (err)=>{
                    if(err){
                        console.log(err);
                    }
                }
            );

            this.UI.loading = false;
        },
        saveNilaiAll(){
            this.notify("Saving Nilai")
            this.saveNilai();
        },
        deleteNilai(){
            this.UI.loading = true;
            this.UI.loading = false;
        },
        createNilaiSikap(){
            let kelas = this.UI.SelectedKelas;
            let rombel = this.UI.SelectedRombel;
            let tipe = this.UI.SelectedTipe;
            this.SiswaDB.find(
                {$and: [{kelas:kelas},{rombel:rombel}]},
                {nama:1, NIS:1, NISN:1,agama:1})
                .sort({nama:1})
                .exec((err,docs)=> {
                    if(err){
                        console.log(err);
                        return;
                    }
                    let tempNilai = [];
                    console.log(docs);
                    docs.map((s)=>{
                        tempNilai.push({
                            tipe : tipe,
                            siswa : {
                                nama : s.nama,
                                NIS : s.NIS,
                                NISN : s.NISN,
                                kelas : kelas,
                                rombel : rombel,
                            },
                            spiritual : {
                                'taat beribadah' : '',
                                'berperilaku syukur' : '',
                                'berdoa' : '',
                                'toleransi beragama' : '',
                            },
                            sosial : {
                                'jujur' : '',
                                'disiplin' : '',
                                'bertanggung jawab' : '',
                                'santun' : '',
                                'peduli': '',
                                'percaya diri' : '',
                            }
                        });
                        this.dataNilai.sikap = tempNilai;
                        this.refreshTable()
                    });
                })
            

        },

        ///Luaran
        // get All Kd
        async getAllLuaranSikap(){
            for(let i=0; i<this.dataLS.length; i++){
                let dls = this.dataLS[i]; 
                let tdls = await this.getLuaranSikap(dls.pelajaran, dls.kdId);
                if(tdls.length > 0){
                    this.dataLS[i] = tdls[0];
                } 
                console.log(tdls);
            }
        },
        // getKD 
        getLuaranSikap(pelajaran, kdId){
            return new Promise((resolve,reject)=>{
                this.KdDB.find(
                    {tipe:'sikap', pelajaran:pelajaran, kdId:kdId},
                    {_id:0},
                    (err,docs)=>{
                        if(err){
                            this.notify(err);
                            reject(err);
                        }
                        resolve(docs);
                        
                    }
            )


            })
        },
        //saveLD
        saveLuaranSikap(luaran){
            let l = luaran;
            return new Promise((resolve,reject)=>{
                this.KdDB.update(
                    {tipe:'sikap',pelajaran:l.pelajaran, kdId:l.kdId},
                    l,
                    {upsert: true},
                    (err)=>{
                        if(err){
                            console.log(err);
                            this.notify(err);
                            reject(err);
                        }
                    }
                )
                resolve(true);
            });
        },

        // all other method
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
                this.UI.SelectedKelas = docs[0].kelas;
                this.UI.SelectedRombel = docs[0].rombel;
                resolve(docs[0]);
                }
            );

            }); 
                    
        },
     },

    computed : {
        tableDl(){
            return{
                licenseKey: 'non-commercial-and-evaluation',
                width: '100%',
                height: 300,
                stretchH: 'all',
                data: this.dataLS,
                allowInsertRow: false,
                colHeaders: ['Sikap','Nilai','Luaran'],
                manualColumnResize: [200,70,800],
                columns : [
                    {
                        data:'pelajaran'
                    },
                    {
                        data:'kdId',
                        type: 'dropdown',
                        source: ['A','B','C']
                    },
                    {data:'kd'}
                ],
                
                modifyData: async (row, columns, valueHolder, ioMode) => {
                    if(ioMode == "set"){
                        let dls = this.dataLS[row];
                        if(columns == 2){
                            await this.saveLuaranSikap(dls);
                        }
                        else if(columns == 1){
                            let tdls = (await this.getLuaranSikap(dls.pelajaran,valueHolder.value));
                            if(tdls.length > 0){
                                this.dataLS[row].kd = tdls[0].kd;
                            }
                            else{
                                this.dataLS[row].kd = " ";
                            }
                            this.$refs.tblDl.hotInstance.loadData(this.dataLS);
                            
                        }
                    }

                    
                }
                
            }
        },
      
        tableSikap(){
            return{
                style: 'thead{z-index:-1;}',
                licenseKey: 'non-commercial-and-evaluation',
                width: '100%',
                height: 300,
                stretchH: 'all',
                formulas:true,
                contextMenu: {
                    items : {
                        'undo':{},
                        'redo':{},
                        '---------':{}
                    }
                },
                allowInsertRow: false,
                colHeaders: true,
                rowHeaders : true,
                fixedColumnsLeft: 1,
                nestedHeaders :
                [
                    [{label:'', colspan:1},{label:'Spiritual', colspan:4},{label:'Sosial', colspan:6}],
                    ['Nama','Taat Beribadah','Berperilaku Syukur','Berdoa', 'Toleransi Agama', 'Jujur','Disiplin','Bertanggung Jawab','Santun','Peduli','Percaya Diri']
                ],
                columns : [
                    {
                        data: 'siswa.nama'
                    },
                    {
                        data: "spiritual.'taat beribadah'",
                        type: 'dropdown',
                        source: ['A','B','C']
                    },
                    {
                        data: "spiritual.'berperilaku syukur'",
                        type: 'dropdown',
                        source: ['A','B','C']
                    },
                    {
                        data: "spiritual.'berdoa'",
                        type: 'dropdown',
                        source: ['A','B','C']
                    },
                    {
                        data: "spiritual.'toleransi beragama'",
                        type: 'dropdown',
                        source: ['A','B','C']
                    },
                    {
                        data: "sosial.'jujur'",
                        type: 'dropdown',
                        source: ['A','B','C']
                    },
                    {
                        data: "sosial.'disiplin'",
                        type: 'dropdown',
                        source: ['A','B','C']
                    },
                    {
                        data: "sosial.'bertanggung jawab'",
                        type: 'dropdown',
                        source: ['A','B','C']
                    },
                    {
                        data: "sosial.'santun'",
                        type: 'dropdown',
                        source: ['A','B','C']
                    },
                    {
                        data: "sosial.'peduli'",
                        type: 'dropdown',
                        source: ['A','B','C']
                    },
                    {
                        data: "sosial.'percaya diri'",
                        type: 'dropdown',
                        source: ['A','B','C']
                    },
                    

                  
                ],   
                data: this.dataNilai.sikap,
                
                // Calculate Cell
                modifyData: (row, columns, valueHolder, ioMode) => {
                    //console.log(row,columns,valueHolder, ioMode);
                    if(ioMode == "set"){
                        this.saveNilai();
                    }             
                }
            };
        },
      

    },
    created (){
        let Datastore = require('nedb');
        this.PelajaranDB = new Datastore({ filename: 'PelajaranDB.db', autoload: true })
        this.KdDB = new Datastore({filename: 'KdDB.db', autoload:true});
        this.SiswaDB = new Datastore({ filename: 'SiswaDB.db', autoload: true });
        this.NilaiDB = new Datastore({ filename: 'NilaiDB.db', autoload: true });
        this.DataDB = new Datastore({ filename: 'DataDB.db', autoload: true });
        
    },
    mounted (){
    }
  }
</script>
