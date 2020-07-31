/*
 * @Author: Eland.Tong
 * @Date: 2020-07-31 09:54:22
 * @LastEditTime: 2020-07-31 10:13:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ReactElandFramework/bin/index.js
 */
const program = require('commander');
const logUpdate = require('log-update');
const shell = require('shelljs');

program.version('1.0.1')
    .usage('ReactElandFramework')
    .description('构建 ReactElandFramework 项目')
    .parse(process.argv);

if (!program.args.length) {
    program.help();
}
if (program.args.length === 1) {
    shell.mkdir('-p', program.args[0]);
    shell.cd(program.args[0]);
    shell.exec('git init');
    let i = 0;
    const frames = ['-', '\\', '|', '/'];
    const interval = setInterval(() => {
        const frame = frames[i = ++i % frames.length];
        logUpdate(`👉 👉 ${frame} initializing ${frame} 👈 👈`);
    }, 50)
    shell.exec('git pull git@github.com:elandTong/ReactElandFramework.git', (code) => {
        clearInterval(interval);
        if (code !== 0) {
            console.log('Error! Try again');
            shell.exit(1);
        }
        console.log('👏 👏 Completed! You are  good to go! 👏 👏');
    })
}