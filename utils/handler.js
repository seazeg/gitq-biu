const shell = require('shelljs');
const chalk = require('chalk')

let currBranch = null;

module.exports = (commands, program) => {
    for (let i in commands) {
        const exec = shell.exec(commands[i], {
            silent: true
        })
        currBranch = getCurBranch();
        if (exec.code !== 0) {
            console.log(chalk.gray(`● ${currBranch} `), chalk.red(`>> [ ${commands[i]} ] `))
            console.log(chalk.red(`====================== Error ======================\n`));
            console.log(chalk.red(exec.stdout));
            console.log(chalk.red(exec.stderr));
            console.log(chalk.red(`====================== Error ======================`));
            if (program.closed === undefined) {
                if (exec.stderr.includes(`Automatic merge failed`) || exec.stdout.includes(`Automatic merge failed`)) {
                    mergeTool();
                } else {
                    shell.exit(1);
                }
            } else {
                shell.exit(1);
            }

        } else {
            console.log(chalk.gray(`● ${currBranch} `), chalk.green(`>> [ ${commands[i]} ] `), chalk.green(`Successfully`));
            !exec.stdout ? console.log(exec.stderr) : console.log(exec.stdout);
        }
    }
}

function getCurBranch() {
    return shell.exec(`git symbolic-ref --short -q HEAD`, {
        silent: true
    }).stdout
}

function mergeTool() {
    shell.exec(`git mergetool`, {
        silent: false
    })
}