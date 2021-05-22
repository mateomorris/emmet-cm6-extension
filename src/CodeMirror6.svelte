<script>
  import {onMount} from 'svelte'
  import {EditorView} from "@codemirror/view"
  import {EditorState,Compartment} from "@codemirror/state"
  import {basicSetup} from "@codemirror/basic-setup"
  import {html} from "@codemirror/lang-html"

  // since we can't do emmet(CodeMirror), we'll have to pass emmet in as an extension instead
  
  let element

  onMount(() => {
    const language = new Compartment

    const state = EditorState.create({
      doc: "<h1>Welcome!</h1>",
      extensions: [
        basicSetup,
        language.of(html()),
      ]
    })

    new EditorView({
      state,
      parent: element
    })
  })
</script>

<div bind:this={element}>
</div>