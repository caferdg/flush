// features.js
const childProcess = require('child_process');

execute = function(args) {
    program = args.shift();
    isBg = args[args.length-1]=="!";
    if (isBg) {
        args[args.length-1] = "&";
        bgCp = childProcess.spawn(program, args.slice(0,args.length), { shell: true});
        console.log("Process " + bgCp.pid + " runs in background");
    }
    else{
        cp = childProcess.spawn(program, args, {shell: true});
        cp.stdout.on('data', (data) => {
            console.log(`${data}`);
            });
        
        cp.stderr.on('data', (data) => {
            console.error(`${data}`);
        });
    }
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
    if (command.length != 3) {
        console.log("Usage : bing [-k|-p|-c] pid");
        return;
    }
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
            console.log("Invalid argument")
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

keep = function(command) {
    if (command.length != 2) {
        console.log("Usage : keep <processID>");
        return;
    }
    pid = command[1];
    cp = childProcess.spawn("kill", ["-STOP", pid, "&"], {shell: true})
    cpP = childProcess.spawn("kill", ["-CONT", pid, "&"], {shell: true})
    cpP.on('close', (code) => {
        if(code == 0) {
            console.log("Process " + pid + " detached");
        }
      }
    );
}

help = function() {
    console.log("flu.sh commands :");
    console.log(" lp : list all processes");
    console.log(" bing [-k|-p|-c] <processId> : kill, pause or continue a process");
    console.log(" keep <processID> : detach a process");
    console.log(" <program> <args> : execute a program");
    console.log("Use ! suffix to run a program in background");
    console.log("Use Ctrl+P to exit flu.sh");
}


module.exports = { execute, listProcess, bing, keep, help};