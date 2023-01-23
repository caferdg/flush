const f = require("./features.js");
var readline = require('readline'),

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
        let cmd = await new Promise((resolve) => {

            rl.on('line', function(command) {
                args = command.trim().split(" ");
                if (args[args.length -1] == "!") {
                    f.setBg(true);
                }
                else {
                    f.setBg(false);
                }
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