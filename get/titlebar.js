(function (Scratch) {
    'use strict';

  const myStyles = `
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0rem;
  `;

  const element = [...document.querySelectorAll('[class*="menu-bar_file-group"]')][0];
  if (!element) return;

  element.style.cssText = myStyles;

  var items = [...element.children];
  const newOrder = [1,2,3,4,5,0];

  items.sort((a, b) => newOrder.indexOf(items.indexOf(a)) - newOrder.indexOf(items.indexOf(b)));
  items.forEach(it => element.appendChild(it));

  const element2 = [...document.querySelectorAll('[class*="menu-bar_menu-bar-item"]')][3];
  if (element2) element2.remove();

  class TitleBar {
      getInfo() {
        return {
          id: 'titlebar',
          name: 'Menu-bar Changer',
          color1: '#ff4c4c',
          blocks: [
            {
              opcode: 'title',
              blockType: Scratch.BlockType.COMMAND,
              text: 'Keep to save menu-bar changer.',
            },
          ],
        };
        
      }
    }
  
    Scratch.extensions.register(new TitleBar());
  })(Scratch);