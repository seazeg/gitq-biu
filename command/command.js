module.exports = JSON.stringify({
    push: {
        1: `git add -A`,
        2: `git commit -m '$\{program.message}'`,
        3: `git pull`,
        4: `git push`
    }
})