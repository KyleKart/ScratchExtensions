(function (Scratch) {
  // Based on PM blockShape implementation
  if (!Scratch?.BlockShape) {
      const _cbfsb = vm.runtime._convertBlockForScratchBlocks;
      vm.runtime._convertBlockForScratchBlocks = function (...args) {
          const blockInfo = args[0];
          const res = _cbfsb.apply(this, args);
          if (blockInfo?.blockShape) res.json.outputShape = blockInfo.blockShape;
          return res;
      };
  }
  Scratch.BlockShape = Scratch?.BlockShape ?? {
      HEXAGON: 1,
      ROUND: 2,
      SQUARE: 3,
  };
  // https://github.com/TurboWarp/scratch-vm/blob/develop/src/engine/runtime.js#L1589
  const _ciij = vm.runtime._constructInlineImageJson;
  vm.runtime._constructInlineImageJson = function (argInfo) {
      const res = _ciij.call(this, argInfo);
      res.width = argInfo?.width ?? 24;
      res.height = argInfo?.height ?? res.width;
      return res;
  };
  // Field type example https://github.com/Xeltalliv/extensions/blob/examples/examples/custom-field-types.js
  const _bcfi = vm.runtime._buildCustomFieldInfo;
  const _bcftfsb = vm.runtime._buildCustomFieldTypeForScratchBlocks;
  let fi = null;
  vm.runtime._buildCustomFieldInfo = function (fieldName, fieldInfo, extensionId, categoryInfo) {
      fi = fieldInfo;
      return _bcfi.call(this, fieldName, fieldInfo, extensionId, categoryInfo);
  };
  vm.runtime._buildCustomFieldTypeForScratchBlocks = function (fieldName, output, outputShape, categoryInfo) {
      let res = _bcftfsb.call(this, fieldName, output, outputShape, categoryInfo);
      if (fi) {
          if (fi.color1) res.json.colour = fi.color1;
          if (fi.color2) res.json.colourSecondary = fi.color2;
          if (fi.color3) res.json.colourTertiary = fi.color3;
          fi = null;
      }
      return res;
  };
  const ArgumentType_SQUARE = `SAOIFHAUISHFIAWO@$!@!#%#@!#!@VAWIAHDCAIWHDIASJCKASsquareShape`;
  const customFieldTypes = {},
      toRegisterOnBlocklyGot = [];
  let implementations = {},
      Blockly = null;
  implementations[ArgumentType_SQUARE] = null;
  customFieldTypes[ArgumentType_SQUARE] = {
      output: null,
      outputShape: 3,
      implementation: {
          fromJson: (args) => new implementations[ArgumentType_SQUARE](args['squareShape']),
      },
  };
  // Some patching based on https://github.com/AshimeeAlt/survs-gallery/blob/main/extensions/0znzw/MoreFields.js
  function onBlockly(_Blockly) {
      Blockly = _Blockly;
      // This fixes a bug where modifying size_.height in updateWidth causes weird issues when dragged,
      // See MoreFields.js at FieldInlineTextarea for reference of usage.
      // https://github.com/FurryR/ Made this patch.
      const _endBlockDrag = Blockly.BlockDragger.prototype.endBlockDrag;
      Blockly.BlockDragger.prototype.endBlockDrag = function (...a) {
          _endBlockDrag.call(this, ...a);
          for (const childBlock of this.draggingBlock_.childBlocks_) {
              const inputList = childBlock.inputList;
              if (inputList.length === 1 && inputList[0].fieldRow.length === 1 && !!inputList[0].fieldRow[0]?.inlineDblRender) childBlock.render();
          }
      };
      implementations[ArgumentType_SQUARE] = class FieldSquareShape extends Blockly.Field {
          // For future reference on field functions please refer to:
          // https://developers.google.com/blockly/reference/js/blockly.field_class
          // field based on https://github.com/LLK/scratch-blocks/blob/893c7e7ad5bfb416eaed75d9a1c93bdce84e36ab/core/field_angle.js
          constructor(opt_value, opt_validator) {
              super(opt_value, opt_validator);
              this.addArgType(ArgumentType_SQUARE);
          }
          init() {
            Blockly.Field.prototype.init.call(this);
            this.$fixColors();
        }
          $fixColors() {
              try {
                  this.sourceBlock_.colour_ = this.sourceBlock_.parentBlock_.colour_;
                  this.sourceBlock_.colourSecondary_ = this.sourceBlock_.parentBlock_.colourSecondary_;
                  this.sourceBlock_.colourTertiary_ = this.sourceBlock_.parentBlock_.colourTertiary_;
              } catch {}
          }
          render_() {
              this.$fixColors();
              Blockly.Field.prototype.render_.call(this);
          }
          setValue() {}
          showEditor_() {}
      };
      while (toRegisterOnBlocklyGot.length > 0) {
          const [name, impl] = toRegisterOnBlocklyGot.shift();
          Blockly.Field.register(name, impl);
      }
      // https://github.com/TurboWarp/addons/blob/tw/addons/custom-block-shape/update-all-blocks.js
      const eventsOriginallyEnabled = Blockly.Events.isEnabled(),
          workspace = Blockly.getMainWorkspace();
      Blockly.Events.disable();
      if (workspace) {
          if (vm.editingTarget) {
              vm.emitWorkspaceUpdate();
          }
          const flyout = workspace.getFlyout();
          if (flyout) {
              const flyoutWorkspace = flyout.getWorkspace();
              Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.workspaceToDom(flyoutWorkspace), flyoutWorkspace);
              workspace.getToolbox().refreshSelection();
              workspace.toolboxRefreshEnabled_ = true;
          }
      }
      if (eventsOriginallyEnabled) Blockly.Events.enable();
  }
  // https://github.com/LLK/scratch-vm/blob/f405e59d01a8f9c0e3e986fb5276667a8a3c7d40/test/unit/extension_conversion.js#L85-L124
  // https://github.com/LLK/scratch-vm/commit/ceaa3c7857b79459ccd1b14d548528e4511209e7
  vm.addListener('EXTENSION_FIELD_ADDED', (fieldInfo) => {
      if (Blockly) Blockly.Field.register(fieldInfo.name, fieldInfo.implementation);
      else toRegisterOnBlocklyGot.push([fieldInfo.name, fieldInfo.implementation]);
  });
  if (typeof Scratch?.gui === 'object') Scratch.gui.getBlockly().then((Blockly) => onBlockly(Blockly));

  function makeCommand(COMMAND, VALUE, ARRAY, BRANCH) {
      const result = [[COMMAND, VALUE]];
      let parsedArray, parsedBranch;

      try {
          parsedArray = JSON.parse(ARRAY);
      } catch (error) {
          parsedArray = [];
      }

      try {
          parsedBranch = JSON.parse(BRANCH);
      } catch (error) {
          parsedBranch = [];
      }

      if (Array.isArray(parsedArray)) {
          result.push(...parsedArray);
      } else {
          result.push(parsedArray);
      }

      if (Array.isArray(parsedBranch)) {
          result.push(...parsedBranch);
      } else {
          result.push(parsedBranch);
      }

      return JSON.stringify(result);
  }

  // to gen colors:
  /*
var colors = {};
Object.entries(ScratchBlocks.Colours).filter(cat => typeof cat[1] === 'object').map(cat => {
  cat[1].color1 = cat[1].primary;
  cat[1].color2 = cat[1].secondary;
  cat[1].color3 = cat[1].tertiary;
  cat[1].color4 = cat[1]?.quaternary ?? cat[1].color3;
  delete cat[1].primary;
  delete cat[1].secondary;
  delete cat[1].tertiary;
  delete cat[1].quaternary;
  return cat;
}).forEach(cat => colors[cat[0]] = cat[1]);
console.log(JSON.stringify(colors));
  */
  function _sbColorsAsScratch(cat) {
      cat = ScratchBlocks.Colours[cat];
      return {
          color1: cat.primary,
          color2: cat.secondary,
          color3: cat.tertiary,
          color4: cat.quaternary ?? cat.tertiary,
      };
  }
  const presetColors = {
      motion: {
          color1: '#4C97FF',
          color2: '#4280D7',
          color3: '#3373CC',
          color4: '#3373CC',
      },
      looks: {
          color1: '#9966FF',
          color2: '#855CD6',
          color3: '#774DCB',
          color4: '#774DCB',
      },
      sounds: {
          color1: '#CF63CF',
          color2: '#C94FC9',
          color3: '#BD42BD',
          color4: '#BD42BD',
      },
      control: {
          color1: '#FFAB19',
          color2: '#EC9C13',
          color3: '#CF8B17',
          color4: '#CF8B17',
      },
      event: {
          color1: '#FFBF00',
          color2: '#E6AC00',
          color3: '#CC9900',
          color4: '#CC9900',
      },
      sensing: {
          color1: '#5CB1D6',
          color2: '#47A8D1',
          color3: '#2E8EB8',
          color4: '#2E8EB8',
      },
      pen: {
          color1: '#0fBD8C',
          color2: '#0DA57A',
          color3: '#0B8E69',
          color4: '#0B8E69',
      },
      operators: {
          color1: '#59C059',
          color2: '#46B946',
          color3: '#389438',
          color4: '#389438',
      },
      data: {
          color1: '#FF8C1A',
          color2: '#FF8000',
          color3: '#DB6E00',
          color4: '#DB6E00',
      },
      data_lists: {
          color1: '#FF661A',
          color2: '#FF5500',
          color3: '#E64D00',
          color4: '#E64D00',
      },
      more: {
          color1: '#FF6680',
          color2: '#FF4D6A',
          color3: '#FF3355',
          color4: '#FF3355',
      },
  };
  function getColors(cat) {
      if (window?.ScratchBlocks) return _sbColorsAsScratch(cat);
      return presetColors[cat];
  }
  const iconUri = {
      LEFT: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMi41NTc2NyIgaGVpZ2h0PSIyMi4yNzQ1IiB2aWV3Qm94PSIwLDAsMzIuNTU3NjcsMjIuMjc0NSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyMy43MjExNywtMTY5Ljc0MDY5KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1vcGFjaXR5PSIwLjI1MDk4IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIzOS45NDgwMiwxNzUuOTczMzlsMTMuNTk5ODcsMi4yNjY2NWMwLjc5MzYzLDAuMTMyMjcgMS40ODA5NSwwLjkyMjAzIDEuNDgwOTUsMS43NTQ5MWMwLDAuODA4NTMgLTAuNjYzMDQsMS42MTg1OSAtMS40ODA5NSwxLjc1NDkxbC0xMy41OTk4NywyLjI2NjY1djUuMDM1OWMwLDEuNjQwNzggLTEuMDk4OTcsMi4yMTIyNyAtMi40NTQ2LDEuMjMxNjVsLTExLjQ4NjQ1LC04LjMwODg0Yy0xLjM3ODgzLC0wLjk5NzM4IC0xLjM3MTQ1LC0yLjU4NjA5IC0wLjAzNTM1LC0zLjU4NTkzbDExLjU1NzE2LC04LjY0ODZjMS4zNDM0OCwtMS4wMDUzNyAyLjQxOTI0LC0wLjQ2NDAzIDIuNDE5MjQsMS4xOTY4MXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTYuMjc4ODI2Mjc2NTI1NTkyOjEwLjI1OTMxNDQxMjAwNzI1Ny0tPg==',
      RIGHT: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMi41NTc2NyIgaGVpZ2h0PSIyMi4yOTkyNCIgdmlld0JveD0iMCwwLDMyLjU1NzY3LDIyLjI5OTI0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIzLjcyMTE3LC0xNjcuOTg0ODIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLW9wYWNpdHk9IjAuMjUwOTgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjQwLjA1MTk5LDE3MC45Mzc1YzAsLTEuNjYwODQgMS4wNzU3NiwtMi4yMDIxOCAyLjQxOTI0LC0xLjE5NjgxbDExLjU1NzE2LDguNjQ4NmMxLjMzNjEsMC45OTk4NCAxLjM0MzQ4LDIuNTg4NTUgLTAuMDM1MzUsMy41ODU5M2wtMTEuNDg2NDUsOC4zMDg4NGMtMS4zNTU2MywwLjk4MDYyIC0yLjQ1NDYsMC40MDkxMyAtMi40NTQ2LC0xLjIzMTY1di01LjAzNTlsLTEzLjU5OTg3LC0yLjI2NjY1Yy0wLjgxNzkxLC0wLjEzNjMyIC0xLjQ4MDk1LC0wLjk0NjM4IC0xLjQ4MDk1LC0xLjc1NDkxYzAsLTAuODMyODggMC42ODczMiwtMS42MjI2NCAxLjQ4MDk1LC0xLjc1NDkxbDEzLjU5OTg3LC0yLjI2NjY1eiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjE2LjI3ODgyNjI3NjUyNTU5MjoxMi4wMTUxODQ0MTIwMDcyNDQtLT4=',
      UP: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMi4yNzQ1IiBoZWlnaHQ9IjMyLjU1NzY3IiB2aWV3Qm94PSIwLDAsMjIuMjc0NSwzMi41NTc2NyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyNy45ODQ4MiwtMTYzLjcyMTE2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1vcGFjaXR5PSIwLjI1MDk4IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI0NC4wMjY2MiwxNzkuOTQ4MDJsLTIuMjY2NjUsMTMuNTk5ODdjLTAuMTMyMjcsMC43OTM2MyAtMC45MjIwMywxLjQ4MDk1IC0xLjc1NDkxLDEuNDgwOTVjLTAuODA4NTMsMCAtMS42MTg1OSwtMC42NjMwNCAtMS43NTQ5MSwtMS40ODA5NWwtMi4yNjY2NSwtMTMuNTk5ODdsLTUuMDM1OSwwYy0xLjY0MDc4LDAgLTIuMjEyMjcsLTEuMDk4OTcgLTEuMjMxNjUsLTIuNDU0Nmw4LjMwODg0LC0xMS40ODY0NWMwLjk5NzM4LC0xLjM3ODgzIDIuNTg2MDksLTEuMzcxNDUgMy41ODU5MywtMC4wMzUzNWw4LjY0ODYsMTEuNTU3MTZjMS4wMDUzNywxLjM0MzQ4IDAuNDY0MDMsMi40MTkyNCAtMS4xOTY4MSwyLjQxOTI0eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxMi4wMTUxNzk5NDQ0MzA1MTQ6MTYuMjc4ODM1NzM2OTA2ODE0LS0+',
      DOWN: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMi4yOTkyNCIgaGVpZ2h0PSIzMi41NTc2NyIgdmlld0JveD0iMCwwLDIyLjI5OTI0LDMyLjU1NzY3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI5LjcxNTk1LC0xNjMuNzIxMTYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLW9wYWNpdHk9IjAuMjUwOTgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjQ5LjA2MjUxLDE4MC4wNTE5OGMxLjY2MDg0LDAgMi4yMDIxOCwxLjA3NTc2IDEuMTk2ODEsMi40MTkyNGwtOC42NDg2LDExLjU1NzE2Yy0wLjk5OTg0LDEuMzM2MSAtMi41ODg1NSwxLjM0MzQ4IC0zLjU4NTkzLC0wLjAzNTM1bC04LjMwODg0LC0xMS40ODY0NWMtMC45ODA2MiwtMS4zNTU2MyAtMC40MDkxMywtMi40NTQ2IDEuMjMxNjUsLTIuNDU0Nmw1LjAzNTksMGwyLjI2NjY1LC0xMy41OTk4N2MwLjEzNjMyLC0wLjgxNzkxIDAuOTQ2MzgsLTEuNDgwOTUgMS43NTQ5MSwtMS40ODA5NWMwLjgzMjg4LDAgMS42MjI2NCwwLjY4NzMyIDEuNzU0OTEsMS40ODA5NWwyLjI2NjY1LDEzLjU5OTg3eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxMC4yODQwNDc2MDE0MjUwNzM6MTYuMjc4ODM1NzM2OTA2ODQyLS0+',
      TURN_LEFT: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMC42NTI0MSIgaGVpZ2h0PSIxOS41NDM2MiIgdmlld0JveD0iMCwwLDIwLjY1MjQxLDE5LjU0MzYyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI5LjQ2MjM1LC0xNzAuNjg2MzgpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLW9wYWNpdHk9IjAuMjUwOTgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjQ3LjU2LDE4NS42NWMtMS43MTMyLDIuMzU5MzYgLTQuNDM0NzEsMy43Nzc1MSAtNy4zNSwzLjgzYy0wLjcyMzQ5LDAuMDIyMDkgLTEuMzI3OTEsLTAuNTQ2NTEgLTEuMzUsLTEuMjdjLTAuMDIyMDksLTAuNzIzNDkgMC41NDY1MSwtMS4zMjc5MSAxLjI3LC0xLjM1YzIuMDMwNjksLTAuMTQwODIgMy44Nzk1NSwtMS4yMjA1NiA1LC0yLjkyYzEuMTAyMzksLTEuNjE5ODEgMS4zNTIwOCwtMy42NzMyIDAuNjcsLTUuNTFjLTAuMzUwODgsLTAuODQ5NTkgLTAuOTE1OTEsLTEuNTkzNzcgLTEuNjQsLTIuMTZjLTAuNzI1NTksLTAuNTQzNDEgLTEuNTgwNDEsLTAuODg4MSAtMi40OCwtMWMtMS43MTUwNywtMC4xOTEzIC0zLjQyNzI3LDAuMzgzMDkgLTQuNjgsMS41N2wxLjc0LDIuMTZjMC4xNjUzLDAuMTcxMDMgMC4yMTE3NCwwLjQyNDU5IDAuMTE3NzgsMC42NDMwOWMtMC4wOTM5NiwwLjIxODUxIC0wLjMwOTk0LDAuMzU5MjMgLTAuNTQ3NzgsMC4zNTY5MWgtNy42MWMtMC4xODg5LDAuMDA2MDMgLTAuMzY5NTksLTAuMDc3MyAtMC40ODc2NSwtMC4yMjQ4OGMtMC4xMTgwNiwtMC4xNDc1OCAtMC4xNTk2OSwtMC4zNDIxNiAtMC4xMTIzNSwtMC41MjUxMmwxLjcxLC03LjQyYzAuMDY1NjUsLTAuMjAwMjcgMC4yMzMxNCwtMC4zNTAzMSAwLjQzOTM5LC0wLjM5MzYyYzAuMjA2MjUsLTAuMDQzMzEgMC40MTk5NSwwLjAyNjY4IDAuNTYwNjEsMC4xODM2MmwxLjY3LDIuMWMyLjE2NDI3LC0xLjc3NDcgNC45ODkwNywtMi41MjkyIDcuNzUsLTIuMDdjMS41MTcyMSwwLjI2OTk1IDIuOTM3NSwwLjkzMTgzIDQuMTIsMS45MmMxLjE1OTI3LDAuOTk0ODggMi4wMzU0NCwyLjI3ODA5IDIuNTQsMy43MmMwLjk1MTYxLDIuODM2MzkgMC40NTQ4NCw1Ljk1ODk1IC0xLjMzLDguMzZ6Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTAuNTM3NjUyNjQxNzczMzc3OjkuMzEzNjE5ODU2NjY5OTAyLS0+',
      TURN_RIGHT: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMC4xNzc2NSIgaGVpZ2h0PSIxOS41NDQyNCIgdmlld0JveD0iMCwwLDIwLjE3NzY1LDE5LjU0NDI0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI5LjgwNTYyLC0xNzAuNjg2MzgpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLW9wYWNpdHk9IjAuMjUwOTgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjMwLjU1NTYyLDE3Ny4yOWMwLjUwNDU2LC0xLjQ0MTkxIDEuMzgwNzMsLTIuNzI1MTIgMi41NCwtMy43MmMxLjE4MjUsLTAuOTg4MTcgMi42MDI3OSwtMS42NTAwNSA0LjEyLC0xLjkyYzIuNzYwOTMsLTAuNDU5MiA1LjU4NTczLDAuMjk1MyA3Ljc1LDIuMDdsMS42NywtMi4xYzAuMTQwNjYsLTAuMTU2OTQgMC4zNTQzNiwtMC4yMjY5MyAwLjU2MDYxLC0wLjE4MzYyYzAuMjA2MjUsMC4wNDMzMSAwLjM3Mzc0LDAuMTkzMzUgMC40MzkzOSwwLjM5MzYybDEuNzEsNy40MmMwLjA0NzM0LDAuMTgyOTYgMC4wMDU3MSwwLjM3NzU0IC0wLjExMjM1LDAuNTI1MTJjLTAuMTE4MDYsMC4xNDc1OCAtMC4yOTg3NSwwLjIzMDkxIC0wLjQ4NzY1LDAuMjI0ODhoLTcuNjFjLTAuMjM3ODQsMC4wMDIzMiAtMC40NTM4MiwtMC4xMzg0IC0wLjU0Nzc4LC0wLjM1NjkxYy0wLjA5Mzk2LC0wLjIxODUgLTAuMDQ3NTIsLTAuNDcyMDYgMC4xMTc3OCwtMC42NDMwOWwxLjc0LC0yLjE2Yy0xLjI1MjczLC0xLjE4NjkxIC0yLjk2NDkzLC0xLjc2MTMgLTQuNjgsLTEuNTdjLTAuODk5NTksMC4xMTE5IC0xLjc1NDQxLDAuNDU2NTkgLTIuNDgsMWMtMC43MjQwOSwwLjU2NjIzIC0xLjI4OTEyLDEuMzEwNDEgLTEuNjQsMi4xNmMtMC42ODIwOCwxLjgzNjggLTAuNDMyMzksMy44OTAxOSAwLjY3LDUuNTFjMS4xMjA0NSwxLjY5OTQ0IDIuOTY5MzEsMi43NzkxOCA1LDIuOTJjMC43MjM0OSwwLjAyMjA5IDEuMjkyMDksMC42MjY1MSAxLjI3LDEuMzVjLTAuMDIyMDksMC43MjM0OSAtMC42MjY1MSwxLjI5MjA5IC0xLjM1LDEuMjdjLTIuOTE1MjksLTAuMDUyNDkgLTUuNjM2OCwtMS40NzA2NCAtNy4zNSwtMy44M2MtMS43ODQ4NCwtMi40MDEwNSAtMi4yODE2MSwtNS41MjM2MSAtMS4zMywtOC4zNnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTAuMTk0Mzc1NTMxMjEzMDY5OjkuMzEzNjE5ODU2NjY5ODc0LS0+',
      SAY: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyNi4xOTk5MyIgaGVpZ2h0PSIxNy4yMTY5NCIgdmlld0JveD0iMCwwLDI2LjE5OTkzLDE3LjIxNjk0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI2LjkwMDA0LC0xNzEuNDIzNzQpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLW9wYWNpdHk9IjAuMzAxOTYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjI3LjY1Mjg0LDE3OC40NzM2OGMtMC4xMDg0MywtNC43NzE3MyAyLjk1NTU4LC02LjI5OTk0IDUuMjYzMzksLTYuMjk5OTRjMi44MDgzNywwIDkuMDI1MzQsLTAuMTQ0OTYgMTMuODExNDUsMGMyLjMzNzA1LDAuMDcwNzggNS43MzIwOSwxLjY1NTQ5IDUuNjE5NTYsNi4yOTk5NGMtMC4xMDY1LDQuMzk1NDcgLTMuODk4OTgsNS43MzM2NSAtNS42NTkxMyw1LjczMzY1Yy0xLjYwMjI1LDAgLTQuMjgxNDMsMCAtNy4zMjEyNiwwYy0wLjgwMzcyLDAgLTMuMDU1MTEsMy43OTQxIC02LjcyNzY0LDMuNjgwODZjLTIuNjA0NzIsLTAuMDgwMzEgMS40ODA2NSwtMy42ODA4NiAwLjQzNTMyLC0zLjY4MDg2Yy0zLjA5OTc5LDAgLTUuMzQ2MjIsLTIuNDEyNjEgLTUuNDIxNjksLTUuNzMzNjV6Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTMuMDk5OTU4ODI0Njc4ODc5OjguNTc2MjU2MTA3MTQwODM2LS0+',
      REPEAT: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOS4wNjI5NCIgaGVpZ2h0PSIzMi41ODYzIiB2aWV3Qm94PSIwLDAsMjkuMDYyOTQsMzIuNTg2MyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyNS41MTcwNiwtMTYzLjc0MzcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLW9wYWNpdHk9IjAuMzAxOTYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjUzLjc1LDE4My4wOHYwLjI5Yy0wLjA3Mjc3LDEuNDk0NiAtMC40MTE0LDIuOTY0MjYgLTEsNC4zNGMtMC41Mjk1NSwxLjI3Nzg1IC0xLjI1NDkxLDIuNDY1NDIgLTIuMTUsMy41MmMtMC44MTg2MywwLjkxNzIxIC0xLjc1MzE0LDEuNzIzOTkgLTIuNzgsMi40Yy0wLjg4MzY1LDAuNTQ4OTUgLTEuODMwNTUsMC45ODg4MiAtMi44MiwxLjMxYy0wLjQwMDMzLDAuMTQ4MzIgLTAuODExNTYsMC4yNjUzMyAtMS4yMywwLjM1Yy0wLjM2NDc2LDAuMDkwODQgLTAuNzM1NzksMC4xNTQzNSAtMS4xMSwwLjE5Yy0wLjM0LDAgLTAuNjksMC4wOSAtMC45MiwwLjFoLTFjLTEuMTA0NTcsMC4wNTUyMyAtMi4wNDQ3NywtMC43OTU0MyAtMi4xLC0xLjljLTAuMDU1MjMsLTEuMTA0NTcgMC43OTU0MywtMi4wNDQ3NyAxLjksLTIuMWgwLjQ1bDAuNTQsLTAuMDVjMC4xNzg1MiwtMC4wMjcwNyAwLjM1NTQ1LC0wLjA2Mzc5IDAuNTMsLTAuMTFjMC4yMjU0MSwtMC4wMzMwOCAwLjQ0NjY2LC0wLjA5MDA3IDAuNjYsLTAuMTdjMC4yNzQxMSwtMC4wNzQ3MyAwLjU0MTY3LC0wLjE3MTcyIDAuOCwtMC4yOWMwLjYyNDExLC0wLjI2MjYzIDEuMjE0OSwtMC41OTgzMSAxLjc2LC0xYzAuNjM5NjEsLTAuNDk1NDQgMS4yMTcxMSwtMS4wNjYyMyAxLjcyLC0xLjdjMC41MTk4NCwtMC42ODY1MiAwLjkzMTI5LC0xLjQ0ODcxIDEuMjIsLTIuMjZjMC4zMTAxMSwtMC44Njg4NiAwLjQ1NTkyLC0xLjc4NzgyIDAuNDMsLTIuNzF2LTAuMjl2LTAuNDdjMC4wMTE3OCwtMC4xNDMwOSAwLjAxMTc4LC0wLjI4NjkxIDAsLTAuNDNsLTAuMDcsLTAuMjljLTAuMDMzMDcsLTAuMjEwNCAtMC4wODMyNCwtMC40MTc3NSAtMC4xNSwtMC42MmMtMC4wNTgyNSwtMC4yMjQ3NCAtMC4xMzE3NiwtMC40NDUyNSAtMC4yMiwtMC42NmMtMC42NTY0MywtMS43MDU1OCAtMS44OTY2NSwtMy4xMjI5NyAtMy41LC00Yy0wLjcxMzUxLC0wLjM5NDI5IC0xLjQ4NzI2LC0wLjY2Nzk4IC0yLjI5LC0wLjgxYy0wLjM2OTksLTAuMDY1NzkgLTAuNzQ0MzcsLTAuMTAyNTcgLTEuMTIsLTAuMTFoLTEuM2MtMS44NCwwIC0zLjM4LDAgLTQuNDcsMHY0LjA1YzAuMDAyMSwwLjQyNzU4IC0wLjI1NTI4LDAuODEzNzIgLTAuNjUwNzQsMC45NzYzYy0wLjM5NTQ3LDAuMTYyNTggLTAuODUwMDIsMC4wNjkxMiAtMS4xNDkyNiwtMC4yMzYzbC03LjEzLC03LjA5Yy0wLjIxMTg2LC0wLjE4OTcgLTAuMzMyOTQsLTAuNDYwNjIgLTAuMzMyOTQsLTAuNzQ1YzAsLTAuMjg0MzggMC4xMjEwOCwtMC41NTUzIDAuMzMyOTQsLTAuNzQ1bDcuMDgsLTcuMDljMC4yOTkyNCwtMC4zMDU0MiAwLjc1Mzc5LC0wLjM5ODg4IDEuMTQ5MjYsLTAuMjM2M2MwLjM5NTQ3LDAuMTYyNTggMC42NTI4NSwwLjU0ODczIDAuNjUwNzQsMC45NzYzdjRjMS4wOSwwIDIuNjQsMCA0LjQ4LDBoMC43MmwxLDAuMDZjMC42NzQzMSwwLjA1NzIxIDEuMzQzMDUsMC4xNjc1NSAyLDAuMzNjMS40MTgwMiwwLjMzMTk5IDIuNzcwMTgsMC44OTk5IDQsMS42OGMyLjY0MTE0LDEuNjU5MjYgNC42MTA1Myw0LjE5ODkzIDUuNTYsNy4xN2MwLjEyNzc3LDAuMzY5NTMgMC4yMzEzMiwwLjc0NyAwLjMxLDEuMTNjMC4wOTUxMywwLjQwMTk0IDAuMTY1MjYsMC44MDkzOSAwLjIxLDEuMjJsMC4wNywwLjYzYzAsMC4yMSAwLDAuMzMgMCwwLjQ5djAuODN6Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTQuNDgyOTM1NTM1MzQ5MToxNi4yNTYzMDEzNjk1MDk2ODYtLT4=',
      THINK: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyNC42NDU2MiIgaGVpZ2h0PSIxNy43NTk2MiIgdmlld0JveD0iMCwwLDI0LjY0NTYyLDE3Ljc1OTYyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI3LjY3NzE5LC0xNzEuMTIwMTkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLW9wYWNpdHk9IjAuMzAxOTYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjI5LjgyMjAzLDE3Ny4zNjQ0YzAsLTEuNDY1NTUgMS40NDkwOSwtMi43MTA5OCAzLjQ2NjI0LC0zLjE2MzNjMC42NjA0OCwtMS4zNTE2NCAyLjYwNTgsLTIuMzMwOTEgNC45MDI4LC0yLjMzMDkxYzEuODQ5MTgsMCAzLjQ3MDQ0LDAuNjM0NjYgNC4zNzY5MSwxLjU4NzMzYzAuMjc3OTYsLTAuMDMwNjEgMC41NjMxMywtMC4wNDY1MiAwLjg1Mzc0LC0wLjA0NjUyYzEuMjU2MiwwIDIuNDEwNjYsMC4yOTcyNCAzLjMyMDYsMC43OTQyOWMwLjE2ODkzLC0wLjAxNTc3IDAuMzQwODYsLTAuMDIzODggMC41MTUyMSwtMC4wMjM4OGMyLjM4MzI3LDAgNC4zMTUyOSwxLjUxNTg0IDQuMzE1MjksMy4zODU3M2MwLDEuMTAzMDkgLTAuNjcyMzYsMi4wODI5NiAtMS43MTMwNywyLjcwMTEyYzAuMzcwMDIsMC4zNTUxNyAwLjU3OTc3LDAuNzYwNzcgMC41Nzk3NywxLjE5MTQ2YzAsMS4zOTk2MiAtMi4yMTQ5OSwyLjUzNDIzIC00Ljk0NzMyLDIuNTM0MjNjLTEuMDExMjMsMCAtMS45NTE2LC0wLjE1NTQxIC0yLjczNTA0LC0wLjQyMjE1Yy0wLjkzNzc1LDAuNTY1NTIgLTIuMTcwMTEsMC45MDg3MiAtMy41MTk5NCwwLjkwODcyYy0wLjM3MzYsMCAtMC43MzgyMSwtMC4wMjYyOSAtMS4wOTAwNiwtMC4wNzYzMWMwLjAwMDIyLDAuMDA3NCAwLjAwMDM0LDAuMDE0ODIgMC4wMDAzNCwwLjAyMjI1YzAsMC43MzkgLTEuMTEyMzcsMS4zMzgwNyAtMi40ODQ1NiwxLjMzODA3Yy0xLjM3MjE4LDAgLTIuNDg0NTYsLTAuNTk5MDggLTIuNDg0NTYsLTEuMzM4MDdjMCwtMC4zMDA5OCAwLjE4NDUyLC0wLjU3ODc1IDAuNDk1OTYsLTAuODAyMjljLTIuMTUwNTcsLTAuMDc4NTEgLTMuODUyMjksLTEuMDk5MjUgLTMuODUyMjksLTIuMzQ2OTFjMCwtMC42NzA2NSAwLjQ5MTY4LC0xLjI3NTczIDEuMjgwNDYsLTEuNzA0MTVjLTAuNzk3MDYsLTAuNTg5MiAtMS4yODA0NiwtMS4zNjIyMyAtMS4yODA0NiwtMi4yMDg3ek0yMzMuMzk2MzEsMTg2LjU5NTc1YzAsMC40ODE0NyAtMC42MTQ3MywwLjg3MTc3IC0xLjM3MzA1LDAuODcxNzdjLTAuNzU4MzEsMCAtMS4zNzMwNSwtMC4zOTAzMSAtMS4zNzMwNSwtMC44NzE3N2MwLC0wLjQ4MTQ3IDAuNjE0NzMsLTAuODcxNzcgMS4zNzMwNSwtMC44NzE3N2MwLjc1ODMxLDAgMS4zNzMwNSwwLjM5MDMxIDEuMzczMDUsMC44NzE3N3pNMjMwLjEyNzE1LDE4Ny40NjA3N2MwLDAuMzY5NSAtMC4zODA1NSwwLjY2OTA0IC0wLjg0OTk4LDAuNjY5MDRjLTAuNDY5NDMsMCAtMC44NDk5OCwtMC4yOTk1NCAtMC44NDk5OCwtMC42NjkwNGMwLC0wLjM2OTUgMC4zODA1NSwtMC42NjkwNCAwLjg0OTk4LC0wLjY2OTA0YzAuNDY5NDMsMCAwLjg0OTk4LDAuMjk5NTQgMC44NDk5OCwwLjY2OTA0eiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjEyLjMyMjgxMTY2MDc1MTkxOjguODc5ODA3NjkyMzA3NjgtLT4=',
      SHOW: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMy42MTIyNyIgaGVpZ2h0PSIxNi41IiB2aWV3Qm94PSIwLDAsMjMuNjEyMjcsMTYuNSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyOC4xOTM4NiwtMTcxLjc1KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1vcGFjaXR5PSIwLjMwMTk2IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI1MSwxODBjLTEuNzMsNC4zOSAtNiw3LjUgLTExLDcuNWMtNSwwIC05LjI3LC0zLjExIC0xMSwtNy41YzEuNzMsLTQuMzkgNiwtNy41IDExLC03LjVjNSwwIDkuMjcsMy4xMSAxMSw3LjV6TTI0NSwxODBjMCwtMi43NiAtMi4yNCwtNSAtNSwtNWMtMi43NiwwIC01LDIuMjQgLTUsNWMwLDIuNzYgMi4yNCw1IDUsNWMyLjc2LDAgNSwtMi4yNCA1LC01ek0yNDMsMTgwYzAsMS42NiAtMS4zNCwzIC0zLDNjLTEuNjYsMCAtMywtMS4zNCAtMywtM2MwLC0xLjY2IDEuMzQsLTMgMywtM2MxLjY2LDAgMywxLjM0IDMsM3oiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxMS44MDYxMzU1ODU2OTk1OTM6OC4yNS0tPg==',
      HIDE: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMy42MDIwMyIgaGVpZ2h0PSIyMS4xMjA0MSIgdmlld0JveD0iMCwwLDIzLjYwMjAzLDIxLjEyMDQxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI4LjE5Mzg4LC0xNjkuOTM5MzQpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLW9wYWNpdHk9IjAuMzAxOTYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjM4LjE3LDE3NS4zNmwtMi4xNiwtMi4xNmMxLjI0LC0wLjQ1IDIuNTgsLTAuNyAzLjk4LC0wLjdjNSwwIDkuMjcsMy4xMSAxMSw3LjVjLTAuNzMsMS44NiAtMS45MiwzLjQ5IC0zLjQzLDQuNzVsLTIuOTIsLTIuOTJjMC4yMywtMC41NyAwLjM2LC0xLjE4IDAuMzYsLTEuODNjMCwtMi43NiAtMi4yNCwtNSAtNSwtNWMtMC42NSwwIC0xLjI2LDAuMTMgLTEuODMsMC4zNnpNMjMxLjI3LDE3MWwxNy43MywxNy43M2wtMS4yNywxLjI3bC0yLjkzLC0yLjkybC0wLjQyLC0wLjQyYy0xLjM1LDAuNTQgLTIuODMsMC44NCAtNC4zOCwwLjg0Yy01LDAgLTkuMjcsLTMuMTEgLTExLC03LjVjMC43OCwtMS45OCAyLjA4LC0zLjcgMy43NCwtNC45OWwtMC40NiwtMC40NmwtMi4yOCwtMi4yOHpNMjM1LDE4MGMwLDIuNzYgMi4yNCw1IDUsNWMwLjc5LDAgMS41MywtMC4yIDIuMiwtMC41M2wtMS41NSwtMS41NWMtMC4yMSwwLjA1IC0wLjQzLDAuMDggLTAuNjUsMC4wOGMtMS42NiwwIC0zLC0xLjM0IC0zLC0zYzAsLTAuMjIgMC4wMywtMC40NCAwLjA4LC0wLjY1bC0xLjU1LC0xLjU1Yy0wLjMzLDAuNjcgLTAuNTMsMS40MSAtMC41MywyLjJ6TTI0MC4wMSwxNzcuMDFjMS42NiwwIDMsMS4zNCAzLDNsLTAuMDIsMC4xNmwtMy4xNSwtMy4xNXoiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxMS44MDYxMTY2MDQzMTk3MjY6MTAuMDYwNjYwMTcxNzc5ODMtLT4=',
      COSTUME: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNi4wMjc5NiIgaGVpZ2h0PSIxNi4xNDU0OSIgdmlld0JveD0iMCwwLDE2LjAyNzk2LDE2LjE0NTQ5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI5LjA0MTgsLTE3MS44ODYxMSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9IiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMzAxOTYiIHN0cm9rZT0iIzAwMDAwMCIvPjxwYXRoIGQ9Ik0yNDQuMzI0NjIsMTgwLjgyNDQ0YzAuMTY0NjksMS40Mzk4MSAtMC4xNjM3NywyLjU4NzUzIC0wLjMwNzQ2LDIuODQwODdjLTAuMTYzMywwLjI4Nzg2IC0wLjk5MDUxLDEuMjE1MzkgLTIuMDkyMDUsMi4wMDljLTEuNjczNTQsMS4yMDU1OCAtNC4xODM2MywxLjYwNzI5IC01LjAyMDYzLDEuNjA3MjljLTAuODM3LDAgLTMuMzQ3MDksLTAuNDAyMTggLTUuMDIwNjMsLTEuNjA3MjljLTEuMTAxNTQsLTAuNzkzNiAtMS45Mjg3NSwtMS43MjExNCAtMi4wOTIwNSwtMi4wMDljLTAuMTQzNywtMC4yNTMzNCAtMC40NzIxNSwtMS40MDEwNyAtMC4zMDcsLTIuODQwODdjMC4xNTAyMiwtMS4zMTMzNyAwLjMwNywtMi41MzcxNCAwLjcyNTQ5LC0zLjM0MDU2YzAsMCAtMS42MDcyOSwtNC4xMTEzMiAtMC43NzAyOSwtNS41OTc3N2MwLjI4MTgsLTAuNTAwNjEgMy43MzI0NiwwLjkzMjE4IDUuMDAyOTEsMi41MzkwMmMwLDAgMS4yMDY1MSwtMC40MDEyNSAyLjQ2MTU2LC0wLjQwMTI1YzEuMjU1MDUsMCAyLjQ2MTU2LDAuNDAxMjUgMi40NjE1NiwwLjQwMTI1YzEuMjcwNDQsLTEuNjA2ODIgNC43MjExMSwtMy4wMzk2MyA1LjAwMjkxLC0yLjUzOTAyYzAuODM3LDEuNDg2NDYgLTAuNzcwMjksNS41OTc3NyAtMC43NzAyOSw1LjU5Nzc3YzAuNDE4NSwwLjgwMzQyIDAuNTc0OCwyLjAyNzY3IDAuNzI1OTYsMy4zNDA1NnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjMwMTk2IiBzdHJva2U9IiMwMDAwMDAiLz48cGF0aCBkPSJNMjQwLjY4NDcyLDE4MC42NTM3OWMtMC4wMDI2NCwwLjMwNTIxIC0wLjEyNTI0LDAuNTk3MTMgLTAuMzQxMzMsMC44MTI2OWwtMy4xODU3NiwzLjIwMjAxYy0wLjQ1MzQzLDAuNDM3NjEgLTEuMTcxOTUsMC40Mzc2MSAtMS42MjUzOSwwYy0wLjQ1NTExLC0wLjQ1NTExIC0wLjQ1NTExLC03LjU2NjE4IDAsLTguMDIxMjljMC40NTM0MywtMC40Mzc2MSAxLjE3MTk1LC0wLjQzNzYxIDEuNjI1MzksMGwzLjE4NTc2LDMuMTg1NzZjMC4yMTgwNiwwLjIxNzU2IDAuMzQwODMsMC41MTI3OSAwLjM0MTMzLDAuODIwODJ6IiBmaWxsPSIjY2NjY2NjIiBzdHJva2Utb3BhY2l0eT0iMC4zMDE5NiIgc3Ryb2tlPSIjMDAwMDAwIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTAuOTU4MTk4OTk0ODczNTU1OjguMTEzODkxMzM0MzIyMzE4LS0+',
      BLANK: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIHZpZXdCb3g9Ii0xIC0xIDIgMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPCEtLSBFeHBvcnRlZCBieSBTY3JhdGNoIC0gaHR0cDovL3NjcmF0Y2gubWl0LmVkdS8gLS0+Cjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjowOjAtLT4=',
      HOP: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMi45NTA0NCIgaGVpZ2h0PSIzMy4zMzA2MSIgdmlld0JveD0iMCwwLDMyLjk1MDQ0LDMzLjMzMDYxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIzLjMwNDUzLC0xNjMuMTAwODMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLW9wYWNpdHk9IjAuMzAxOTYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjM2Ljk4ODY3LDE2My44NTA4M2gwLjgzYzAuMTYsMCAwLjI4LDAgMC40OSwwbDAuNjMsMC4wN2MwLjQxMDYxLDAuMDQ0NzQgMC44MTgwNiwwLjExNDg3IDEuMjIsMC4yMWMwLjM4MywwLjA3ODY4IDAuNzYwNDcsMC4xODIyMyAxLjEzLDAuMzFjMi45NzEwNywwLjk0OTQ3IDUuNTEwNzQsMi45MTg4NiA3LjE3LDUuNTZjMC43ODAxLDEuMjI5ODIgMS4zNDgwMSwyLjU4MTk4IDEuNjgsNGMwLjE2MjQ1LDAuNjU2OTUgMC4yNzI3OSwxLjMyNTY5IDAuMzMsMmwwLjA2LDF2MC43MmMwLDEuODQgMCwzLjM5IDAsNC40OGg0YzAuNDI3NTcsLTAuMDAyMTEgMC44MTM3MiwwLjI1NTI3IDAuOTc2MywwLjY1MDc0YzAuMTYyNTgsMC4zOTU0NyAwLjA2OTEyLDAuODUwMDIgLTAuMjM2MywxLjE0OTI2bC03LjA5LDcuMDhjLTAuMTg5NywwLjIxMTg2IC0wLjQ2MDYyLDAuMzMyOTQgLTAuNzQ1LDAuMzMyOTRjLTAuMjg0MzgsMCAtMC41NTUzLC0wLjEyMTA4IC0wLjc0NSwtMC4zMzI5NGwtNy4wOSwtNy4xM2MtMC4zMDU0MiwtMC4yOTkyNCAtMC4zOTg4OCwtMC43NTM3OSAtMC4yMzYzLC0xLjE0OTI2YzAuMTYyNTgsLTAuMzk1NDYgMC41NDg3MiwtMC42NTI4NCAwLjk3NjMsLTAuNjUwNzRoNC4wNWMwLC0xLjA5IDAsLTIuNjMgMCwtNC40N3YtMS4zYy0wLjAwNzQzLC0wLjM3NTYzIC0wLjA0NDIxLC0wLjc1MDEgLTAuMTEsLTEuMTJjLTAuMTQyMDIsLTAuODAyNzQgLTAuNDE1NzEsLTEuNTc2NDkgLTAuODEsLTIuMjljLTAuODc3MDMsLTEuNjAzMzUgLTIuMjk0NDIsLTIuODQzNTcgLTQsLTMuNWMtMC4yMTQ3NSwtMC4wODgyNCAtMC40MzUyNiwtMC4xNjE3NSAtMC42NiwtMC4yMmMtMC4yMDIyNSwtMC4wNjY3NiAtMC40MDk2LC0wLjExNjkzIC0wLjYyLC0wLjE1bC0wLjI5LC0wLjA3Yy0wLjE0MzA5LC0wLjAxMTc4IC0wLjI4NjkxLC0wLjAxMTc4IC0wLjQzLDBoLTAuNDdoLTAuMjljLTAuOTIyMTgsLTAuMDI1OTIgLTEuODQxMTQsMC4xMTk4OSAtMi43MSwwLjQzYy0wLjgxMTI5LDAuMjg4NzEgLTEuNTczNDgsMC43MDAxNiAtMi4yNiwxLjIyYy0wLjYzMzc3LDAuNTAyODkgLTEuMjA0NTYsMS4wODAzOSAtMS43LDEuNzJjLTAuNDAxNjksMC41NDUxIC0wLjczNzM3LDEuMTM1ODkgLTEsMS43NmMtMC4xMTgyOCwwLjI1ODMzIC0wLjIxNTI3LDAuNTI1ODkgLTAuMjksMC44Yy0wLjA3OTkzLDAuMjEzMzQgLTAuMTM2OTIsMC40MzQ1OSAtMC4xNywwLjY2Yy0wLjA0NjIxLDAuMTc0NTUgLTAuMDgyOTMsMC4zNTE0OCAtMC4xMSwwLjUzbC0wLjA1LDAuNTR2MC40NWMtMC4wNTUyMywxLjEwNDU3IC0wLjk5NTQzLDEuOTU1MjMgLTIuMSwxLjljLTEuMTA0NTcsLTAuMDU1MjMgLTEuOTU1MjMsLTAuOTk1NDMgLTEuOSwtMi4xdi0xYzAuMDEsLTAuMjMgMC4xLC0wLjU4IDAuMSwtMC45MmMwLjAzNTY1LC0wLjM3NDIxIDAuMDk5MTYsLTAuNzQ1MjQgMC4xOSwtMS4xMWMwLjA4NDY3LC0wLjQxODQ0IDAuMjAxNjgsLTAuODI5NjcgMC4zNSwtMS4yM2MwLjMyMTE4LC0wLjk4OTQ1IDAuNzYxMDUsLTEuOTM2MzUgMS4zMSwtMi44MmMwLjY3NjAxLC0xLjAyNjg2IDEuNDgyNzksLTEuOTYxMzcgMi40LC0yLjc4YzEuMDU0NTgsLTAuODk1MDkgMi4yNDIxNSwtMS42MjA0NSAzLjUyLC0yLjE1YzEuMzc1NzQsLTAuNTg4NiAyLjg0NTQsLTAuOTI3MjMgNC4zNCwtMWgwLjI5eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iLz48cGF0aCBkPSJNMjI1LjE1OTgyLDE4NC41ODc1NmMtMC42MTA0MywwIC0xLjEwNTI5LC0wLjY0MzMyIC0xLjEwNTI5LC0xLjQzNjg5di0wLjQ2NDQzYzAsLTAuNzkzNTggMC40OTQ4NiwtMS40MzY4OSAxLjEwNTI5LC0xLjQzNjg5aDIuNjAwOThjMC42MTA0MywwIDEuMTA1MjksMC42NDMzMiAxLjEwNTI5LDEuNDM2ODl2MC40NjQ0M2MwLDAuNzkzNTggLTAuNDk0ODUsMS40MzY4OSAtMS4xMDUyOSwxLjQzNjg5eiIvPjxwYXRoIGQ9Ik0yMjUuMTU5ODIsMTkwLjE3OTE1Yy0wLjYxMDQzLDAgLTEuMTA1MjksLTAuNjQzMzEgLTEuMTA1MjksLTEuNDM2ODl2LTAuNDY0NDNjMCwtMC43OTM1OCAwLjQ5NDg2LC0xLjQzNjg5IDEuMTA1MjksLTEuNDM2ODloMi42MDA5OGMwLjYxMDQzLDAgMS4xMDUyOSwwLjY0MzMyIDEuMTA1MjksMS40MzY4OXYwLjQ2NDQzYzAsMC43OTM1OCAtMC40OTQ4NSwxLjQzNjg5IC0xLjEwNTI5LDEuNDM2ODl6Ii8+PHBhdGggZD0iTTIyNS4xNTk4MiwxOTUuNjgxNDRjLTAuNjEwNDMsMCAtMS4xMDUyOSwtMC42NDMzMiAtMS4xMDUyOSwtMS40MzY4OXYtMC40NjQ0M2MwLC0wLjc5MzU4IDAuNDk0ODYsLTEuNDM2OSAxLjEwNTI5LC0xLjQzNjloMi42MDA5OGMwLjYxMDQzLDAgMS4xMDUyOSwwLjY0MzMyIDEuMTA1MjksMS40MzY5djAuNDY0NDNjMCwwLjc5MzU4IC0wLjQ5NDg1LDEuNDM2ODkgLTEuMTA1MjksMS40MzY4OXoiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxNi42OTU0NzoxNi44OTkxNjUwMDAwMDAwMS0tPg==',
    };

  function Block(category) {
      const colors = getColors(category);
      for (const color of Object.keys(colors)) Object.defineProperty(this, color, { value: colors[color] });
  }
  console.log(new Block('motion'));

  class InlineJr {
      getInfo() {
          return {
              id: 'ebscratchjr',
              name: 'Inline Coding',
              customFieldTypes,
              blocks: [
                  {
                      opcode: 'jrBlock',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Run code [input]',
                      ...getColors('event'),
                      arguments: {
                          input: {type: ArgumentType_SQUARE},
                      },
                  },
                  {
                      blockType: 'label',
                      text: 'Motion',
                  },
                  {
                      opcode: 'moveRight',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[value] [end]',
                      ...getColors('motion'),
                      arguments: {
                          value: {
                              type: Scratch.ArgumentType.NUMBER,
                              defaultValue: '1',
                          },
                          end: {type: ArgumentType_SQUARE},
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      blockIconURI: iconUri.RIGHT,
                  },
                  {
                      opcode: 'moveLeft',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[value] [end]',
                      ...getColors('motion'),
                      arguments: {
                          value: {
                              type: Scratch.ArgumentType.NUMBER,
                              defaultValue: '1',
                          },
                          end: {type: ArgumentType_SQUARE},
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      blockIconURI: iconUri.LEFT,
                  },
                  {
                      opcode: 'moveUp',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[value] [end]',
                      ...getColors('motion'),
                      arguments: {
                          value: {
                              type: Scratch.ArgumentType.NUMBER,
                              defaultValue: '1',
                          },
                          end: {type: ArgumentType_SQUARE},
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      blockIconURI: iconUri.UP,
                  },
                  {
                      opcode: 'moveDown',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[value] [end]',
                      ...getColors('motion'),
                      arguments: {
                          value: {
                              type: Scratch.ArgumentType.NUMBER,
                              defaultValue: '1',
                          },
                          end: {type: ArgumentType_SQUARE},
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      blockIconURI: iconUri.DOWN,
                  },
                  {
                      opcode: 'rotateRight',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[value] [end]',
                      ...getColors('motion'),
                      arguments: {
                          value: {
                              type: Scratch.ArgumentType.NUMBER,
                              defaultValue: '1',
                          },
                          end: {type: ArgumentType_SQUARE},
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      blockIconURI: iconUri.TURN_RIGHT,
                  },
                  {
                      opcode: 'rotateLeft',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[value] [end]',
                      ...getColors('motion'),
                      arguments: {
                          value: {
                              type: Scratch.ArgumentType.NUMBER,
                              defaultValue: '1',
                          },
                          end: {type: ArgumentType_SQUARE},
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      blockIconURI: iconUri.TURN_LEFT,
                  },
                  {
                      blockType: 'label',
                      text: 'Looks',
                  },
                  {
                      opcode: 'say',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[value] [end]',
                      ...getColors('looks'),
                      arguments: {
                          value: {
                              type: Scratch.ArgumentType.STRING,
                              defaultValue: 'hi',
                          },
                          end: {type: ArgumentType_SQUARE},
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      blockIconURI: iconUri.SAY,
                  },
                  {
                      opcode: 'think',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[value] [end]',
                      ...getColors('looks'),
                      arguments: {
                          value: {
                              type: Scratch.ArgumentType.STRING,
                              defaultValue: 'hmm',
                          },
                          end: {type: ArgumentType_SQUARE},
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      blockIconURI: iconUri.THINK,
                  },
                  {
                      opcode: 'show',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[end]',
                      ...getColors('looks'),
                      arguments: {
                          end: {type: ArgumentType_SQUARE},
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      blockIconURI: iconUri.SHOW,
                  },
                  {
                      opcode: 'hide',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[end]',
                      ...getColors('looks'),
                      arguments: {
                          end: {type: ArgumentType_SQUARE},
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      blockIconURI: iconUri.HIDE,
                  },
                  {
                      opcode: 'costumeNext',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[end]',
                      ...getColors('looks'),
                      arguments: {
                          end: {type: ArgumentType_SQUARE},
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      blockIconURI: iconUri.COSTUME,
                  },
                  {
                      blockType: 'label',
                      text: 'Experimental',
                  },
                  {
                      opcode: 'repeat',
                      blockType: Scratch.BlockType.REPORTER,
                      text: '[value] [branch] [icon] [end]',
                      ...getColors('control'),
                      arguments: {
                          value: {
                              type: Scratch.ArgumentType.NUMBER,
                              defaultValue: '4',
                          },
                          branch: {},
                          end: {type: ArgumentType_SQUARE},
                          icon: {
                              type: Scratch.ArgumentType.IMAGE,
                              dataURI: iconUri.REPEAT,
                              width: '40',
                          },
                      },
                      blockShape: Scratch.BlockShape.SQUARE,
                      extensions: ['scratch_extension'],
                  },
                  {
                    opcode: 'hop',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[end]',
                    ...getColors('motion'),
                    arguments: {
                        end: {type: ArgumentType_SQUARE},
                    },
                    blockShape: Scratch.BlockShape.SQUARE,
                    blockIconURI: iconUri.HOP,
                },
              ],
          };
      }

      jrBlock(args, util) {
          const inputArray = JSON.parse(args.input);
          const target = util.target;

          inputArray.forEach((item) => {
              switch (item[0]) {
                  case 'moveRight':
                      util.target.setXY(util.target.x + item[1] * 15, util.target.y);
                      break;
                  case 'moveLeft':
                      util.target.setXY(util.target.x - item[1] * 15, util.target.y);
                      break;
                  case 'moveUp':
                      util.target.setXY(util.target.x, util.target.y + item[1] * 20);
                      break;
                  case 'moveDown':
                      util.target.setXY(util.target.x, util.target.y - item[1] * 20);
                      break;
                  case 'rotateRight':
                      util.target.setDirection(util.target.direction + item[1] * 30);
                      break;
                  case 'rotateLeft':
                      util.target.setDirection(util.target.direction - item[1] * 30);
                      break;
                  case 'say':
                      vm.runtime.ext_scratch3_looks.say({ MESSAGE: item[1] }, { target });
                      break;
                  case 'think':
                      vm.runtime.ext_scratch3_looks.think({ MESSAGE: item[1] }, { target });
                      break;
                  case 'show':
                      util.target.setVisible(true);
                      break;
                  case 'hide':
                      util.target.setVisible(false);
                      break;
                  case 'costumeNext':
                      vm.runtime.ext_scratch3_looks.nextCostume({}, { target });
                      break;
                  case 'repeat':
                      // repeating code here
                      break;
                  default:
                      break;
              }
          });
      }

      moveRight(args) {
          return makeCommand('moveRight', args.value, args.end);
      }

      moveLeft(args) {
          return makeCommand('moveLeft', args.value, args.end);
      }

      moveDown(args) {
          return makeCommand('moveDown', args.value, args.end);
      }

      moveUp(args) {
          return makeCommand('moveUp', args.value, args.end);
      }
      rotateRight(args) {
          return makeCommand('rotateRight', args.value, args.end);
      }

      rotateLeft(args) {
          return makeCommand('rotateLeft', args.value, args.end);
      }

      say(args) {
          return makeCommand('say', args.value, args.end);
      }

      think(args) {
          return makeCommand('think', args.value, args.end);
      }

      show(args) {
          return makeCommand('show', 'show', args.end);
      }

      hide(args) {
          return makeCommand('hide', 'hide', args.end);
      }

      repeat(args) {
          return makeCommand('repeat', args.value, args.end, args.branch);
      }

      costumeNext(args) {
          return makeCommand('costumeNext', 'costumeNext', args.end);
      }
  }

  Scratch.extensions.register(new InlineJr());
})(Scratch);