<script>
  import NewVersion from './CodeMirror6.svelte'


  const styles = `.container {
  display: block;
  width: 100%;
}`
  const markup = `<h1>Hello world!</h1>
ul>li*3`;
</script>
<style>
  html, body, #app, main {
    height: 100%;
  }
  main {
    display: flex;
    flex-direction: column;
  }

  main>div {
    flex-grow: 1;
  }
</style>
<main>

  <div style="margin-bottom: 1rem">
    Stylesheet
    <NewVersion type="stylesheet" content={styles} />
  </div>

  <div>
    Markup
    <NewVersion type="markup" content={markup} />
  </div>

</main>