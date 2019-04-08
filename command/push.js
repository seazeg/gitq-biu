'use strict'
const shell = require("shelljs");
const chalk = require('chalk')
const path = require("path");


console.log((chalk.blue(`\n Current Directory > ` + path.resolve('./') + `\n `)));
module.exports = (commit) => {
    if (typeof commit == 'object') {
        commit = `'Default Commit Information :art:'`
    }
    const commands = {
        // 1: `git --version`,
        2: `git add -A`,
        3: `git pull`,
        4: `git commit -m ${commit}`,
        5: `git push`
    }

    for (let i in commands) {
        const exec = shell.exec(commands[i], {
            silent: true
        })
        if (exec.code !== 0) {
            console.log(chalk.red(`>> [ ${commands[i]} ] `));
            console.log(chalk.red(`====================== Error ======================\n`));
            console.log(chalk.red(exec.stdout));
            console.log(chalk.red(exec.stderr));
            console.log(chalk.red(`====================== Error ======================`));
            if (exec.stderr.includes(`Automatic merge failed`) || exec.stdout.includes(`Automatic merge failed`)) {
                mergeTool()
            } else {
                shell.exit(1);
            }

        } else {
            console.log(chalk.green(`>> [ ${commands[i]} ] `), chalk.green(`Successfully`));
            console.log(exec.stdout);
        }
    }
}

function mergeTool() {
    shell.exec(`git mergetool`, {
        silent: false
    })
}