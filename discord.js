const webhookIcon = "data:image/svg+xml;base64,PHN2ZyBpZD0ic3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAsIDAsIDQwMCw0MDAiPjxnIGlkPSJzdmdnIj48cGF0aCBpZD0icGF0aDAiIGQ9Ik0yMDAuNzgxIDQ1LjgyOSBDIDEzOC4yODIgNTAuNDEwLDEwOC43ODUgMTI0LjUyNiwxNTAuMDU5IDE3My4yNzcgTCAxNTUuMTk3IDE3OS4zNDUgMTM2LjM4NyAyMTAuMDI4IEwgMTE3LjU3OCAyNDAuNzEyIDExMC41NDcgMjQwLjg3MCBDIDY5LjI5MiAyNDEuODAwLDcxLjIzMyAzMDQuMjk3LDExMi41MTYgMzA0LjI5NyBDIDEzNS42NzEgMzA0LjI5NywxNTAuMzMyIDI4MS42NDQsMTQxLjE1OSAyNjAuMDQwIEwgMTM4Ljk1OSAyNTQuODU5IDE2NC4wNzggMjE0LjAzNyBDIDE3Ny44OTMgMTkxLjU4NSwxODkuMzQ0IDE3Mi44MjYsMTg5LjUyNCAxNzIuMzUwIEMgMTg5LjcwNCAxNzEuODc0LDE4Ny41ODUgMTcwLjMxNCwxODQuODE1IDE2OC44ODQgQyAxNDMuNzQ5IDE0Ny42NzgsMTUwLjQwNiA4NC4zNjcsMTk0Ljg5MSA3My4wNTkgQyAyMzQuNjkxIDYyLjk0MiwyNzEuMDYzIDEwNy4wODUsMjU0LjI1MSAxNDUuMTAwIEMgMjUzLjE5MSAxNDcuNDk3LDI1Mi40MTYgMTQ5LjUxNywyNTIuNTI5IDE0OS41ODcgQyAyNTIuNjQyIDE0OS42NTgsMjU3LjQzNiAxNTIuNDI1LDI2My4xODIgMTU1LjczNSBDIDI3NS4yMzUgMTYyLjY4MCwyNzQuMTQwIDE2Mi44ODMsMjc4LjA3OSAxNTIuOTcwIEMgMjk5LjIxOCA5OS43NjEsMjU3LjMxOSA0MS42ODYsMjAwLjc4MSA0NS44MjkgTTE5Ni4zMTcgOTEuNzE2IEMgMTYzLjc1MiAxMDIuMzEyLDE2OC41NTAgMTQ4LjU3NiwyMDIuNzIzIDE1My40NzcgTCAyMDguOTYyIDE1NC4zNzIgMjMwLjM1OCAxOTMuOTU3IEwgMjUxLjc1NSAyMzMuNTQyIDI2MC4xOTYgMjI5LjI0MiBDIDMwNy44NjYgMjA0Ljk1OSwzNTcuNTMwIDI1NS40MzIsMzI5LjU1NCAyOTkuNzI5IEMgMzEwLjcwNSAzMjkuNTc0LDI2My4yNTkgMzMxLjA1OSwyNDMuNDE2IDMwMi40MjYgQyAyNDAuNjA3IDI5OC4zNzIsMjQxLjM5OSAyOTguMjMxLDIyOS45NjcgMzA0LjgxMyBDIDIxOC41MTcgMzExLjQwNSwyMTguODU3IDMxMS4wMTQsMjIxLjMyNyAzMTQuNzQ2IEMgMjQyLjkwMCAzNDcuMzQ0LDI4Ny4xNTEgMzU4LjQ0NywzMjIuNjU2IDM0MC4xNzAgQyAzNzMuNjc0IDMxMy45MDcsMzc3LjQxNCAyNDEuMDU2LDMyOS4zNjEgMjA5LjU2MCBDIDMxMi40MjUgMTk4LjQ1OSwyODUuODA4IDE5My43NDYsMjY4LjA1NyAxOTguNzA0IEMgMjYxLjkzMyAyMDAuNDE1LDI2NC41NjggMjAzLjg1NCwyNDYuNTk5IDE3MC43MDMgQyAyMzIuNDc2IDE0NC42NDcsMjMxLjQzOSAxNDIuNDYzLDIzMi41MDEgMTQxLjAxNiBDIDI1MC40MzcgMTE2LjU1OSwyMjUuMjg2IDgyLjI5MCwxOTYuMzE3IDkxLjcxNiBNOTYuNDk3IDE5Ny4zOTAgQyAyNi40NjMgMjEyLjM5NSwxMy44MDggMzA5LjkyNiw3Ny43MzQgMzQxLjk5NiBDIDEyMi4wNTcgMzY0LjIzMSwxNzkuMDM0IDMzNS45MzcsMTg3LjA4MyAyODcuNjk1IEwgMTg3LjYzNyAyODQuMzc1IDIyMS4wNzEgMjg0LjM3NSBMIDI1NC41MDQgMjg0LjM3NSAyNTYuNTc5IDI4OC42MTUgQyAyNjkuODAzIDMxNS42NDUsMzExLjYxOSAzMDguMjI0LDMxNi40OTAgMjc3Ljk4MyBDIDMyMS45MTAgMjQ0LjMyOCwyNzYuNDA5IDIyNy40MTAsMjU4LjE3MiAyNTYuMzAwIEwgMjU2LjIzMCAyNTkuMzc1IDIyNy40NjAgMjU5LjM3NSBDIDIxMS42MzcgMjU5LjM3NSwxOTAuNzYxIDI1OS42MDYsMTgxLjA3MSAyNTkuODg4IEwgMTYzLjQ1MiAyNjAuNDAxIDE2My4xMDMgMjcxLjAyMSBDIDE2MS4yOTkgMzI1Ljk5NSw4OS45MDkgMzQzLjg1Myw2Ni43NjUgMjk1LjExOSBDIDUxLjkzNyAyNjMuODk0LDcyLjc1OCAyMjYuMDUyLDEwNy43MjkgMjIwLjY2NiBMIDExMS4xNjIgMjIwLjEzNyAxMTAuNjYzIDIxMi42MDggQyAxMTAuMzg5IDIwOC40NjYsMTEwLjE2MyAyMDMuMDU3LDExMC4xNjAgMjAwLjU4NiBMIDExMC4xNTYgMTk2LjA5NCAxMDYuMDU1IDE5Ni4xNTcgQyAxMDMuNzk5IDE5Ni4xOTIsOTkuNDk4IDE5Ni43NDcsOTYuNDk3IDE5Ny4zOTAgIiBzdHJva2U9Im5vbmUiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjwvZz48L3N2Zz4="
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
            text: 'SEND | Message:[message] URL:[url]',
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
            }
        },
        {
          opcode: 'bot',
         blockType: Scratch.BlockType.COMMAND,
         text: 'SEND | Message:[message] URL:[url] Token: [token]',
         "arguments": {
             "message": {
                 "type": "string",
                 "defaultValue": "Hello!"
             },
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
  webhook({message, url}) {
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username":"Scratch Project",
            "avatar_url": "https://raw.githubusercontent.com/KyleKart/ScratchExtensions/gh-pages/pfp.png",
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
      "content":message,
      "tts": false
      })
    }).then(res => res.json())
      .then(res => console.log(res));
};
}
Scratch.extensions.register(new Discord());