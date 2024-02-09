(function (Scratch) {
    'use strict';
  
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('The Legacy Blocks extension needs to be run unsandboxed!');
  }
  const makeLabel = (text) => ({
      blockType: 'label',
      text: text
    });
      // Defining all our CSS styles
const myStyles = `
display: flex;
flex-direction: row;
align-items: center;
gap: 0rem;
`;
const element = document.querySelector('.menu-bar_file-group_1_CHX');

element.style.cssText = myStyles;

var items = [...element.children];

const newOrder = [1,2,3,4,5,0]

items.sort((a, b)=>newOrder.indexOf(items.indexOf(a)) - newOrder.indexOf(items.indexOf(b)));

items.forEach(it=>element.appendChild(it));

const element2 = document.querySelectorAll('.menu-bar_menu-bar-item_oLDa-')[3];
element2.remove();

  class TitleBar {
      getInfo() {
        return {
          id: 'titlebar',
          name: 'TitleBar',
        };
      }
    }
  
  })(window.Scratch);