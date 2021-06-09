<script>
  import {onMount} from 'svelte'
  import {defaultTabBinding} from "@codemirror/commands"
  import {EditorView,keymap} from "@codemirror/view"
  import {EditorState,Compartment} from "@codemirror/state"
  import {basicSetup} from "@codemirror/basic-setup"
  import {css} from "@codemirror/lang-css"
  import { html } from '@codemirror/lang-html';
  import emmetExt from './emmet-codemirror6-ext';
  import cssPeek from './css-peek';

  let element
  export let type
  export let content

  function getLanguageOf(type) {
    const language = new Compartment
    switch (type) {
      case 'stylesheet':
        return language.of(css());
      case 'markup':
        return language.of(html());
      default:
        throw `Invalid type: ${type}. Expected 'stylesheet' or 'markup'`
    }
  }
  function getEmmetConfig(type) {
    switch (type) {
      case 'stylesheet':
        return {
          type: 'stylesheet',
          syntax: 'css'
        };
      case 'markup':
        return {
          type: 'markup',
          syntax: 'html'
        };
      default:
        throw `Invalid type: ${type}. Expected 'stylesheet' or 'markup'`
    }
  }
  let view
  onMount(() => {
    const state = EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        getLanguageOf(type),
        emmetExt({
          config: getEmmetConfig(type),
        }),
        cssPeek({
          src: [
            './style.css',
          ],
          css: '.container { margin: 1rem; }',
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