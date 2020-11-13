<style scoped>
    
</style>

<template>
  <v-container>

    <v-card class="white">
        <v-card-title class="pa-4">
            <h2>Output Jilid dan Identitas</h2>
        </v-card-title>

        <v-btn ma-2 @click="   createR();">Create Report</v-btn>
    </v-card>
    
  </v-container>
</template>

<script>
  import createReport from 'docx-templates';
  import fs from 'fs';

  export default {
    name: 'OutputRaport',

    data: () => ({
    }),
    methods: {
      async createR(){

        const template = fs.readFileSync('./src/assets/templates/templatesSampul.docx');
        console.log(template.toJSON());
        let buffer = await createReport({
          template,
          data : {
            siswa : {
              nama : "Nama Siswa",
              NIS : 23321234,
              NISN : 334343214,
            }

          },
        })

        fs.writeFileSync('./src/assets/templates/report.pdf',buffer);


        }
    },
  }
</script>
