# YouTube Notifier

This app is an [Azure Function](https://azure.microsoft.com/en-us/services/functions/) that notifies a user via email whenever a new comment is written in any video of a certain YouTube channel.

## Requiremets

To run this application you will need:

### Create a Google Developer Project to get YouTube API Key

- Go to https://developers.google.com/ and log in with your Google Account (or create an account, if necessary).
- Go to https://console.developers.google.com/project and click on **Create Project**. Put the details you prefer for the project.
- Click on **Enable APIs and Services** and look for **YouTube Data API v3**. Select it and click on **Enable**.
- Go to **Credentials** and click on **Create Credentials** -> **API Key**. Save the generated key.

### Create a SendGrid account to get an API Key

- [Sign Up on SendGrid](https://signup.sendgrid.com/).
- Go to https://app.sendgrid.com/settings/api_keys and click on **Create API Key**. Set a name for it and give it Full Access.
- Click on **Create and View**. Save the generated key.

After that, you will need to [Verify a Single Sender](https://app.sendgrid.com/settings/sender_auth/senders). That is verifying the email account we will use later in the app to be the sender of our notifications.

### Create an Azure Account

- [Sign Up on Microsoft Azure](https://azure.microsoft.com/en-us/free/).
- Create an [Azure storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create).
- Select your storage account, select **Access keys** in Settings, then copy the Connection string.

## Getting Started

Clone this repository

```bash
git clone https://github.com/fgiuliani/youtube-notifier youtube-notifier
```

Switch into the newly created folder

```bash
cd youtube-notifier
```

Install the necessary node packages

```bash
npm install
```

Duplicate `local.settings.json.example` and rename it as `local.settings.json`. Put the necessary data inside in order to be able to run the project.

```
"AzureWebJobsStorage": "[AZURE_STORAGE_CONNECTION_STRING]", // Connection string to connect to your Azure storage account

"YouTubeAPIKey": "[YOUTUBE_API_KEY]", // The API Key generated in your Google Developer Project
"YouTubeChannelID": "[YOUTUBE_CHANNEL_ID]", // The ID of the YouTube channel you want to watch

"SendGridAPIKey": "[SENDGRID_API_KEY]", // SendGrid API Key
"EmailFrom": "[SENDER_EMAIL]", // The sender email for the notifications
"EmailTo": "[RECEIVER_EMAIL]" // The receiver email for the notifications
```

After following the previous steps, Azure Function is ready to be executed.
