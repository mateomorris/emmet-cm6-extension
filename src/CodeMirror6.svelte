<script>
  import {onMount} from 'svelte'
  import {defaultTabBinding} from "@codemirror/commands"
  import {EditorView,keymap} from "@codemirror/view"
  import {EditorState,Compartment} from "@codemirror/state"
  import {basicSetup} from "@codemirror/basic-setup"
  import {css} from "@codemirror/lang-css"
  import { html } from '@codemirror/lang-html';
  import emmetExt from './emmet-codemirror-ext'

  let element

  let view
  onMount(() => {
    const language = new Compartment

    const state = EditorState.create({
      doc: "h1 {\n\t\n}",
      extensions: [
        basicSetup,
        language.of(css()),
        // language.of(html()),
        emmetExt({
          config: {
            type: 'stylesheet',
            syntax: 'css'
          }
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