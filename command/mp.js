'use strict'
const shell = require('shelljs');
const chalk = require('chalk')
const path = require('path');
const handler = require('../utils/handler')

console.log((chalk.blue(`\n Current Directory > ` + path.resolve('./') + `\n `)));
module.exports = (program) => {
    if (!program.message) {
        program.message = `Default Commit Message :art:`
    }

    let currBranch = getCurBranch();
    let commands = {
        1: `git add -A`,
        2: `git commit -m '${program.message}'`,
        3: `git pull`,
        4: `git push`,
        5: `git checkout ${program.branch}`,
        6: `git pull`,
        7: `git merge ${currBranch}`,
        8: `git push`,
        9: `git checkout ${currBranch}`
    }

    handler(commands, program)
}

function getCurBranch() {
    return shell.exec(`git symbolic-ref --short -q HEAD`, {
        silent: true
    }).stdout
}