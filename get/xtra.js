(function (Scratch) {
    'use strict';

    const vm = Scratch.vm;
    const runtime = vm.runtime;
    if (!vm.extensionManager.isExtensionLoaded("music")) {
        runtime.extensionManager.loadExtensionIdSync("music");
      }

    class xtraBlocks {
      getInfo() {
        return {
          id: 'ebxtrablocks',
          name: 'Extra Blocks',
          blocks: [
            {
              blockType: Scratch.BlockType.XML,
              xml: '<block type="procedures_definition"><statement name="custom_block"><shadow type="procedures_prototype"><mutation proccode="play note %s with instrument %s for %s beats" argumentids="[&quot;7W48r_x2jwpMVn@1W+a!&quot;,&quot;!I[a?Pn7Y5|^3N.QlfRw&quot;,&quot;t|A9^Pq6AbWhe}s-8|di&quot;]" argumentnames="[&quot;NOTE&quot;,&quot;INSTRUMENT&quot;,&quot;NUM&quot;]" argumentdefaults="[&quot;&quot;,&quot;&quot;,&quot;&quot;]" warp="false"></mutation><value name="7W48r_x2jwpMVn@1W+a!"><shadow type="argument_reporter_string_number"><field name="VALUE">NOTE</field></shadow></value><value name="!I[a?Pn7Y5|^3N.QlfRw"><shadow type="argument_reporter_string_number"><field name="VALUE">INSTRUMENT</field></shadow></value><value name="t|A9^Pq6AbWhe}s-8|di"><shadow type="argument_reporter_string_number"><field name="VALUE">NUM</field></shadow></value></shadow></statement><next><block type="music_setInstrument"><value name="INSTRUMENT"><shadow type="music_menu_INSTRUMENT" x="378" y="581"><field name="INSTRUMENT">1</field></shadow><block type="argument_reporter_string_number"><field name="VALUE">INSTRUMENT</field></block></value><next><block type="music_playNoteForBeats"><value name="NOTE"><shadow type="note" x="325" y="637"><field name="NOTE">60</field></shadow><block type="argument_reporter_string_number"><field name="VALUE">NOTE</field></block></value><value name="BEATS"><shadow type="math_number"><field name="NUM">0.25</field></shadow><block type="argument_reporter_string_number"><field name="VALUE">NUM</field></block></value></block></next></block></next></block>',
            },
            {
              blockType: Scratch.BlockType.XML,
              xml: '<block type="procedures_definition"><statement name="custom_block"><shadow type="procedures_prototype"><mutation proccode="play note %s with sound %s" argumentids="[&quot;N;H4MncY*U2ZH%~4/Pcv&quot;,&quot;sH)$V72w@ot8MDAk?(rz&quot;]" argumentnames="[&quot;NOTE&quot;,&quot;SOUND_MENU&quot;]" argumentdefaults="[&quot;&quot;,&quot;&quot;]" warp="false"></mutation><value name="N;H4MncY*U2ZH%~4/Pcv"><shadow type="argument_reporter_string_number"><field name="VALUE">NOTE</field></shadow></value><value name="sH)$V72w@ot8MDAk?(rz"><shadow type="argument_reporter_string_number"><field name="VALUE">SOUND_MENU</field></shadow></value></shadow></statement><next><block type="sound_seteffectto"><field name="EFFECT">PITCH</field><value name="VALUE"><shadow type="math_number"><field name="NUM">100</field></shadow><block type="operator_multiply"><value name="NUM1"><shadow type="math_number"><field name="NUM"></field></shadow><block type="operator_divide"><value name="NUM1"><shadow type="math_number"><field name="NUM"></field></shadow><block type="operator_subtract"><value name="NUM1"><shadow type="math_number"><field name="NUM">60</field></shadow><block type="argument_reporter_string_number"><field name="VALUE">NOTE</field></block></value><value name="NUM2"><shadow type="math_number"><field name="NUM">60</field></shadow></value></block></value><value name="NUM2"><shadow type="math_number"><field name="NUM">36</field></shadow></value></block></value><value name="NUM2"><shadow type="math_number"><field name="NUM">360</field></shadow></value></block></value><next><block type="sound_play"><value name="SOUND_MENU"><shadow type="sound_sounds_menu"><field name="SOUND_MENU">Meow</field></shadow><block type="argument_reporter_string_number"><field name="VALUE">SOUND_MENU</field></block></value></block></next></block></next></block>'
            },
            {
              blockType: Scratch.BlockType.XML,
              xml: '<block type="procedures_definition"><statement name="custom_block"><shadow type="procedures_prototype"><mutation proccode="play note %s with sound %s until done" argumentids="[&quot;N;H4MncY*U2ZH%~4/Pcv&quot;,&quot;sH)$V72w@ot8MDAk?(rz&quot;]" argumentnames="[&quot;NOTE&quot;,&quot;SOUND_MENU&quot;]" argumentdefaults="[&quot;&quot;,&quot;&quot;]" warp="false"></mutation><value name="N;H4MncY*U2ZH%~4/Pcv"><shadow type="argument_reporter_string_number"><field name="VALUE">NOTE</field></shadow></value><value name="sH)$V72w@ot8MDAk?(rz"><shadow type="argument_reporter_string_number"><field name="VALUE">SOUND_MENU</field></shadow></value></shadow></statement><next><block type="sound_seteffectto"><field name="EFFECT">PITCH</field><value name="VALUE"><shadow type="math_number"><field name="NUM">100</field></shadow><block type="operator_multiply"><value name="NUM1"><shadow type="math_number"><field name="NUM"></field></shadow><block type="operator_divide"><value name="NUM1"><shadow type="math_number"><field name="NUM"></field></shadow><block type="operator_subtract"><value name="NUM1"><shadow type="math_number"><field name="NUM">60</field></shadow><block type="argument_reporter_string_number"><field name="VALUE">NOTE</field></block></value><value name="NUM2"><shadow type="math_number"><field name="NUM">60</field></shadow></value></block></value><value name="NUM2"><shadow type="math_number"><field name="NUM">36</field></shadow></value></block></value><value name="NUM2"><shadow type="math_number"><field name="NUM">360</field></shadow></value></block></value><next><block type="sound_playuntildone"><value name="SOUND_MENU"><shadow type="sound_sounds_menu"><field name="SOUND_MENU">Bonk</field></shadow><block type="argument_reporter_string_number"><field name="VALUE">SOUND_MENU</field></block></value></block></next></block></next></block>'
            },
            {
              blockType: Scratch.BlockType.XML,
              xml: '<block type="procedures_definition"><statement name="custom_block"><shadow type="procedures_prototype"><mutation proccode="broadcast %s with data %s" argumentids="[&quot;6hT2f-lfJ,O}:vZwZ#:!&quot;,&quot;Fo8!WcAy1L~UoP@*2Xe(&quot;]" argumentnames="[&quot;BROADCAST_INPUT&quot;,&quot;DATA&quot;]" argumentdefaults="[&quot;&quot;,&quot;&quot;]" warp="false"></mutation><value name="6hT2f-lfJ,O}:vZwZ#:!"><shadow type="argument_reporter_string_number"><field name="VALUE">BROADCAST_INPUT</field></shadow></value><value name="Fo8!WcAy1L~UoP@*2Xe("><shadow type="argument_reporter_string_number"><field name="VALUE">DATA</field></shadow></value></shadow></statement><next><block type="data_setvariableto"><field name="VARIABLE" id="4.B2XbLuTE|zmLTP0}h]" variabletype="">BROADCAST_DATA</field><value name="VALUE"><shadow type="text"><field name="TEXT">0</field></shadow><block type="argument_reporter_string_number"><field name="VALUE">DATA</field></block></value><next><block type="event_broadcast"><value name="BROADCAST_INPUT"><shadow type="event_broadcast_menu"><field name="BROADCAST_OPTION" id=".bO3O:LN:))[}OspJvb_" variabletype="broadcast_msg">message1</field></shadow><block type="argument_reporter_string_number"><field name="VALUE">BROADCAST_INPUT</field></block></value></block></next></block></next></block>'
            },
            {
              blockType: Scratch.BlockType.XML,
              xml: '<block type="procedures_definition"><statement name="custom_block"><shadow type="procedures_prototype"><mutation proccode="broadcast %s with data %s and wait" argumentids="[&quot;6hT2f-lfJ,O}:vZwZ#:!&quot;,&quot;Fo8!WcAy1L~UoP@*2Xe(&quot;]" argumentnames="[&quot;BROADCAST_INPUT&quot;,&quot;DATA&quot;]" argumentdefaults="[&quot;&quot;,&quot;&quot;]" warp="false"></mutation><value name="6hT2f-lfJ,O}:vZwZ#:!"><shadow type="argument_reporter_string_number"><field name="VALUE">BROADCAST_INPUT</field></shadow></value><value name="Fo8!WcAy1L~UoP@*2Xe("><shadow type="argument_reporter_string_number"><field name="VALUE">DATA</field></shadow></value></shadow></statement><next><block type="data_setvariableto"><field name="VARIABLE" id="4.B2XbLuTE|zmLTP0}h]" variabletype="">BROADCAST_DATA</field><value name="VALUE"><shadow type="text"><field name="TEXT">0</field></shadow><block type="argument_reporter_string_number"><field name="VALUE">DATA</field></block></value><next><block type="event_broadcastandwait"><value name="BROADCAST_INPUT"><shadow type="event_broadcast_menu"><field name="BROADCAST_OPTION" id=".bO3O:LN:))[}OspJvb_" variabletype="broadcast_msg">message1</field></shadow><block type="argument_reporter_string_number"><field name="VALUE">BROADCAST_INPUT</field></block></value></block></next></block></next></block>'
            },
            {
              blockType: Scratch.BlockType.XML,
              xml: '<block type="procedures_call"><mutation proccode="play note %s with instrument %s for %s beats" argumentids="[&quot;7W48r_x2jwpMVn@1W+a!&quot;,&quot;!I[a?Pn7Y5|^3N.QlfRw&quot;,&quot;t|A9^Pq6AbWhe}s-8|di&quot;]" warp="false"></mutation><value name="7W48r_x2jwpMVn@1W+a!"><shadow type="note"><field name="NOTE">60</field></shadow></value><value name="!I[a?Pn7Y5|^3N.QlfRw"><shadow type="music_menu_INSTRUMENT"><field name="INSTRUMENT">1</field></shadow></value><value name="t|A9^Pq6AbWhe}s-8|di"><shadow type="math_number"><field name="NUM">0.25</field></shadow></value></block>',
            },
            {
              blockType: Scratch.BlockType.XML,
              xml: '<block type="procedures_call"><mutation proccode="play note %s with sound %s" argumentids="[&quot;N;H4MncY*U2ZH%~4/Pcv&quot;,&quot;sH)$V72w@ot8MDAk?(rz&quot;]" warp="false"></mutation><value name="N;H4MncY*U2ZH%~4/Pcv"><shadow type="note"><field name="NOTE">60</field></shadow></value><value name="sH)$V72w@ot8MDAk?(rz"><shadow type="sound_sounds_menu"><field name="SOUND_MENU">Meow</field></shadow></value></block>'
            },
            {
              blockType: Scratch.BlockType.XML,
              xml: '<block type="procedures_call"><mutation proccode="play note %s with sound %s until done" argumentids="[&quot;N;H4MncY*U2ZH%~4/Pcv&quot;,&quot;sH)$V72w@ot8MDAk?(rz&quot;]" warp="false"></mutation><value name="N;H4MncY*U2ZH%~4/Pcv"><shadow type="note"><field name="NOTE">60</field></shadow></value><value name="sH)$V72w@ot8MDAk?(rz"><shadow type="sound_sounds_menu"><field name="SOUND_MENU">Meow</field></shadow></value></block>'
            },
            {
              blockType: Scratch.BlockType.XML,
              xml: '<block type="procedures_call"><mutation proccode="broadcast %s with data %s" argumentids="[&quot;6hT2f-lfJ,O}:vZwZ#:!&quot;,&quot;Fo8!WcAy1L~UoP@*2Xe(&quot;]" warp="false"></mutation><value name="6hT2f-lfJ,O}:vZwZ#:!"><shadow type="event_broadcast_menu"><field name="BROADCAST_OPTION" id=".bO3O:LN:))[}OspJvb_" variabletype="broadcast_msg">message1</field></shadow></value><value name="Fo8!WcAy1L~UoP@*2Xe("><shadow type="text"><field name="TEXT"></field></shadow></value></block>'
            },
            {
              blockType: Scratch.BlockType.XML,
              xml: '<block type="procedures_call"><mutation proccode="broadcast %s with data %s and wait" argumentids="[&quot;6hT2f-lfJ,O}:vZwZ#:!&quot;,&quot;Fo8!WcAy1L~UoP@*2Xe(&quot;]" warp="false"></mutation><value name="6hT2f-lfJ,O}:vZwZ#:!"><shadow type="event_broadcast_menu"><field name="BROADCAST_OPTION" id=".bO3O:LN:))[}OspJvb_" variabletype="broadcast_msg">message1</field></shadow></value><value name="Fo8!WcAy1L~UoP@*2Xe("><shadow type="text"><field name="TEXT"></field></shadow></value></block>'
            },
            {
              blockType: Scratch.BlockType.XML,
              xml: '<block type="data_variable"><field name="VARIABLE" id="4.B2XbLuTE|zmLTP0}h]" variabletype="">BROADCAST_DATA</field></block>'
            },
          ],
        };
      }
    }
    Scratch.extensions.register(new xtraBlocks());
  })(Scratch);