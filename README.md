# eraport

Software ini merupakan Eraport yang diperuntukan untuk SD.
Software dibuat menggunakan vuejs,nodejs, dan Electron.
Software akan mengisi template raport(bertipe .docx) dan mengeluarkan (.docx) juga.
Dikarenakan keterbatasan nodeJS, file keluaran hanya dapat bertipe docx. 
Untuk mengeluarkan tipe lain, dapat menggunakan API pada server atau men-deploy aplikasi di server.

## Project setup
```
yarn install
```

### Storing Folde
Please create folder 'Templates' and 'Raport' to store docx file. (Optional)

### Database
This Software use NeDB for storing persistent dataset.
I think this software not required to store a lot of data but need to have fast dbms.


### Project Development & Production
Use vue-electron-builder plugin for production and developement.
Develope
```
yarn eletron:serve
```
Build
```
yarn electron:build
```

