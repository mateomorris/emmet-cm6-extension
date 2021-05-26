<script>
  import {onMount} from 'svelte'
  import {defaultTabBinding} from "@codemirror/commands"
  import {EditorView,keymap} from "@codemirror/view"
  import {EditorState,Compartment} from "@codemirror/state"
  import {basicSetup} from "@codemirror/basic-setup"
  import {css} from "@codemirror/lang-css"
  import { html } from '@codemirror/lang-html';
  import emmetExt from './emmet-codemirror-ext';
  import cssPeek from './css-peek';

  let element

  let view
  onMount(() => {
    const language = new Compartment

    const state = EditorState.create({
      doc: "<main id=\"app\" class=\"container m3 p5\"></main>",
      extensions: [
        basicSetup,
        // language.of(css()),
        language.of(html()),
        cssPeek(),
        emmetExt({
          config: {
            type: 'html',
            syntax: 'html'
          },
        }),
        keymap.of([
          defaultTabBinding
        ])
      ]
    })

   view = new EditorView({
      state,
      parent: element
    })
  })
</script>

<div bind:this={element}>
</div>