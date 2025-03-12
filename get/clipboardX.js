(function (ext) {
  let copiedBool = false;
  let pastedBool = false;
  let lastPastedText = "";
  
  ext._shutdown = function() {};

  ext._getStatus = function() {
    if (!navigator.clipboard || !navigator.clipboard.writeText || !navigator.clipboard.readText) {
        return { status: 1, msg: "Clipboard not supported" };
    }
    return { status: 2, msg: "Ready" };
};

  ext.whenCopied = function() {
    if (copiedBool) {
      copiedBool = false;
      return true;
    }
    return false;
  };

  ext.whenPasted = function() {
    if (pastedBool) {
      pastedBool = false;
      return true;
    }
    return false;
  };

  ext.setClipboard = function(text) {
    navigator.clipboard.writeText(text);
  };

  ext.resetClipboard = function() {
    navigator.clipboard.writeText("");
  };

  ext.clipboard = function() {
    if (navigator.clipboard && navigator.clipboard.readText) {
            return navigator.clipboard.readText() ?? "";
    }
    return "";
  }


  ext.canClipboard = function() {
    return !!navigator.clipboard;
  };

  ext.getLastPastedText = function() {
    return lastPastedText;
  };

  var blocks = [
    ['h', 'when something is copied', 'whenCopied'],
    ['h', 'when something is pasted', 'whenPasted'],
    [' '],
    ['', 'copy to clipboard: %s', 'setClipboard', ''],
    ['', 'reset clipboard', 'resetClipboard', ''],
    [' '],
    ['r', 'clipboard', 'clipboard', ''],
    ['r', 'last pasted text', 'getLastPastedText', ''],
    ['b', 'clipboard?', 'canClipboard']
  ];

  var descriptor = {
    blocks: blocks,
  };

  ScratchExtensions.register('clipboard', descriptor, ext);
})({});