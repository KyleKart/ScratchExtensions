class BasicK {
    getInfo() {
      return {
        id: 'basick',
        name: 'Basic_K',    
        color1: '#389438',
        color2: '#276627',
        menuIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzOC41IiBoZWlnaHQ9IjM4LjUiIHZpZXdCb3g9IjAsMCwzOC41LDM4LjUiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjAuNzUsLTE2MC43NSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI1OCwxOTRjMCwyLjIwOSAtMS43OTEsNCAtNCw0aC0yOGMtMi4yMDksMCAtNCwtMS43OTEgLTQsLTR2LTI4YzAsLTIuMjA5IDEuNzkxLC00IDQsLTRoMjhjMi4yMDksMCA0LDEuNzkxIDQsNHoiIGZpbGw9IiMzODk0MzgiIHN0cm9rZT0iIzI3NjYyNyIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cGF0aCBkPSJNMjUzLjI3NjE1LDE3NS4wMjE0NWMwLDEuMzc0NzkgLTEuMTE0NDksMi40ODkyOCAtMi40ODkyOCwyLjQ4OTI4aC0yMS41NzM3NGMtMS4zNzQ3OSwwIC0yLjQ4OTI4LC0xLjExNDQ5IC0yLjQ4OTI4LC0yLjQ4OTI4YzAsLTEuMzc0NzkgMS4xMTQ0OSwtMi40ODkyOCAyLjQ4OTI4LC0yLjQ4OTI4aDIxLjU3Mzc0YzEuMzc0NzksMCAyLjQ4OTI4LDEuMTE0NDkgMi40ODkyOCwyLjQ4OTI4ek0yNTMuMjc2MTUsMTg0Ljk3ODU1YzAsMS4zNzQ3OSAtMS4xMTQ0OSwyLjQ4OTI4IC0yLjQ4OTI4LDIuNDg5MjhoLTIxLjU3Mzc0Yy0xLjM3NDc5LDAgLTIuNDg5MjgsLTEuMTE0NDkgLTIuNDg5MjgsLTIuNDg5MjhjMCwtMS4zNzQ3OSAxLjExNDQ5LC0yLjQ4OTI4IDIuNDg5MjgsLTIuNDg5MjhoMjEuNTczNzRjMS4zNzQ3OSwwIDIuNDg5MjgsMS4xMTQ0OSAyLjQ4OTI4LDIuNDg5Mjh6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjE5LjI1OjE5LjI1LS0+',

   blocks: [
        {
          opcode: 'tf',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[input1] = [input2] = [input3]',
          "arguments": {
            "input1": {
              "type": "string",
              "defaultValue": "true",
              "menu": "options1",
            },
            "input2": {
                "type": "string",
                "defaultValue": 'false',
                "menu": "options1",
            },
            "input3": {
                "type": "string",
                "defaultValue": '_',
                "menu": "options2",
            },
          }
        },
],
menus: {
    options1: {
        acceptReporters: true,
        items: [{ text: "true", value: "true"}, {text: "false", value: "false"}, { text: "1", value: "1"}, {text: "0", value: "0"}]
    },
    options2: {
        acceptReporters: true,
        items: [{ text: "_", value: "_"}, { text: "true", value: "true"}, {text: "false", value: "false"}, { text: "1", value: "1"}, {text: "0", value: "0"}]
    }
}
};
    }
  tf({input1, input2, input3}) {
    var text1 = input1
    var text2 = input2
    var text3 = input3
    console.log("Before: " + text1);
    console.log("Before: " + text2);
    console.log("Before: " + text3);
    if (input1 == true) var text1 = "true";
    if (input1 == false) var text1 = "false";
    if (input2 == true) var text2 = "true";
    if (input2 == false) var text2 = "false";
    if (input3 == true) var text3 = "true";
    if (input3 == false) var text3 = "false";
    console.log("After: " + text1);
    console.log("After: " + text2);
    console.log("After: " + text3);
    if (text1 == text2 && text2 == text3) {
        return "true"
    } else if (text1 == text2 && text3 == "_") {
    return "true"
    } else 
        return "false"
};
}
Scratch.extensions.register(new BasicK());