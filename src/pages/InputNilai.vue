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
                @click="saveNilai()"
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
                @click="saveNilai"
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
        dataKkm :{
            _id : "kkm",
            kkm : 0,
            interval : 0,
            ket : []
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
                pelajaran : {
                    pelajaran : '',
                    tipe:'',
                },
            }],
        },
    }),
     methods: {
        refresh(){
           console.log(this.UI);
           //this.refreshTable('pengetahuan');
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
                )
                .sort({id:1})
                .exec((err,docs) =>{
                   if(err){
                        console.log("err" + err);
                    }
                    console.log(docs);
                    this.UI.SelectKd = docs;
                }
            )
            this.UI.loading = false;
            this.getNilai();
            
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
                {_id:0},
                (err,docs) => {
                    if(err){
                        console.log(err);
                        return;
                    }
                    if(docs == undefined || docs.length == 0){
                        console.log("kosong");
                        // somehow this code run in asynchronus 
                        // so i seperate data input and table rendere in other function
                        if(tipe == 'pengetahuan'){
                           this.createNilaiPengetahuan();
                        }
                        else if(tipe == 'keterampilan'){
                            this.createNilaiKeterampilan();
                        }
                        else if(tipe == 'sikap'){
                            return;
                        }
                    }else{
                        console.log("tidak kosong");
                        console.log(docs);
                        if(tipe == 'pengetahuan'){
                            this.dataNilai.pengetahuan = docs;
                            this.refreshTable('pengetahuan');
                        }
                        else if(tipe == 'keterampilan'){
                            this.dataNilai.keterampilan = docs;
                            this.refresh('keterampilan');
                        }
                        else if(tipe == 'sikap'){
                            this.dataNilai.sikap = docs;
                        }
                    } 
                                  
                }
            )
           
            
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
        saveNilai(){
            this.UI.loading = true;
            let kelas = this.UI.SelectedKelas;
            let rombel = this.UI.SelectedRombel;
            let tipe = this.UI.SelectedTipe;
            let kd = this.UI.SelectedKd;
            let pelajaran = this.UI.SelectedPelajaran;
            if(kelas == "" || rombel == "" || tipe == "" || kd == "" || pelajaran == ""){
                console.log("kosong");
                return;
            }

            this.NilaiDB.remove(
                {$and:[{"siswa.kelas":kelas},{"siswa.rombel":rombel},{"pelajaran.pelajaran":pelajaran},{"pelajaran.tipe":tipe}, {"pelajaran.kd":kd}]},
                {multi:true},
                (err) => {
                    if(err){
                        console.log(err);
                    }
                }
            );

            let dNilai = [];
            if(tipe === 'pengetahuan'){
                dNilai = this.dataNilai.pengetahuan;
            }
            else if(tipe == 'keterampilan'){
                dNilai = this.dataNilai.keterampilan;
            }
            else if(tipe == 'sikap'){
                dNilai = this.dataNilai.sikap;
            }


            this.NilaiDB.insert(
                dNilai,
                (err, docs)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log(docs);
                }
            );

            this.UI.loading = false;
        },
        saveNilaiAll(){

        },
        deleteNilai(){
            this.NilaiDB.remove({},{multi:true});
        },
        // all other method
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
                            // defines how many nilai harian u need
                            harian : new Array(21).fill(null),
                            NPH : "",
                            NPTS : '',
                            NPAS : '',
                            nilaiAkhir: ''
                        }
                        )                              
                    });
                    if(tipe == 'pengetahuan'){
                        this.dataNilai.pengetahuan = tempNilai;
                        
                        this.refreshTable('pengetahuan');
                    }
                }
            )
        },

        createNilaiKeterampilan(){
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
                            praktik : '',
                            produk : '',
                            proyek : '',
                            nilaiAkhir: '',
                            predikat : ''
                        }
                        )                              
                    });

                    //check again
                    if(tipe == 'keterampilan'){
                        console.log("load keterampilan")
                        this.dataNilai.keterampilan = tempNilai;
                        this.refreshTable('keterampilan');
                    }
                    
                }
            )

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

        calcPredikat(tNilai){
            // Perhitungan predikat kkm
            let tKkm = this.dataKkm.ket
            let tPredikat = "D"
            if(tKkm.length > 0){
                for(let j = 3; j >= 0; j--){
                    if(tNilai >= tKkm[j].rentangMin){
                        tPredikat = tKkm[j].predikat;
                        break;
                    }
                }
            }
            return(tPredikat);
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
                        data: 'harian.1',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.2',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.3',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.4',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.5',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.6',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.7',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.8',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.9',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.10',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.11',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.12',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.13',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.14',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.15',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.16',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.17',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.18',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.19',
                        type: 'numeric'
                    },
                    {
                        data: 'harian.20',
                        type: 'numeric'
                    },
                    {
                        data: 'NPH',
                        readOnly:true
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
                
                // Calculate Cell
                modifyData: (row, columns, valueHolder, ioMode) => {
                    //define where colummn NPH.NPTS and NPAS is
                    let colNPH = 21;
                    let colNPTS = 22;
                    let colNPAS = 23;
                    if(ioMode == "set"){
                    console.log("Modify SET Pengetahuan");   
                    console.log(row, columns, ioMode);
                    console.log(valueHolder);
                    // NPH - Average
                    // reduce conditional in case harian is reduced;
                    if(columns <= 20 && columns >= 1){
                        let arr = this.dataNilai.pengetahuan[row].harian;
                        arr[columns] = valueHolder.value;
                        this.dataNilai.pengetahuan[row].NPH = this.averageArr(arr);
                    }
                    
                    // Nilai Akhir
                    if( columns <= 23){
                        let tNPH = this.dataNilai.pengetahuan[row].NPH;
                        let tNPTS = this.dataNilai.pengetahuan[row].NPTS;
                        let tNPAS = this.dataNilai.pengetahuan[row].NPAS;
                        //sometimes js doesn;t fast enough
                        if(columns === colNPH){
                            tNPH = valueHolder.value;
                        }
                        else if(columns === colNPTS){
                            tNPTS = valueHolder.value;
                        }
                        else if(columns == colNPAS){
                            tNPAS = valueHolder.value;
                        }


                        console.log(tNPH, tNPTS, tNPAS);
                        // Perhitungan nilai akhir 0.5, 0.25, 0.25
                        let tNilai =(tNPH * 0.5) + (tNPTS * 0.25)+ (tNPAS * 0.25);
                        tNilai = Math.round((tNilai + Number.EPSILON) * 100) / 100;
                        this.dataNilai.pengetahuan[row].nilaiAkhir = tNilai;

                        
                        this.dataNilai.pengetahuan[row].predikat = this.calcPredikat(tNilai);
                    }
                    }
                }
            };
        },
        tableKeterampilan(){
            return {
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
                        readOnly: true
                    },
                    {
                        data: 'predikat',
                        readOnly: true
                    },
                ],
                data: this.dataNilai.keterampilan,
                modifyData: (row, columns, valueHolder, ioMode) => {
                    
                    //define where colummn praktik, produk, dan proyek is
                    let colPraktik = 1;
                    let colProduk = 2;
                    let colProyek = 3;
                    console.log("Modify SETket"); 
                    if(ioMode == "set"){
                        console.log("modify Keterampilan")
                        console.log("Modify SET Keterampilan");   
                        console.log(row, columns, ioMode);
                        console.log(valueHolder);
                        let tNK = [0,0,0];
                        if( columns <= 3){
                            tNK[0] = this.dataNilai.keterampilan[row].praktik;
                            tNK[1] = this.dataNilai.keterampilan[row].produk;
                            tNK[2] = this.dataNilai.keterampilan[row].praktik;
                        }
                        //sometimes js doesn;t fast enough
                        if(columns == colPraktik){
                            tNK[0] = valueHolder.value;
                        }
                        else if(columns == colProduk){
                            tNK[1] = valueHolder.value;
                        }
                        else if(columns == colProyek){
                            tNK[2] = valueHolder.value;
                        }
                        console.log("tnk:" + tNK);

                        // calculate average
                        let tNilai = this.averageArr(tNK);
                        this.dataNilai.keterampilan[row].nilaiAkhir = tNilai;
                        console.log(this.dataNilai.keterampilan[row]);
                        
                        // calculate predikate
                        this.dataNilai.keterampilan[row].predikat = this.calcPredikat(tNilai);

                    }
                },
                
            };
        }

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
        this.getKkm();
    }
  }
</script>
