const fs = require('fs');

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
//get all of the entries:
const getPack = () => {
  return getLogEntries();
};
//delete a hound
const deleteHound = name => {
  var pack = getLogEntries();
  var stayHounds = pack.filter(hound => pack.name !== name);
  saveLogEntries(stayHounds);
  return pack.length !== stayHounds.length;
};
//get one hound:
const getHound = name => {
  var pack = getLogEntries();
  var targetHound = pack.filter(hound => pack.name === name);
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
const printInfo = hound => {
  if (!hound) {
    console.log('Hound not found.');
  } else {
    console.log('~~~~~~~~~~');
    console.log(`Name: ${hound.name}`);
    console.log(`body: ${hound.color}`);
    console.log(`Name: ${hound.sex}`);
    console.log(`body: ${hound.description}`);
  }
};
module.exports = {
  addHound,
  getPack,
  getHound,
  deleteHound,
  printInfo
};
