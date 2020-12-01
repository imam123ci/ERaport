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
            <h2>Input Nilai pengetahuan</h2>
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
              <h3>Pelajaran</h3>
              <v-row>
                <v-col >  
                    <v-select
                        :items="UI.SelectPelajaran"
                        label="Pelajaran"
                        solo
                        v-model="UI.SelectedPelajaran"
                        @change="getKd()"
                        style="z-index:900"
                    >
                    </v-select>

                </v-col >
              </v-row>
              <v-row>
                <v-col>
                <h3>Kompetensi Dasar</h3>
                <v-chip-group
                mandatory
                active-class="primary--text"
                >
                    <v-chip
                        v-for="kd in UI.SelectKd"
                        :key="kd.kdId"
                        @click="setSelectedKd(kd)"
                    >
                        {{ kd.kdId }}
                    </v-chip>
                </v-chip-group>
                <p>{{this.UI.SelectedKdDesc}}</p>
                </v-col>
              </v-row>
            
            
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
            SelectedTipe : "pengetahuan",
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
           this.refreshTable('pengetahuan');
        },
        refreshTable(){
            console.log("load table data");
            this.$refs.tblPengetahuan.hotInstance.loadData(this.dataNilai.pengetahuan);
        },
        getPelajaran(){
            this.UI.loading = true;
            this.UI.SelectPelajaran = [];
            this.UI.SelectedPelajaran = "";
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
            this.UI.SelectKd = [];
            let kelas = this.UI.SelectedKelas
            let rombel = this.UI.SelectedRombel;
            let pelajaran = this.UI.SelectedPelajaran;
            let tipe = this.UI.SelectedTipe;
            if(kelas == "" || pelajaran == "" || tipe == "" || rombel == ""){
                this.UI.loading = false;
                return;
            }
            this.KdDB.find(
                {$and: [{kelas:kelas},{pelajaran:pelajaran},{tipe:tipe}]},
                {id:1,kdId:1, kd:1})
                .sort({id:1})
                .exec((err,docs) =>{
                   if(err){
                        console.log("err" + err);
                        return;
                    }
                    docs = docs.sort((a,b)=> parseFloat(a.kdId) - parseFloat(b.kdId));
                     console.log(docs);
                    if(docs == undefined || docs.length <= 0){
                        this.setSelectedKd("")
                        
                    }else{
                        this.UI.SelectKd = docs;
                        this.setSelectedKd(docs[0])
                    }
                }
            )
            this.UI.loading = false;

            
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
        getNilai(){
            this.UI.loading = true;
            let kelas,rombel,tipe,kd,pelajaran = null;
            kelas = this.UI.SelectedKelas;
            rombel = this.UI.SelectedRombel;
            tipe = this.UI.SelectedTipe;
            kd =  this.UI.SelectedKd;
            pelajaran = this.UI.SelectedPelajaran;
            console.log(this.dataNilai);
            if(kelas == "" || rombel == "" || tipe == "" || kd == "" || pelajaran == ""){
                this.UI.loading = false;
                return;
            }

            this.NilaiDB.find(
                {$and:[{"siswa.kelas":kelas},{"siswa.rombel":rombel},{"pelajaran.pelajaran":pelajaran},{"pelajaran.tipe":tipe}, {"pelajaran.kd":kd}]},
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
                        if(tipe == 'pengetahuan'){
                           this.createNilaiPengetahuan();
                        }
                    }else{
                        this.dataNilai.pengetahuan = docs;
                        this.refreshTable(); 
                    } 
                                  
                }
            )
            this.UI.loading = false;
           
        },

        // isArchive store data without click save
        saveNilai(isArchive){
            this.UI.loading = true;
            let kelas,rombel,tipe,kd,pelajaran = "";
            if(!isArchive){
                 kelas = this.UI.SelectedKelas;
                 rombel = this.UI.SelectedRombel;
                 tipe = this.UI.SelectedTipe;
                 kd = this.UI.SelectedKd;
                 pelajaran = this.UI.SelectedPelajaran;
            }
            else{
                console.log("isArchive");
                console.log(this.dataNilai);
                 kelas = this.UIhist.SelectedKelas;
                 rombel = this.UIhist.SelectedRombel;
                 tipe = this.UI.SelectedTipe;
                 kd = this.UIhist.SelectedKd;
                 pelajaran = this.UIhist.SelectedPelajaran;
            }
            if(kelas == "" || rombel == "" || tipe == "" || kd == "" || pelajaran == ""){
                console.log("kosong");
                this.UI.loading = false;
                return;
            }

            this.NilaiDB.remove(
                {$and:[{"siswa.kelas":kelas},{"siswa.rombel":rombel},{"pelajaran.pelajaran":pelajaran},{"pelajaran.tipe":tipe}, {"pelajaran.kd":kd}]},
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
            if(tipe === 'pengetahuan'){
                dNilai = this.dataNilai.pengetahuan;
            }


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

        // all other method
        notify(msg){
            this.snackbar.status = true;
            this.snackbar.text = msg; 
        },
        
        createNilaiPengetahuan(){
            let kelas = this.UI.SelectedKelas;
            let rombel = this.UI.SelectedRombel;
            let tipe = this.UI.SelectedTipe;
            let kd = this.UI.SelectedKd;
            let pelajaran = this.UI.SelectedPelajaran;
            let agama = ['Budha', 'Islam', 'Protestan', 'Katolik', 'Hindu', 'Konghucu'];
           
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
                    docs.map((s)=>{
                        if(agama.includes(pelajaran)){
                            if(s.agama == pelajaran){
                                
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
                                );             
                            }
                        }
                        else{
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
                        );
                        }                          
                    });
                    if(tipe == 'pengetahuan'){
                        this.dataNilai.pengetahuan = tempNilai;
                        
                        this.refreshTable('pengetahuan');
                    }
                }
            )
        },


        setSelectedKd(k){
            if(k == ""){
                console.log("reset KD")
                this.UI.SelectedKd = "";
                this.UI.SelectedKdDesc = "";
                console.log(this.UI.SelectedKd);
                //since the script work wrong reset data nilai her
                this.dataNilai.pengetahuan = [];
                
            }
            else{
                console.log("input KD")
                this.UI.SelectedKd = k.kdId;
                this.UI.SelectedKdDesc = k.kd;            
                this.getNilai();
            }
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
                allowInsertRow: false,
                maxRows : this.dataNilai.pengetahuan.length,
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

                        //predikat
                        this.dataNilai.pengetahuan[row].predikat = this.calcPredikat(tNilai);

                        //save
                        this.saveNilai();
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
                    if(ioMode == "set"){
                          console.log(row, columns, ioMode);
                        console.log(valueHolder);
                        let tNK = [0,0,0];
                        if( columns <= 3){
                            tNK[0] = this.dataNilai.keterampilan[row].praktik;
                            tNK[1] = this.dataNilai.keterampilan[row].produk;
                            tNK[2] = this.dataNilai.keterampilan[row].proyek;
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

                        // Save
                        this.saveNilai();
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
        this.getDefaultKelas();
    },
    mounted (){
        this.getKkm();
    }
  }
</script>
