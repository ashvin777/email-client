import Gmail from '../../services/gmail';

export default {
  data() {
    return {
      from: 'ashvin.suthar777@gmail.com',
      to: 'ashvin.suthar777@gmail.com',
      subject: 'Ashvin email',
      body: 'Hi'
    }
  },

  methods: {
    send() {
      Gmail.send({
        to: this.to,
        from: this.from,
        sender: this.sender,
        subject: this.subject,
        body: this.body,
        text: this.body,
        html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
        attachments: [{
          filename: 'profile.jpeg',
          path: '/Users/ashvin/Desktop/profile.jpeg',
          cid: 'unique@kreata.ee' //same cid value as in the html img src
        }]
      });
    }
  }
}