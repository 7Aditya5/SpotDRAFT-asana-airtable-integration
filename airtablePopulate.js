var Airtable = require('airtable');
const secrets = require('./secrets')

function dataToAirtable(taskId,name,assignee,dueDate,description){
    var base = new Airtable({apiKey: secrets.airtableApikey}).base(secrets.baseID);
    base('Asana Tasks').create([
      {
        "fields": {
        "Task ID": taskId,
        "Name": name, 
        "Assignee": assignee,
        "Due Date": dueDate,
        "Description": description
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    });
}

module.exports = { dataToAirtable };
