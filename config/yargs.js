

let descripcion = {
        demand:true,
        alias: 'd',
        desc: 'Ingresar descripcion de la tarea por hacer'
    }

let completado = {
        default: true,
        alias: 'c',
        desc: 'Marca como completado la tarea'
    }

const argv = require("yargs")
                            .command('borrar','Borra un elemento por hacer', descripcion)
                            .command('crear','Crear un elemento por hacer', descripcion)
                            .command('actualizar', 'actualiza el estado completo de una tarea', {
                                descripcion, completado
                            })
                            .help()
                            .argv

module.exports = {
            argv
        }