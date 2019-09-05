const {add, remove, list, get, getByLanguage} = require("./commandProcessor");

/**
 * Entry point.  Responsible for parsing command line arguments and dispatching them to the correct function in the
 * commandProcessor.
 */
async function main() {
    return require('yargs')
        .usage('$0 <command> [args]')
        .demandCommand(1, 1, 'You need at least one command', 'You need at most one command')
        .command('list', 'list all films in the catalog', yargs => yargs.strict(), list)
        .command(
            'get',
            'get film by id',
            yargs => yargs
                .option('id', {
                    demandOption: true,
                    type: 'string'
                })
                .strict(true),
            get
        )
        .command(
            'remove',
            'remove film by ID',
            yargs => yargs
                .option('id', {
                    demandOption: true,
                    type: 'string'
                })
                .strict(true),
            remove
        )
        .command(
            'add',
            'add a film to the catalog',
            yargs => yargs
                .option('title', {
                    demandOption: true,
                    type: 'string'
                })
                .option('directors', {
                    type: 'array'
                })
                .option('description', {
                    demandOption: true,
                    type: 'string'
                })
                .option('running_time', {
                    type: 'number'
                })
                .option('languages', {
                    demandOption: true,
                    type: 'array'
                })
                .strict(true),
            add)
        .command(
            'getByLanguage',
            'get all films in given language',
            yargs => yargs
                .option('language', {
                    demandOption: true,
                    type: 'string'
                })
                .strict(),
            getByLanguage
        )
        .help()
        .strict(true)
        .argv;
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
