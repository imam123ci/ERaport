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
                  40
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
                  40
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
                  40
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col>
            <v-card
              class="mx-auto">
                <v-card-text>
                  <div>Nilai Belum diisi</div>
                  <p class="display-1 text--primary">
                    40
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
                  40
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
                  40
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
                  40
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
                  40
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
                    40
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
                <v-btn>
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
        height="200px"
        >
        <v-card-title>Random</v-card-title>
         </v-card>
      </v-col>
      <v-col>
        <v-card
          height="200px"
        >
        <v-card-title>Random</v-card-title>

        </v-card>

      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
        height="400px"
        >
        <v-card-title>Rekapitulasi Nilai</v-card-title>

        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
      e1: 1,
      UI:{
        pertama:true,
        SelectKelas : ["kelas1","kelas2","kelas3","kelas4","kelas5","kelas6"],
        SelectedKelas : "",
        SelectRombel : ['a','b','c','d','e','f','g'],
        SelectedRombel : "",
      }
    }),
  }
</script>
