// features.js
const childProcess = require('child_process');


execute = function(args) {
    program = args.shift();
	cp = childProcess.spawn(program, args, {shell: true});
    cp.stdout.on('data', (data) => {
        console.log(`${data}`);
      });
    
    cp.stderr.on('data', (data) => {
        console.error(`${data}`);
    });
    return
}

listProcess = function() {
	cp = childProcess.spawn("ps -ax", {shell: true});
    cp.stdout.on('data', (data) => {
        console.log(`${data}`);
      });
    
    cp.stderr.on('data', (data) => {
        console.error(`${data}`);
    });
    return
}

bing = function(command) {
    args = []
    pid = command[2];
    switch(command[1]) {
        case "-k":
            signal = "-KILL";
            break;
        case "-p":
            signal = "-STOP";
            break;
        case "-c":
            signal = "-CONT";
            break;
        default:
            console.log("Bad usage of bing, type 'help'")
            return;
    }
    args.push(signal);
    args.push(pid);
    cp = childProcess.spawn("kill", args, {shell: true});
    cp.stdout.on('data', (data) => {
        console.log(`${data}`);
      });
    
    cp.stderr.on('data', (data) => {
        console.error(`${data}`);
    });
    cp.on('close', (code) => {
        if(code == 0) {
            switch(command[1]) {
                case "-k":
                    console.log("Process " + pid + " killed");
                    break;
                case "-p":
                    console.log("Process " + pid + " suspended");
                    break;
                case "-c":
                    console.log("Process " + pid + " resumed");
                    break;
                default:
                    return;
            }
        }
      });
    return;
}

module.exports = { execute, listProcess, bing };