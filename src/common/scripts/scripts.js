/* npm脚本 */
const inquirer = require('inquirer');
const argv = process.argv[2] || '';
switch (argv) {
    case 'update':
        inquirer
            .prompt([
                {
                    type: 'confirm',
                    message: `是否更新uniapp和uview相关依赖包?`,
                    name: 'status'
                }
            ])
            .then(answers => {
                !answers.status && (process.exitCode = 1);
            });
        break;
    default:
        console.error(`${argv}为无效参数`);
        process.exitCode = 1;
        break;
}
