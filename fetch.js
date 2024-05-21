const axios = require('axios');
const secrets = require('./secrets');

// Replace with your actual Asana personal access token
const ASANA_ACCESS_TOKEN = secrets.ASANA_ACCESS_TOKEN;

// Function to get task details from Asana
async function getAsanaTask(taskId) {

  
  const url = `https://app.asana.com/api/1.0/tasks/${taskId}`;

  try {

    await new Promise(r=>setTimeout(r,20000));
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${ASANA_ACCESS_TOKEN}`
      }
    });

    // Checking if response status is OK
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching task from Asana:', error);
  }
}



module.exports = { getAsanaTask };
