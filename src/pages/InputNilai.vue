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
            <h2>Input Nilai</h2>
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
                        @change="getPelajaran()"
                        
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
                        
                    >
                    </v-select>
                  </v-col>
              </v-row>
              <h3>Pelajaran</h3>
              <v-row>
                <v-col >  
                    <v-select
                        :items="UI.SelectPelajaran"
                        label="Pelajaran"
                        solo
                        v-model="UI.SelectedPelajaran"
                        @change="getKd()"
                    >
                    </v-select>

                </v-col >
                <v-col >  
                    <v-select
                        :items="UI.SelectTipe"
                        label="Tipe"
                        solo
                        v-model="UI.SelectedTipe"
                        @change="getKd()"
                    >
                    </v-select>

                </v-col>
              </v-row>
            
            <h3>Kompetensi Dasar</h3>
            <v-select
                :items="UI.SelectKd"
                item-text="kd"
                item-value="kdId"
                label="Kompetensi dasar"
                solo
                v-model="UI.SelectedKd"
                @change="getNilai()"
            >
            </v-select>
            </v-card-text>
         </v-form>
    </v-card>
    <v-spacer class="ma-5"></v-spacer>
    <v-card v-if="UI.SelectedTipe == 'pengetahuan'">
        <v-card-title>
            Nilai Pengetahuan
        </v-card-title>
        <v-card-text>
             <hot-table name="tblPengetahuan" ref="tblPengetahuan" :settings="tablePengetahuan"></hot-table>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="green"
                text
            >
                Save
            </v-btn>
         </v-card-actions>
    </v-card>

    <v-spacer class="ma-5"></v-spacer>
    <v-card v-if="UI.SelectedTipe == 'keterampilan'">
        <v-card-title>
            Nilai Keterampilan
        </v-card-title>
        <v-card-text >
             <hot-table name="tblKeterampilan" ref="tblKeterampilan" :settings="tableKeterampilan"></hot-table>
        </v-card-text>
         <v-card-actions>
            <v-btn
                color="green"
                text
            >
                Save
            </v-btn>
         </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
  import { HotTable } from '@handsontable/vue';
  export default {
    name: 'InputNilai',
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
            SelectedTipe : "",
            SelectKd : [],
            SelectedKd : "",
            SelectRombel : ['a','b','c','d','e','f','g'],
            SelectedRombel : "",
        },
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
                    nilaiAkhir: '=SUM(nama1:NPAS1)'
                }
            ],
            keterampilan : [
                {
                    nama : '',
                }
            ],
            sikap : [
                {
                    nama : '',
                }
            ],
        },
    }),
     methods: {
        refresh(){
           console.log(eval("this.dataNilai"))
           this.refreshTable('pengetahuan');
        },
        refreshTable(tableRef){
            console.log("load table data");
            if(tableRef == 'pengetahuan'){
                this.$refs.tblPengetahuan.hotInstance.loadData(this.dataNilai.pengetahuan);
            }
            else if(tableRef == 'keterampilan'){
                this.$refs.tblKeterampilan.hotInstance.loadData(this.dataNilai.keterampilan);
            }


        },
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
            this.KdDB.find(
                {$and: [{kelas:kelas},{pelajaran:pelajaran},{tipe:tipe}]},
                {kdId:1, kd:1},
                (err,docs) =>{
                   if(err){
                        console.log("err" + err);
                    }
                    console.log(docs);
                    this.UI.SelectKd = docs;
                }
            )
            this.UI.loading = false;
            
        },
        getNilai(){
            let kelas = this.UI.SelectedKelas;
            let rombel = this.UI.SelectedRombel;
            let tipe = this.UI.SelectedTipe;
            let kd = this.UI.SelectedKd;
            let pelajaran = this.UI.SelectedPelajaran;
            if(kelas == "" || rombel == "" || tipe == "" || kd == "" || pelajaran == ""){
                console.log("kosong");
                return;
            }

            this.NilaiDB.find(
                {$and:[{"siswa.kelas":kelas},{"siswa.rombel":rombel},{"pelajaran.pelajaran":pelajaran},{"pelajaran.tipe":tipe}, {"pelajaran.kd":kd}]},
                (err,docs) => {
                    if(err){
                        console.log(err);
                        return;
                    }
                    let tempNilai = [];
                    if(docs == undefined || docs.length == 0){
                        console.log("kosong");
                        // somehow this code run in asynchronus 
                        // so i seperate data input and table rendere in other function
                        this.createNilaiPengetahuan();
                        
                    }else{
                        if(tipe == 'pengetahuan'){
                            this.dataNilai.pengetahuan = tempNilai;
                            this.refreshTable('pengetahuan');
                        }
                        else if(tipe == 'keterampilan'){
                            this.dataNilai.keterampilan = tempNilai;
                            this.refresh('keterampilan');
                        }
                        else if(tipe == 'sikap'){
                            this.dataNilai.sikap = tempNilai;
                        }
                    } 
                                  
                }
            )
           
            
        },
        saveNilai(){

        },

        createNilaiPengetahuan(){
            let kelas = this.UI.SelectedKelas;
            let rombel = this.UI.SelectedRombel;
            let tipe = this.UI.SelectedTipe;
            let kd = this.UI.SelectedKd;
            let pelajaran = this.UI.SelectedPelajaran;
           
            this.SiswaDB.find(
                {$and: [{kelas:kelas},{rombel:rombel}]},
                {nama:1, NIS:1, NISN:1},
                (err,docs)=> {
                    if(err){
                        console.log(err);
                        return;
                    }
                    let tempNilai = [];
                    console.log("data siswa");
                    console.log(docs);
                    docs.map((s)=>{
                        tempNilai.push(
                        {
                            siswa : {
                                nama : s.nama,
                                NIS : s.NIS,
                                NISN : s.NISN,
                                kelas : kelas,
                                rombel : rombel,
                            },
                            pelajaran : {
                                pelajaran : pelajaran,
                                tipe: tipe,
                                kd : kd
                            },
                            harin : [],
                            // kalkulasi persentase nilai
                            NPH : "=B1+U1",
                            NPTS : '',
                            NPAS : '',
                            nilaiAkhir: '=(V1*0.5)+(W1*0.25)+(X1*0.25)'
                        }
                        )                              
                    });
                    console.log("data siswa enter");
                    console.log(tempNilai);

                    if(tipe == 'pengetahuan'){
                        this.dataNilai.pengetahuan = tempNilai;
                        console.log(this.NilaiDB);
                        this.refreshTable('pengetahuan');
                    }
                    else if(tipe == 'keterampilan'){
                        this.dataNilai.keterampilan = tempNilai;
                        this.refresh('keterampilan');
                    }
                    else if(tipe == 'sikap'){
                        this.dataNilai.sikap = tempNilai;
                    }
                }
            )
        }
     },
    computed : {
        tablePengetahuan(){
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
                colHeaders: true,
                rowHeaders : true,
                nestedHeaders :[
                    [{label:'', colspan:1},{label:'Nilai Harian', colspan: 20}, {label:'',colspan:3},{label:'',colspan:2}],
                    ['Nama Siswa','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','NPH','NPTS','NPAS','Nilai Akhir','Predikat']
                ],
                fixedColumnsLeft: 1,
                columns : [
                    {
                        data: 'siswa.nama'
                    },
                    {
                        data: 'harian[1]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[2]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[3]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[4]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[5]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[6]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[7]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[8]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[9]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[10]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[11]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[12]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[13]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[14]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[15]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[16]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[17]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[18]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[19]',
                        type: 'numeric'
                    },
                    {
                        data: 'harian[20]',
                        type: 'numeric'
                    },
                    {
                        data: 'NPH',
                    },
                    {
                        data: 'NPTS',
                        type: 'numeric'
                    },
                    {
                        data: 'NPAS',
                        type: 'numeric'
                    },
                    {
                        data: 'nilaiAkhir',
                        readOnly: true
                    },
                    {
                        data: 'predikat',
                        readOnly: true
                    },
                ],   
                data: this.dataNilai.pengetahuan,
            };
        },
        tableKeterampilan(){
            return {
                style: 'thead{z-index:-1;}',
                licenseKey: 'non-commercial-and-evaluation',
                width: '100%',
                stretchH: 'all',
                contextMenu: {
                    items : {
                        'undo':{},
                        'redo':{},
                        '---------':{},
                        
                    }
                },
                colHeaders: true,
                rowHeaders : true,
                nestedHeaders :[
                    [{label:' ', colspan:1},{label:'Nilai', colspan:3},{label:' ', colspan:2}],
                    [{label:'Nama', colspan:1},{label:'Praktik', colspan:1},{label:'Produk', colspan:1},{label:'Proyek', colspan:1},{label:'Nilai Akhir', colspan:1}, {label:'Predikat', colspan:1}],
                ],
                fixedColumnsLeft: 1,
                columns : [
                    {
                        data: 'siswa.nama'
                    },
                    {
                        data: 'praktik',
                        type: 'numeric'
                    },
                    {
                        data: 'produk',
                        type: 'numeric'
                    },
                    {
                        data: 'proyek',
                        type: 'numeric'

                    },
                    {
                        data: 'nilaiAkhir',
                        type: 'numeric',
                        readOnly: true
                    },
                    {
                        data: 'predikat',
                        readOnly: true
                    },
                ]
                
            };
        }

    },
    created (){
        let Datastore = require('nedb');
        this.PelajaranDB = new Datastore({ filename: 'PelajaranDB.db', autoload: true })
        this.KdDB = new Datastore({filename: 'KdDB.db', autoload:true});
        this.SiswaDB = new Datastore({ filename: 'SiswaDB.db', autoload: true });
        this.NilaiDB = new Datastore({ filename: 'NilaiDB.db', autoload: true });
    },
  }
</script>
