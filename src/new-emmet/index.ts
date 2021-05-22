import {ViewPlugin} from "@codemirror/view"

// Convert an emmet string into markup when pressing tab at the end of the string
// Display the string to be produced in a dialog box

export const docSizePlugin = ViewPlugin.fromClass(class {
  constructor(view) {
    // this.dom = view.dom.appendChild(document.createElement("div"))
    // this.dom.style.cssText =
    //   "position: absolute; inset-block-start: 2px; inset-inline-end: 5px"
    // this.dom.textContent = view.state.doc.length
  }

  update(update) {
    // if (update.docChanged) {
    //   this.dom.textContent = update.state.doc.length
    // }
  }

  destroy() { this.dom.remove() }
})