const fs = require('fs');
const inquirer = require('inquirer');
const colors = require('colors/safe');
//own files
const commands = require('./doglogic');
//main command logic:
function logHounds() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'commands',
        message: 'What do you want to do? \n',
        choices: [
          'Add a hound',
          'Remove a hound',
          'Fetch a hound',
          'See the pack'
        ]
      }
    ])
    .then(function(answer) {
      var command = answer.commands;
      switch (command) {
        case 'See the pack':
          const allHounds = commands.getPack();
          console.log('Calling the entire pack:');
          console.log(`Printing ${allHounds.length} hounds:`);
          allHounds.forEach(hound => commands.printInfo(hound));
          continueLogging();
          break;
        case 'Remove a hound':
          inquirer
            .prompt([
              {
                name: 'hound',
                message: 'Which hound do you wish to remove from the pack? \n'
              }
            ])
            .then(function(answer) {
              commands.deleteHound(answer.hound);
              console.log('Hound deleted. Heartless!');
              continueLogging();
            });
          break;
        case 'Fetch a hound':
          inquirer
            .prompt([
              {
                name: 'hound',
                message: 'Which hound do you wish fetch? \n'
              }
            ])
            .then(function(answer) {
              var hound = commands.getHound(answer.hound.toLowerCase());
              console.log('Fetched hound:');
              commands.printInfo(hound);
              continueLogging();
            });
          break;
        case 'Add a hound':
          inquirer
            .prompt([
              {
                name: 'hound',
                message: 'What is the name of the hound? \n'
              },
              {
                type: 'list',
                name: 'color',
                message: `What color type is the ${colors.rainbow(
                  'hound'
                )}? \n`,
                choices: [
                  'Brindle',
                  'Black Brindle',
                  'Black and White',
                  'Blue',
                  'Blue Brindle',
                  'Light Brindle',
                  'Dark Brindle',
                  'Fawn Brindle',
                  'Fawn',
                  'Dark Red',
                  'Black',
                  'Light Red Fawn',
                  'White and Brindle',
                  'Red Fawn',
                  'Red and White',
                  'White and Brindle Tick',
                  'Red Brindle',
                  'White and Black',
                  'Greyhound X'
                ]
              },
              {
                name: 'sex',
                type: 'list',
                message: 'Bitch or dog? \n',
                choices: ['Bitch', 'Dog']
              },
              {
                name: 'description',
                message:
                  "Write a brief description of the hound's personality. \n"
              }
            ])
            .then(function(answer) {
              const name = answer.hound.toLowerCase();
              const color = answer.color;
              const sex = answer.sex;
              const description = answer.description;
              const hound = commands.addHound(name, color, sex, description);
              console.log('Hound added: ');
              commands.printInfo(hound);
              continueLogging();
            });
          break;
        default:
          console.clear();
          console.log(`Sorry, I do not recognise ${command}.`);
          logHounds();
      }
    });
}

function continueLogging() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Log another hound?'
      }
    ])
    .then(answer => {
      if (answer.continue) {
        logHounds();
      } else {
        console.log('Goodbye.');
      }
    });
}

logHounds();
