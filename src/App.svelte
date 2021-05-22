<script lang="ts">
  import OldVersion from './CodeMirror5.svelte'
  import NewVersion from './CodeMirror6.svelte'
</script>

<main>

  <div style="margin-bottom: 1rem">
    CodeMirror 5 (Emmet works)
    <OldVersion />
  </div>

  <div>
    CodeMirror 6 (Emmet doesn't work)
    <NewVersion />
  </div>

</main>
