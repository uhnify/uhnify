import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
import '/imports/startup/both/Methods';

Meteor.startup(() => {
  const filePath = Assets.absoluteFilePath('defaultClubs.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const defaultClubs = JSON.parse(fileContents);
  // Now you can use 'defaultClubs' as needed
});