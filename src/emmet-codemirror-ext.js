import {keymap} from "@codemirror/view"
import expand, { extract } from 'emmet';

export default function emmetExt() {
  /**
   * Given a start and end position, parse out a text string from the document.
   * If start and end are the same (no selection), returns the current line.
   * @param {EditorView} view
   * @param {number} start
   * @param {number} end
   * @returns {{selection: string, start: number}}
   */
  function getSelection(view, start, end) {
    const lines = view.viewState.state.doc.text;
    let selection = '';
    let pointer = 0;
    let startPointer = 0;
    for (let i = 0; i < lines.length; i++) {
      let currLine = lines[i] + view.viewState.state.lineBreak;
      const lineLength = currLine.length
      if (start < (pointer + lineLength)) {
        // selection starts in this line
        if (start == end) {
          // get whole line if no selection range
          selection = lines[i] // exclude ending line break
          startPointer = pointer;
          break
        } else if (end < (pointer + lineLength)) {
          // if single line selection, pull out whole selection from here
          selection = currLine.substring(start - pointer, end - pointer)
          startPointer = start
          break
        } else {
          // this is the start of a multi-line selection
          selection = currLine.substring(start - pointer)
        }
      } else if (selection && end >= (pointer + lineLength)) {
        // this whole line is part of multi-line selection
        selection += currLine
      } else if (selection && end < (pointer + lineLength)) {
        // this line contains the end of multi-line selection
        selection += currLine.substring(0, end - pointer)
      }
      pointer += lineLength
    }
    return {
      selection,
      start: startPointer,
    };
  }

  /**
   * Attempt to get a valid Emmet abbreviation from the current document selection
   * @param {EditorView} view
   * @returns {{start: number, end: number, abbreviation: string}|null}
   */
  function getEmmetAbbreviation(view) {
    const { from, to } = view.viewState.state.selection.main
    const {selection, start: selectionStart} = getSelection(view, from, to)
    const extraction = extract(selection)
    // if null, emmet failed to find a valid abbreviation in the selection/line
    if (extraction) {
      return {
        abbreviation: extraction.abbreviation,
        start: extraction.start + selectionStart,
        end: extraction.end + selectionStart,
      }
    }

    return null
  }

  // to later add any tooltip functionality, make this an array and pass other extensions
  return keymap.of([
    {
      key: "Tab",
      run: (view) => {
        const extraction = getEmmetAbbreviation(view);
        if (extraction) {
          const {abbreviation, start, end} = extraction
          const expanded = expand(abbreviation)
          view.dispatch({
            changes: {
              from: start,
              to: end,
              insert: expanded
            }
          })
          return true
        }
        return false
      }
    }
  ]);
}