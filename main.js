const f = require("./features.js");
const readline = require('readline'),

rl = readline.createInterface(process.stdin, process.stdout);

readline.emitKeypressEvents(process.stdin);
process.stdin.on('keypress', (ch, key) => {
    if (key && key.ctrl && key.name == 'p') {
        console.log("")
        process.exit()
    }
});

rl.setPrompt('flu.sh > ');

async function main() {
    while (true){
        rl.prompt();
        await new Promise((resolve) => {

            rl.on('line', function(command) {
                args = command.trim().split(" ");
                switch(args[0]) {
                    case "":
                        rl.prompt();
                        break;
                    case "lp":
                        f.listProcess();
                        break;
                    case "bing":
                        f.bing(args);
                        break;
                    case "keep":
                        f.keep(args);
                        break;
                    default:
                        f.execute(args);
                        break;
                }
            });

        });
        
    }
}

main();