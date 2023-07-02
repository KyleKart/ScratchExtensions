const webhookIcon = "data:image/svg+xml;base64,PHN2ZyBpZD0ic3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAsIDAsIDQwMCw0MDAiPjxnIGlkPSJzdmdnIj48cGF0aCBpZD0icGF0aDAiIGQ9Ik0yMDAuNzgxIDQ1LjgyOSBDIDEzOC4yODIgNTAuNDEwLDEwOC43ODUgMTI0LjUyNiwxNTAuMDU5IDE3My4yNzcgTCAxNTUuMTk3IDE3OS4zNDUgMTM2LjM4NyAyMTAuMDI4IEwgMTE3LjU3OCAyNDAuNzEyIDExMC41NDcgMjQwLjg3MCBDIDY5LjI5MiAyNDEuODAwLDcxLjIzMyAzMDQuMjk3LDExMi41MTYgMzA0LjI5NyBDIDEzNS42NzEgMzA0LjI5NywxNTAuMzMyIDI4MS42NDQsMTQxLjE1OSAyNjAuMDQwIEwgMTM4Ljk1OSAyNTQuODU5IDE2NC4wNzggMjE0LjAzNyBDIDE3Ny44OTMgMTkxLjU4NSwxODkuMzQ0IDE3Mi44MjYsMTg5LjUyNCAxNzIuMzUwIEMgMTg5LjcwNCAxNzEuODc0LDE4Ny41ODUgMTcwLjMxNCwxODQuODE1IDE2OC44ODQgQyAxNDMuNzQ5IDE0Ny42NzgsMTUwLjQwNiA4NC4zNjcsMTk0Ljg5MSA3My4wNTkgQyAyMzQuNjkxIDYyLjk0MiwyNzEuMDYzIDEwNy4wODUsMjU0LjI1MSAxNDUuMTAwIEMgMjUzLjE5MSAxNDcuNDk3LDI1Mi40MTYgMTQ5LjUxNywyNTIuNTI5IDE0OS41ODcgQyAyNTIuNjQyIDE0OS42NTgsMjU3LjQzNiAxNTIuNDI1LDI2My4xODIgMTU1LjczNSBDIDI3NS4yMzUgMTYyLjY4MCwyNzQuMTQwIDE2Mi44ODMsMjc4LjA3OSAxNTIuOTcwIEMgMjk5LjIxOCA5OS43NjEsMjU3LjMxOSA0MS42ODYsMjAwLjc4MSA0NS44MjkgTTE5Ni4zMTcgOTEuNzE2IEMgMTYzLjc1MiAxMDIuMzEyLDE2OC41NTAgMTQ4LjU3NiwyMDIuNzIzIDE1My40NzcgTCAyMDguOTYyIDE1NC4zNzIgMjMwLjM1OCAxOTMuOTU3IEwgMjUxLjc1NSAyMzMuNTQyIDI2MC4xOTYgMjI5LjI0MiBDIDMwNy44NjYgMjA0Ljk1OSwzNTcuNTMwIDI1NS40MzIsMzI5LjU1NCAyOTkuNzI5IEMgMzEwLjcwNSAzMjkuNTc0LDI2My4yNTkgMzMxLjA1OSwyNDMuNDE2IDMwMi40MjYgQyAyNDAuNjA3IDI5OC4zNzIsMjQxLjM5OSAyOTguMjMxLDIyOS45NjcgMzA0LjgxMyBDIDIxOC41MTcgMzExLjQwNSwyMTguODU3IDMxMS4wMTQsMjIxLjMyNyAzMTQuNzQ2IEMgMjQyLjkwMCAzNDcuMzQ0LDI4Ny4xNTEgMzU4LjQ0NywzMjIuNjU2IDM0MC4xNzAgQyAzNzMuNjc0IDMxMy45MDcsMzc3LjQxNCAyNDEuMDU2LDMyOS4zNjEgMjA5LjU2MCBDIDMxMi40MjUgMTk4LjQ1OSwyODUuODA4IDE5My43NDYsMjY4LjA1NyAxOTguNzA0IEMgMjYxLjkzMyAyMDAuNDE1LDI2NC41NjggMjAzLjg1NCwyNDYuNTk5IDE3MC43MDMgQyAyMzIuNDc2IDE0NC42NDcsMjMxLjQzOSAxNDIuNDYzLDIzMi41MDEgMTQxLjAxNiBDIDI1MC40MzcgMTE2LjU1OSwyMjUuMjg2IDgyLjI5MCwxOTYuMzE3IDkxLjcxNiBNOTYuNDk3IDE5Ny4zOTAgQyAyNi40NjMgMjEyLjM5NSwxMy44MDggMzA5LjkyNiw3Ny43MzQgMzQxLjk5NiBDIDEyMi4wNTcgMzY0LjIzMSwxNzkuMDM0IDMzNS45MzcsMTg3LjA4MyAyODcuNjk1IEwgMTg3LjYzNyAyODQuMzc1IDIyMS4wNzEgMjg0LjM3NSBMIDI1NC41MDQgMjg0LjM3NSAyNTYuNTc5IDI4OC42MTUgQyAyNjkuODAzIDMxNS42NDUsMzExLjYxOSAzMDguMjI0LDMxNi40OTAgMjc3Ljk4MyBDIDMyMS45MTAgMjQ0LjMyOCwyNzYuNDA5IDIyNy40MTAsMjU4LjE3MiAyNTYuMzAwIEwgMjU2LjIzMCAyNTkuMzc1IDIyNy40NjAgMjU5LjM3NSBDIDIxMS42MzcgMjU5LjM3NSwxOTAuNzYxIDI1OS42MDYsMTgxLjA3MSAyNTkuODg4IEwgMTYzLjQ1MiAyNjAuNDAxIDE2My4xMDMgMjcxLjAyMSBDIDE2MS4yOTkgMzI1Ljk5NSw4OS45MDkgMzQzLjg1Myw2Ni43NjUgMjk1LjExOSBDIDUxLjkzNyAyNjMuODk0LDcyLjc1OCAyMjYuMDUyLDEwNy43MjkgMjIwLjY2NiBMIDExMS4xNjIgMjIwLjEzNyAxMTAuNjYzIDIxMi42MDggQyAxMTAuMzg5IDIwOC40NjYsMTEwLjE2MyAyMDMuMDU3LDExMC4xNjAgMjAwLjU4NiBMIDExMC4xNTYgMTk2LjA5NCAxMDYuMDU1IDE5Ni4xNTcgQyAxMDMuNzk5IDE5Ni4xOTIsOTkuNDk4IDE5Ni43NDcsOTYuNDk3IDE5Ny4zOTAgIiBzdHJva2U9Im5vbmUiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjwvZz48L3N2Zz4="
const botIcon = "data:image/svg+xml;base64,PHN2ZyBpZD0ic3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCwgMCwgNDAwLDQwMCI+PGcgaWQ9InN2Z2ciPjxwYXRoIGlkPSJwYXRoMCIgZD0iTTQxLjQyOCAzMy4yMzkgQyA0MC42NDMgMzQuMDI0LDQwLjAwMCA5Mi4zOTAsNDAuMDAwIDE2Mi45NDEgTCA0MC4wMDAgMjkxLjIxNSA0NS4wNTIgMzAxLjM1MiBDIDg2LjAwNiAzODMuNTM2LDMyNS40MzggMzgwLjcxMiwzNTYuODEzIDI5Ny42NzUgQyAzNTkuNzQ4IDI4OS45MDksMzYwLjAzNCAyNzUuNTk0LDM1OS41NDYgMTYxLjAwMCBMIDM1OS4wMDAgMzMuMDAwIDM1Mi4wMDAgMzMuMDAwIEwgMzQ1LjAwMCAzMy4wMDAgMzQ0LjAwMCA4OC4wMDAgTCAzNDMuMDAwIDE0My4wMDAgMzM4LjM2NSAxMzUuNTQ2IEMgMzE1LjYzOSA5OC45OTUsMjcwLjM2NSA4MS4yMTgsMjAwLjAwMCA4MS4yMTggQyAxMjkuNjM1IDgxLjIxOCw4NC4zNjEgOTguOTk1LDYxLjYzNSAxMzUuNTQ2IEwgNTcuMDAwIDE0My4wMDAgNTYuMDAwIDg4LjAwMCBMIDU1LjAwMCAzMy4wMDAgNDguOTI4IDMyLjQwNSBDIDQ1LjU4OSAzMi4wNzgsNDIuMjE0IDMyLjQ1Myw0MS40MjggMzMuMjM5IE0yODAuOTgzIDE4NC45OTIgQyAzMTkuNzgxIDE5OS40MjEsMzMwLjY4MCAyNTEuNTgwLDMwMS4wODMgMjgxLjE3NyBDIDI4My43NDUgMjk4LjUxNiwyODEuMDAwIDI5OS4wMDAsMjAwLjAwMCAyOTkuMDAwIEMgMTE5LjAwMCAyOTkuMDAwLDExNi4yNTUgMjk4LjUxNiw5OC45MTcgMjgxLjE3NyBDIDY0Ljk0NiAyNDcuMjA3LDgzLjU2NyAxOTAuNDYwLDEzMS40NjMgMTgxLjk5MyBDIDE1MS4yODQgMTc4LjQ4OSwyNjkuODk1IDE4MC44NjksMjgwLjk4MyAxODQuOTkyIE0xMjIuODAwIDIyMi44MDAgQyAxMDcuMDExIDIzOC41ODksMTE3LjYyMCAyNjQuMDAwLDE0MC4wMDAgMjY0LjAwMCBDIDE1NS4wODUgMjY0LjAwMCwxNjQuMDAwIDI1NS4wODUsMTY0LjAwMCAyNDAuMDAwIEMgMTY0LjAwMCAyMzAuODM5LDE2My4xOTAgMjI4Ljc5MCwxNTcuMjAwIDIyMi44MDAgQyAxNTEuMjEwIDIxNi44MTAsMTQ5LjE2MSAyMTYuMDAwLDE0MC4wMDAgMjE2LjAwMCBDIDEzMC44MzkgMjE2LjAwMCwxMjguNzkwIDIxNi44MTAsMTIyLjgwMCAyMjIuODAwIE0yNDIuODAwIDIyMi44MDAgQyAyMjcuMDExIDIzOC41ODksMjM3LjYyMCAyNjQuMDAwLDI2MC4wMDAgMjY0LjAwMCBDIDI2OS4xNjEgMjY0LjAwMCwyNzEuMjEwIDI2My4xOTAsMjc3LjIwMCAyNTcuMjAwIEMgMjkyLjk4OSAyNDEuNDExLDI4Mi4zODAgMjE2LjAwMCwyNjAuMDAwIDIxNi4wMDAgQyAyNTAuODM5IDIxNi4wMDAsMjQ4Ljc5MCAyMTYuODEwLDI0Mi44MDAgMjIyLjgwMCBNMTQ1LjAwMCAyNDAuMDAwIEMgMTQ1LjAwMCAyNDUuOTA0LDEzNi44MDQgMjQ4LjQyMSwxMzQuNzc3IDI0My4xNDAgQyAxMzIuNzg2IDIzNy45NTEsMTM1LjU3NyAyMzMuNjYyLDE0MC40OTEgMjM0LjM2MCBDIDE0My43OTcgMjM0LjgyOSwxNDUuMDAwIDIzNi4zMzUsMTQ1LjAwMCAyNDAuMDAwIE0yNjUuMDAwIDI0MC4wMDAgQyAyNjUuMDAwIDI0NS45MDQsMjU2LjgwNCAyNDguNDIxLDI1NC43NzcgMjQzLjE0MCBDIDI1Mi43ODYgMjM3Ljk1MSwyNTUuNTc3IDIzMy42NjIsMjYwLjQ5MSAyMzQuMzYwIEMgMjYzLjc5NyAyMzQuODI5LDI2NS4wMDAgMjM2LjMzNSwyNjUuMDAwIDI0MC4wMDAgIiBzdHJva2U9Im5vbmUiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjwvZz48L3N2Zz4="
class Discord {
    getInfo() {
      return {
        id: 'discord',
        name: 'Discord',    
        color1: '#5865F2',
        color2: '#5865F2',
        color3: '#5865F2',
      
   blocks: [
        {
             opcode: 'webhook',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Name: [name] PFP: [pfp] Message:[message] URL:[url]',
            blockIconURI: webhookIcon,
            "arguments": {
                "message": {
                    "type": "string",
                    "defaultValue": "Hello!"
                },
                "url": {
                    "type": "string",
                    "defaultValue": 'https://discord.com/api/webhooks/ID/TOKEN'
                },
                "pfp": {
                  "type": "string",
                  "defaultValue": 'https://raw.githubusercontent.com/KyleKart/ScratchExtensions/gh-pages/pfp.png'
              },
              "name": {
                "type": "string",
                "defaultValue": 'Scratch Project'
            },
            }
        },
        {
          opcode: 'bot',
         blockType: Scratch.BlockType.COMMAND,
         text: 'Message:[message] URL:[url] Token: [token]',
         blockIconURI: botIcon,
         "arguments": {
             "message": {
                 "type": "string",
                 "defaultValue": "Hello!"
             },
             "url": {
                 "type": "string",
                 "defaultValue": 'https://discord.com/api/v9/channels/ID/messages'
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
  webhook({name, pfp, message, url}) {
    var DCname = name
    var DCpfp = pfp
  if (name == "") DCname = "Scratch Project";
  if (pfp == "") DCpfp = "https://raw.githubusercontent.com/KyleKart/ScratchExtensions/gh-pages/pfp.png";
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username":DCname,
            "avatar_url": DCpfp,
            "content":message
        })
      }).then(res => res.json())
        .then(res => console.log(res))
        .catch( err => {
        console.log(err);
        })
        
};
bot({message, url, token}) {
  return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' :token
      },
      body: JSON.stringify({
      "content":"Bot " + message,
      "tts": false
      })
    }).then(res => res.json())
      .then(res => console.log(res));
};
}
Scratch.extensions.register(new Discord());
