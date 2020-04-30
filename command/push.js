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
        program.message = `default Commit Message - ${getAuthor()}`
    }

    let commands = {
        1: `git add -A`,
        2: `git commit -m "${program.message} - ${getAuthor()}"`,
        3: `git pull`,
        4: `git push`
    }

    handler(commands, program)
}