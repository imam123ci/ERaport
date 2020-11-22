<!-- This component contain dashboard Menu (No 1) -->
<style scoped>
    
</style>

<template>
  <v-container>

    <v-card class="white">
        <v-card-title class="pa-4">
            <h2>Backup Restore Reset</h2>
        </v-card-title>
        <v-card-text>

            <v-alert type="warning">
            Melakukan backup, restore, dan reset berakibat pada pengahapusan dan perubahan data yang ada di databases
            </v-alert>
        </v-card-text>
       
    </v-card>

    <!--Backup Card-->
     <v-spacer class="ma-5"></v-spacer>
    <v-card>
        <v-card-title>
            Back Up
        </v-card-title>
        <v-card-text>
            Fungsi backup akan menyimpan seluruh data dalam format .json. File akan diunduh ke dalam komputer pengguna. Untuk menggembailkan data, Anda dapat menggunakan fitur restore.
        </v-card-text>
        <v-btn
        large
        dark
        class="ma-3"
        style="margin-left:0px"
        @click="backUpData('all')"
        >
        Backup All
        </v-btn>
    </v-card>
    
    <!--Restore Card-->
     <v-spacer class="ma-5"></v-spacer>
    <v-card>
        <v-card-title>
            Restore
        </v-card-title>
        <v-card-text>
            Restore berfungsi untuk mengembailikan data dari file backup. File yang diterima dalam bentuk .json
            . Pilih File kemudian klik tombol restore.
            <v-file-input
                label="Pilih Folder"
                accept=".json"
                v-model="FI.restore"
            >
            </v-file-input>
        </v-card-text>
        <v-dialog
        v-model="UI.dialogRestore"
        persistent
        max-width="290"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            large
            dark
            v-bind="attrs"
            v-on="on"
            class="ma-3"
            >
            Restore
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">
            Restore aplikasi ?
            </v-card-title>
            <v-card-text>
                
                Melakukan <b>Restore akan menimpa data</b>, termasuk data dasar, kompetensi dasar, siswa, dan nilai.
               
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="UI.dialogRestore = false"
            >
                Batal
            </v-btn>
            <v-btn
                color="red"
                text
                :loading="UI.loading"
                :disabled="UI.loading"
                @click="restoreData()"
            >
                Setuju
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-card>

    <!--Backup Card-->
    <v-spacer class="ma-5"></v-spacer>
    <v-card>
        <v-card-title>
            Reset
        </v-card-title>
        <v-dialog
        v-model="UI.dialogReset"
        persistent
        max-width="290"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            large
            dark
            v-bind="attrs"
            v-on="on"
            class="ma-3"
            >
            Reset Aplikasi
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">
            Reset aplikasi ?
            </v-card-title>
            <v-card-text>
                
                Melakukan <b>Reset akan menghapus seluruh data </b>, termasuk data dasar, kompetensi dasar, siswa, dan nilai.

            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="UI.dialogReset = false"
            >
                Batal
            </v-btn>
            <v-btn
                color="red"
                text
                :loading="UI.loading"
                :disabled="UI.loading"
                @click="resetData()"
            >
                Setuju
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-card>

  </v-container>
</template>

<script>
  import fs from 'fs';
  export default {
    name: 'SettingBRR',

    data: () => ({

        UI : {
            loading:false,
            dialogReset:false,
            dialogRestore:false,
        },
        FI : {
            backup:[],
            restore:[],
        }
    }),
    methods : {
        getNilaiDB(){
            return new Promise((resolve,reject)=>{
                this.NilaiDB.find({},(err,docs)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(docs);
                });
            })
        },
        getSiswaDB(){
            return new Promise((resolve,reject)=>{
                this.SiswaDB.find({},(err,docs)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(docs);
                });
            })
        },
        getKdDB(){
            return new Promise((resolve,reject)=>{
                this.KdDB.find({},(err,docs)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(docs);
                });
            })
        },
        getPelajaranDB(){
            return new Promise((resolve,reject)=>{
                this.PelajaranDB.find({},(err,docs)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(docs);
                });
            })
        },
        getDataDB(){
            return new Promise((resolve,reject)=>{
                this.DataDB.find({},(err,docs)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(docs);
                });
            })
        },
        //backup data
        async backUpData(d){
            let dt ={

            };
            if(d == 'all'){
        
                dt={
                    DataDB : await this.getDataDB(),
                    PelajaranDB : await this.getPelajaranDB(),
                    KdDB : await this.getKdDB(),
                    SiswaDB : await this.getSiswaDB(),
                    NilaiDB : await this.getNilaiDB()
                }

                const data = JSON.stringify(dt)
                const blob = new Blob([data], {type: 'text/plain'})
                const e = document.createEvent('MouseEvents'),
                a = document.createElement('a');
                a.download = "backup.json";
                a.href = window.URL.createObjectURL(blob);
                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(e);
            }

        },

        restoreData(){
            this.UI.loading =true;
            console.log(this.FI);
            let path = this.FI.restore.path;
            console.log("get Data")
            fs.readFile(path,(err,data)=>{
                if(err){
                    console.log(err);
                    return;
                }

                let dt = (JSON.parse(data));
                console.log(dt);
                //input data to databases
                if('DataDB' in dt){
                    this.DataDB.remove({},{multi:true});
                    this.DataDB.insert(dt.DataDB);
                }
                if('PelajaranDB' in dt && dt.PelajaranDB.length > 0){
                    this.PelajaranDB.remove({},{multi:true});
                    this.PelajaranDB.insert(dt.PelajaranDB);
                }
                if('KdDB' in dt){
                    this.KdDB.remove({},{multi:true});
                    if(dt.KdDB.length > 0){
                        this.KdDB.insert(dt.KdDB);
                    }
                }
                if('SiswaDB' in dt){
                    this.SiswaDB.remove({},{multi:true});
                    if(dt.SiswaDB.length>0){
                        this.SiswaDB.insert(dt.SiswaDB);
                    }
                }
                if('NilaiDB' in dt){
                    this.NilaiDB.remove({},{multi:true});
                    if(dt.NilaiDB.length>0){
                        this.NilaiDB.insert(dt.NilaiDB);
                    }
                }
            })
            this.UI.dialogRestore = false;
            
        },
        resetData(){
            this.UI.loading = true;
            setTimeout(()=>{
                this.NilaiDB.remove({}, { multi: true });
                this.SiswaDB.remove({}, { multi: true });
                this.KdDB.remove({}, { multi: true });
                this.PelajaranDB.remove({}, { multi: true });
                this.DataDB.remove({}, {multi:true});

                this.UI.dialogReset =false;
                this.UI.loading = false;
            },3000);
        }
    },
    created (){
        let Datastore = require('nedb');
        this.SiswaDB = new Datastore({ filename: 'SiswaDB.db', autoload: true });
        this.DataDB = new Datastore({ filename: 'DataDB.db', autoload: true });  
        this.NilaiDB = new Datastore({ filename: 'NilaiDB.db', autoload: true });  
        this.PelajaranDB = new Datastore({ filename: 'PelajaranDB.db', autoload: true })
        this.KdDB = new Datastore({filename: 'KdDB.db', autoload:true});        
    },
  }
</script>
