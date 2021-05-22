<script>
  import {onMount} from 'svelte'
  import CodeMirror from 'codemirror/lib/codemirror'
  import 'codemirror/mode/xml/xml.js'
  import emmet from '@emmetio/codemirror-plugin'

  onMount(() => {
    emmet(CodeMirror);

    CodeMirror(element, {
      value: "<h1>Welcome!</h1>",
      mode:  "text/html",
      extraKeys: {
          'Tab': 'emmetExpandAbbreviation',
          'Esc': 'emmetResetAbbreviation',
          'Enter': 'emmetInsertLineBreak'
      }
    });
  })

  let element
</script>

<div bind:this={element}>
</div>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.61.1/codemirror.min.css" integrity="sha512-xIf9AdJauwKIVtrVRZ0i4nHP61Ogx9fSRAkCLecmE2dL/U8ioWpDvFCAy4dcfecN72HHB9+7FfQj3aiO68aaaw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<style>
  :global(.emmet-abbreviation-preview) {
    z-index: 9;
    background: #999;
  }

  :global(.emmet-abbreviation-preview .CodeMirror) {
    border: 1px solid gainsboro;
  }
</style>