const exec = require('child_process').exec;

const availableArgs = [
    ['--url', '--help', '--all', '--install,', '--watch'],
    {
        name: '--url',
        command: hitUrl,
        desc: 'to use url (prints the total time by default) always put the url in the end'
    },
    {
        name: '--watch',
        command: checkUrlWatch,
        desc: 'to watch url on your timing (use {your time} to include your timing in milliseconds after the url)'
    },
    {
        name: '--help',
        command: printHelp,
        desc: 'to print help message'
    },
    {
        name: '--all',
        command: hitUrl,
        desc: 'to output more details (used before --url)'
    },
]

var args = process.argv.slice(2, process.argv.length);
if (args.length == 0) {
    console.log("\x1b[31m")
    console.log('You did not specify any arguments, please type "httpcurl/node app.js --help" for help\n\x1b[0m')
}
var unavailableArgs = args.slice(0, args.length - 1).filter(arg => availableArgs[0].indexOf(arg) == -1 && arg.charAt(0) == '-')
if (unavailableArgs.length > 0) {
    console.log(`Those arguments are not available, \n${unavailableArgs}\nType httpcurl --help for help\n`)
    return
}

var url = args[args.length - 1]

var checkCommand = "curl -s -w '%{time_namelookup} %{time_connect} %{time_pretransfer} %{time_starttransfer} %{time_total}' -o /dev/null " + url;

function checkUrlWatch() {
    time = args.filter(arg => arg.charAt(0) == '{' && arg.charAt(arg.length - 1) == '}');
    time = time[0].substring(1, time[0].length - 1);
    console.log(`\nChecking ${url} every ${time}ms.\n`)
    watch = setInterval(() => {
        if (args.indexOf("--all") == -1) {
            hitUrl(0);
        } else {
            hitUrl(1);
        }
        console.log(`-------------------------------------------`)
    }, time);

}

function hitUrl(type) {
    exec(checkCommand, (err, stdout, stderr) => {
        if (err)
            throw err
        results = stdout.split(" ");
        if (type) {
            console.log(`\x1b[31mName Lookup time: ${results[0]}`);
            console.log(`Connect time: ${results[1]}`);
            console.log(`PreXfer time: ${results[2]}`);
            console.log(`StartXfer time: ${results[3]}`);
            console.log(`\x1b[0m`);
        }
        console.log(`\x1b[31mTotal time to load ${url}: ${results[4]}\x1b[0m\n`);
    })
}

function printHelp() {
    console.log('\n\x1b[31mThis is httpcurl website speed test.');
    console.log('I let you check you how fast websites load.');
    console.log('Here is the list of arguments you can use:\n');
    availableArgs.slice(1).forEach(c => console.log(`${c.name}\t${c.desc}`));
    console.log('----------------------Example------------------------');
    console.log('httpcurl --url google.com');
    console.log('Total time to load http://www.google.com: 0.093013s');
    console.log('-----------------------------------------------------');
    console.log('\x1b[0m');
}

args.forEach(arg => {
    for (c of availableArgs.slice(1)) {
        if (arg == c.name) {
            c.command();
        }
    }
})