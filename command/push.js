'use strict'
const shell = require("shelljs");
const chalk = require('chalk')
const path = require("path");


console.log((chalk.blue(`\n Current Directory > ` + path.resolve('./') + `\n `)));
module.exports = (program) => {
    if (!program.message) {
        program.message = `Default Commit Message :art:`
    }
    const commands = {
        // 1: `git --version`,
        2: `git add -A`,
        3: `git commit -m '${program.message}'`,
        4: `git pull`,
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
            if (program.closed === undefined) {
                if (exec.stderr.includes(`Automatic merge failed`) || exec.stdout.includes(`Automatic merge failed`)) {
                    mergeTool()
                } else {
                    shell.exit(1);
                }
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