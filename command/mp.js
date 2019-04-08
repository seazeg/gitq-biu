'use strict'
const chalk = require('chalk')
const path = require('path');

console.log((chalk.blue(`\n Current Directory > ` + path.resolve('./') + `\n `)));
module.exports = (program) => {
    if (!program.message) {
        program.message = `Default Commit Message :art:`
    }

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