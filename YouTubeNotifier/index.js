module.exports = async function (context, myTimer) {
  const { google } = require("googleapis");
  const sendGridClient = require("@sendgrid/mail");

  const youtube = google.youtube({
    version: "v3",
    auth: process.env["YouTubeAPIKey"],
  });

  sendGridClient.setApiKey(process.env["SendGridAPIKey"]);

  const response = await youtube.commentThreads.list({
    part: "snippet,replies",
    allThreadsRelatedToChannelId: process.env["YouTubeChannelID"],
    maxResults: 100,
    order: "time",
  });

  if (response.data) {
    const lastRun = new Date(myTimer.scheduleStatus.last);

    response.data.items.forEach(function (comment) {
      const topLevelComment = comment.snippet.topLevelComment.snippet;
      const topLevelCommentDate = new Date(topLevelComment.publishedAt);

      if (topLevelCommentDate.getTime() > lastRun.getTime()) {
        sendEmail(
          topLevelComment.authorDisplayName,
          topLevelComment.textDisplay,
          `https://www.youtube.com/watch?v=${topLevelComment.videoId}&lc=${comment.id}`
        );
      }

      if (comment.snippet.totalReplyCount > 0) {
        comment.replies.comments.forEach(function (reply) {
          const replyDate = new Date(reply.snippet.publishedAt);

          if (replyDate.getTime() > lastRun.getTime()) {
            sendEmail(
              reply.snippet.authorDisplayName,
              reply.snippet.textDisplay,
              `https://www.youtube.com/watch?v=${reply.snippet.videoId}&lc=${reply.id}`
            );
          }
        });
      }
    });
  }

  function sendEmail(user, comment, url) {
    let body = "There is a new comment in one of your videos\n";
    body += `User: ${user}\n`;
    body += `Comment: ${comment}\n`;
    body += `Url: ${url}`;

    const msg = {
      to: process.env["EmailTo"],
      from: process.env["EmailFrom"],
      subject: "There is a new comment in your YouTube Channel",
      text: body,
    };

    sendGridClient
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.log(error.response.body);
      });
  }
};
