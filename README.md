Hi thanks for visiting to this project.

To describe this project, _this is meant to create an integration between Asana and Airtable to push the tasks that are **created** in Asana to Airtable table_.

<h2>To make this integration possible, we need few arrangements to be made:</h2>

1. Create Accounts in Asana and Airtable.

2. Personal Access Token (PAT) of Asana which can be created after login and creating project in Asana from this link : _**https://app.asana.com/0/my-apps**_

![image](https://github.com/7Aditya5/SpotDRAFT-asana-airtable-integration/assets/38333466/5433ea51-9376-46e6-ae9c-04d4b8891760)

3. ApiKey from Airtable after creating account in Airtable. Visit **"Developer Hub"** from Profile icon on top right corner.

![Screenshot (239)](https://github.com/7Aditya5/SpotDRAFT-asana-airtable-integration/assets/38333466/52fbbb72-771b-4b66-8a73-d5715e386e79)

   Visit https://airtable.com/create/tokens to create personal access token (PAT) i.e, the Apikey and give scopes of data.records:write to Create, edit, and delete records.

![Screenshot (240)](https://github.com/7Aditya5/SpotDRAFT-asana-airtable-integration/assets/38333466/b5dce171-103c-4e78-9888-f6a3a193cc8a)

    Also create a table in the base, which in my case is "Asana Tasks" with columns
        ● Task ID
        ● Name
        ● Assignee
        ● Due Date
        ● Description

![image](https://github.com/7Aditya5/SpotDRAFT-asana-airtable-integration/assets/38333466/865b962a-5cfd-4f6f-9349-2902eff42b58)

4. BaseID from Airtable of the base where table is created. Visit below to get it.
   https://airtable.com/developers/web/api/introduction
   Then click on the workspace/base mentioned in the page where your table is created.

   ![image](https://github.com/7Aditya5/SpotDRAFT-asana-airtable-integration/assets/38333466/91eaccd7-aea5-40e4-ae19-6a959d9f20f8)

5. A webhook server: Here I have created using node.js

6. As a requirement of Asana to respond on webhook, any webhook server needs to be publicly accessible on internet. To do that download Ngrok(https://ngrok.com/download) and install it on your device as per the OS. Create an account there as well and preferably install ngrok client for nodejs using npm, steps are shown in screenshot(https://dashboard.ngrok.com/get-started/setup/nodejs). Create a token with Ngrok as well to use the ngrok client with nodejs.

![Screenshot (241)](https://github.com/7Aditya5/SpotDRAFT-asana-airtable-integration/assets/38333466/9f7d1d21-87e8-41c5-bdc6-406a45ab42b7)

![Screenshot (242)](https://github.com/7Aditya5/SpotDRAFT-asana-airtable-integration/assets/38333466/5222141a-24eb-4455-9a0a-1974925bcd07)

7. Now the ngrok will be paired using the token and to run the nodejs app behind the public facing ngrok server execute command : NGROK_AUTHTOKEN=<Ngrok AUTHTOKEN> npm start.

8. After running the above command, the server will run and an url from ngrok will be provided like shown here.

![image](https://github.com/7Aditya5/SpotDRAFT-asana-airtable-integration/assets/38333466/a76ea543-81b1-4c5e-83b6-e43589ca567d)

9. Using these links of Asana docs, one can know how to use them:
    https://developers.asana.com/docs/webhooks-guide
    https://developers.asana.com/docs/quick-start

10. To register own server with Asana for webhook, hit a post request to https://app.asana.com/api/1.0/webhooks with bearer token as PAT of Asana in headers of the request. Send the body as shown here in screenshot.

![image](https://github.com/7Aditya5/SpotDRAFT-asana-airtable-integration/assets/38333466/4fbd45c6-fac2-467e-8071-f207e37aedbc)

The body as in screenshot is written here. Use this exactly to make sure the webhook is registered in Asana server for events like task creation in Asana.
{
  "data": {
   "resource": "1207344194731447",
    "target": "https://6e94-45-117-205-53.ngrok-free.app/receiveWebhook",
    "filters": [
      {
        "resource_type": "task",
        "action": "added"
       // "fields": ["due_on","name","notes","liked"]
      }
    ]
  }
}

A sample request snippet is written below and can be used to make request using CLI:

**curl -H "Authorization: Bearer <personal_access_token>" \
          -X POST https://app.asana.com/api/1.0/webhooks \
          -d "resource=8675309" \
          -d "https://6e94-45-117-205-53.ngrok-free.app/receiveWebhook"
**

11. Now that we have setup webhook with Asana, we can create tasks in Asana and the nodejs code will push them to Airtable to dedicated base table.
    Watch the video: https://www.youtube.com/watch?v=yu_ilbefNOY to see the task created in Asana is pushed into Airtable.

