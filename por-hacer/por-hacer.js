const fs = require('fs');
const { traceDeprecation } = require('process');
const { deserialize } = require('v8');

let listadoPorHacer = [];

const guardarDB = () =>{
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err)=>{
        if(err){
            throw new Error('No se pudo guardar la información', err);
        }else{
            console.log('Información guadada exitosamente');
        }
    })
}

const cargarDB = () =>{

    try {
         listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion)=>{

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListar = () =>{
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado=true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea =>  tarea.descripcion === descripcion);

    if(index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }else{
        return false;
    }
}

const borrar = (descripcion)=>{
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if(nuevoListado.length === listadoPorHacer){
        return false;
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true
    }
}


module.exports = {
    crear,
    getListar,
    actualizar,
    borrar
}