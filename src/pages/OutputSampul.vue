<!-- This component contain dashboard Menu (No 1) -->
<style scoped>
    
</style>

<template>
  <v-container>

    <v-card class="white">
        <v-card-title class="pa-4">
            <h2>Output Jilid dan Identitas</h2>
        </v-card-title>

        <v-btn @click="createR();">Create Report</v-btn>
    </v-card>
    
  </v-container>
</template>

<script>
  //import createReport from 'docx-templates';
  //import fs from 'fs';

  export default {
    name: 'OutputRaport',

    data: () => ({
    }),
    methods: {
      createR(){
        const fs = require('fs');

        const root = fs.readdirSync('/');

        console.log(root);


        }
    },
  }
</script>
