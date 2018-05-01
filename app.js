const fs = require('fs');
const inquirer = require('inquirer');
const colors = require('colors/safe');
//own files
const commands = require('./doglogic');

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
            var name = answer.hound;
            commands.deleteHound(name);
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
            var name = answer.hound;
            commands.getHound(name);
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
              message: `What color type is the ${colors.rainbow('hound')}? \n`,
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
              choices: ['bitch', 'dog']
            },
            {
              name: 'description',
              message:
                "Write a brief description of the hound's personality. \n"
            }
          ])
          .then(function(answer) {
            var name = answer.hound;
            var color = answer.color;
            var sex = answer.sex;
            var description = answer.description;
            commands.addHound(name, color, sex, description);
            console.log('Hound added: ');
            commands.printInfo(hound);
          });
        break;
      default:
        console.clear();
        console.log(`Sorry, I do not recognise ${command}.`);
    }
  });
