var request = require("request");

var options = { method: 'POST',
  url: 'https://www.googleapis.com/batch/gmail/v1',
  headers:
   { 'postman-token': '9a2a3705-b389-0fb3-6b12-a8a352dd5682',
     'cache-control': 'no-cache',
     'content-type': 'multipart/mixed; boundary=boundary',
     authorization: 'Bearer ya29.GlwGBrnISiGZxKdl6OLsc-33PAR_5viwXTgta_7EeX_wP_0rGCml56POe_oF93_rYGhXvHvpeeruerjRtDJEv0NEsAJAKl0eYIozL6BAJh8CyuvP9mSLxj6no1u5AA' },
  body: '--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_2\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_10\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_6\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/CATEGORY_FORUMS\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_8\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_1\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/CATEGORY_PERSONAL\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/CATEGORY_SOCIAL\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_12\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_7\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_3\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_5\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_9\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/IMPORTANT\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_4\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/Label_11\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/CATEGORY_UPDATES\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/CHAT\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/SENT\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/INBOX\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/TRASH\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/CATEGORY_PROMOTIONS\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/DRAFT\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/SPAM\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/STARRED\n--boundary\nContent-Type: application/http\n\nGET gmail/v1/users/me/labels/UNREAD\n--boundary--' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
