'use strict'
const shell = require('shelljs');
const chalk = require('chalk')
const path = require('path');
const handler = require('../utils/handler')

console.log((chalk.blue(`\n Current Directory > ` + path.resolve('./') + `\n `)));


const getAuthor = () => {
    return shell.exec(`git config --global user.name`, {
        silent: true
    }).stdout
}


module.exports = (program) => {
    if (!program.message) {
<<<<<<< HEAD
        program.message = `default Commit Message - ${getAuthor()}`
=======
        program.message = 'Default Commit Message'
>>>>>>> 57324e4f8b74d7547671e0b974a339be25c19c9a
    }

    let commands = {
        1: `git add -A`,
<<<<<<< HEAD
        2: `git commit -m "${program.message} - ${getAuthor()}"`,
=======
        2: `git commit -m "${program.message}"`,
>>>>>>> 57324e4f8b74d7547671e0b974a339be25c19c9a
        3: `git pull`,
        4: `git push`
    }

    handler(commands, program)
}