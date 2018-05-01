const fs = require('fs');
const yargs = require('yargs');
// const argv = yargs
//   .command('list', 'List all commands')
//   .command('add', 'Add a note', { titleOptions, bodyOptions })
//   .command('read', 'Read a note', { titleOptions })
//   .command('remove', 'Remove a note', { titleOptions })
//   .help().argv;

const argv = yargs.argv;
//own files
const dogs = require('./doglogic');
console.log('Welcome to DogLog.');
console.log('add (+args): add a dog to the pack');
console.log('pack: get all dogs (a pack) from DogLog');
console.log('fetch + name: get a dog from the pack');
console.log('down: remove a dog from the pack');

if (command === 'add') {
  console.log('Dog added to DogLog');
} else if (command === 'pack') {
  console.log('Show all of dog pack');
} else if (command === 'fetch') {
  console.log('Single dog retrieved from pack');
} else if (command === 'down') {
  console.log('Dog removed');
} else {
  console.log('Err: command was not recognised.');
  console.log('Did you mean add, pack, fetch, or down');
}
