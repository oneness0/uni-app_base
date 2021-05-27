/* npm脚本 */
const inquirer = require('inquirer');
const argv = JSON.parse(process.env.npm_config_argv).original;
switch (argv[0] || '') {
    case 'update':
        if (argv[1] === '-y') {
            break;
        }
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
