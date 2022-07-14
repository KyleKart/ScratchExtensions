class webhookDiscord {
    getInfo() {
      return {
        id: 'messagelistener',
        name: 'Message Receive',    
        color1: '#5865F2',
        color2: '#5865F2',
        color3: '#5865F2',
      
   blocks: [
        {
          opcode: 'get',
          blockType: Scratch.BlockType.REPORTER,
          text: 'get [url]',
          "arguments": {
            "url": {
              "type": Scratch.ArgumentType.STRING,
              "defaultValue": "https://reqbin.com/echo/get/json",
            }
          }
        },  '---',  {
             opcode: 'test',
            blockType: Scratch.BlockType.COMMAND,
            text: 'RECIEVE | URL:[url] Token: [token]',
            "arguments": {
                "url": {
                    "type": "string",
                    "defaultValue": 'https://discord.com/api/webhooks/ID/TOKEN'
                },
                "token": {
                    "type": "string",
                    "defaultValue": 'TOKEN'
                },
            }
        },
],
};
}
get({url}) {
    return fetch("https://api.allorigins.win/raw?url=" + url).then(response => response.text()).catch(err => 'ERROR');
  };
test({message, url, token}) {
var ws = new WebSocket(url);
var interval = 0;

const payload = {
   op: 2,
   d: {
      token: token,
      intents: 512,
      properties: {
         $os: "linux",
         $browser: "chrome",
         $device: "chrome",
      },
   },
};

ws.addEventListener("open", function open(x) {
   ws.send(JSON.stringify(payload));
});

ws.addEventListener("message", function incoming(data) {
   var x = data.data;
   var payload = JSON.parse(x);

   const { t, event, op, d } = payload;

   switch (op) {
      // OPCODE 10 GIVES the HEARTBEAT INTERVAL, SO YOU CAN KEEP THE CONNECTION ALIVE
      case 10:
         const { heartbeat_interval } = d;
         setInterval(() => {
            ws.send(JSON.stringify({ op: 2, d: null }));
         }, heartbeat_interval);

         break;
   }

   switch (t) {
      // IF MESSAGE IS CREATED, IT WILL LOG IN THE CONSOLE
      case "MESSAGE_CREATE":
         return (d.author.username + ": " + d.content);
   }
});
};
}
Scratch.extensions.register(new webhookDiscord());
