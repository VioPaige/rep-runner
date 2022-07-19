#!/usr/bin/env node
// const fs = require('file-system')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')



const [, , ...args] = process.argv


let controller = undefined
let generation = 0


let listenerexts = [".js", ".ts", ".json"]




function resetConsoleColour() {

    console.log(`\x1b[0m`)

}

function startexec() {

    generation++

    controller = new AbortController() // new controller for terminating the exec
    let { signal } = controller

    let cmdex = exec(`node ${args[0]}`, { signal, maxBuffer: 10486750 }) // execute

    cmdex.stdout.on('data', (data) => console.log(data)) // log the logs from execution
    cmdex.stderr.on('data', (data) => {
        console.log(`\x1b[31m`, data)
        resetConsoleColour()
    })
    
    checkDirForFiles(__dirname) // listen for file changes

}

function listenToFile(filepath) {

    let gen = generation

    console.log(`\x1b[35m`, `Listening to file "${filepath}"`)
    resetConsoleColour()

    fs.watchFile(filepath, { persistent: true }, (curr, prev) => {

        if (gen != generation) return

        console.log(`\x1b[31m`, `${filepath} was updated, restarting node process...`)
        resetConsoleColour()

        if (controller) controller.abort()

        startexec()


    }) 

}

function checkDirForFiles(dirpath) {

    fs.readdir(dirpath, { withFileTypes: true }, (e, dirents) => {

        if (e) console.log(e)
        else {

            for (let i of dirents) {

                if (i.isFile()) {

                    if (listenerexts.includes(path.extname(i.name))) {

                        // console.log(`${i.name} is going to be listened to because its extension is ${path.extname(i.name)}`)
                        listenToFile(path.join(dirpath, "/", i.name))

                    } else {

                        // console.log(`${i.name} is not going to be listened to because its extension is ${path.extname(i.name)}`)

                    }

                } else if (i.isDirectory() && i.name != "node_modules") {
                    
                    // console.log(`${i.name} is a directory`)
                    checkDirForFiles(path.join(dirpath, "/", i.name))

                }

            }

        }

    })

}

function index() {

    if (!fs.existsSync(args[0]))
        return console.log(`This file could not be found.`) // obvious

    console.log(`\x1b[32m`, `running "node ${args[0]}"`)
    resetConsoleColour()

    startexec() // starts the exec

}

index()



