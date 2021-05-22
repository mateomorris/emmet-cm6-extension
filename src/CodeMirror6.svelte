<script>
  import {onMount} from 'svelte'
  import {EditorView} from "@codemirror/view"
  import {EditorState,Compartment} from "@codemirror/state"
  import {basicSetup} from "@codemirror/basic-setup"
  import {html} from "@codemirror/lang-html"
  import {docSizePlugin} from './new-emmet'
  import {keymap} from "@codemirror/view"
  import expand, { extract } from 'emmet';

  // since we can't do emmet(CodeMirror), we'll have to pass emmet in as an extension instead
  
  let element

  let view
  onMount(() => {
    const language = new Compartment

    const state = EditorState.create({
      doc: "main>div*3>ul>li*5",
      extensions: [
        basicSetup,
        language.of(html()),
        docSizePlugin,
        // Attempting to re-imlement emmet as an extension
        keymap.of([
          { 
            key: "Tab", 
            run: () => {
              const { state } = view.viewState
              const { from, to } = view.viewState.state.selection.main
              const [ text ] = state.doc.text
              const { abbreviation, start, end } = extract(text)
              const expanded = expand(abbreviation)
              view.dispatch({
                changes: {from: start, to: end, insert: expanded}
              })
              return true
            }
          }
        ]),
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