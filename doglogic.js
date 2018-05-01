const fs = require('fs');
const colors = require('colors/safe');
var Table = require('cli-table');

//HELPERS
var getLogEntries = () => {
  try {
    //save as ..
    var logString = fs.readFileSync('doglog-datalog.json');
    return JSON.parse(logString);
  } catch (err) {
    return [];
  }
};
var saveLogEntries = entries => {
  fs.writeFileSync('doglog-datalog.json', JSON.stringify(entries));
};
const table = new Table({
  chars: {
    top: '═',
    'top-mid': '╤',
    'top-left': '╔',
    'top-right': '╗',
    bottom: '═',
    'bottom-mid': '╧',
    'bottom-left': '╚',
    'bottom-right': '╝',
    left: '║',
    'left-mid': '╟',
    mid: '─',
    'mid-mid': '┼',
    right: '║',
    'right-mid': '╢',
    middle: '│'
  },
  style: { 'padding-left': 0, 'padding-right': 0 },
  colWidths: [5, 90]
});
//show as initial caps:
String.prototype.initCap = function() {
  const replacement = this.charAt(0).toUpperCase();
  return replacement + this.substr(0 + replacement.length);
};
const printInfo = hound => {
  if (!hound) {
    console.log('Hound not found.');
  } else {
    table.push(
      { Name: colors.rainbow(hound.name.initCap()) },
      { Color: hound.color },
      { Sex: hound.sex },
      { Desc: hound.description }
    );
    console.log(table.toString());
  }
};

//HOUND LOGIC
//get all of the entries:
const getPack = () => {
  return getLogEntries();
};

//delete a hound
const deleteHound = name => {
  const pack = getLogEntries();
  var stayHounds = pack.filter(hound => hound.name !== name);
  saveLogEntries(stayHounds);
  return pack.length !== stayHounds.length;
};
//get one hound:
const getHound = name => {
  var pack = getLogEntries();
  var targetHound = pack.filter(hound => hound.name === name);
  console.log(targetHound);
  return targetHound[0];
};

//add a hound to the pack:
const addHound = (name, color, sex, description) => {
  var pack = getLogEntries();
  var hound = {
    name,
    color,
    sex,
    description
  };
  var doopHound = pack.filter(hound => hound.name === name);
  if (doopHound.length === 0) {
    pack.push(hound);
    saveLogEntries(pack);
    return hound;
  }
};

module.exports = {
  addHound,
  getPack,
  getHound,
  deleteHound,
  printInfo
};
