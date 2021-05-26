import {EditorView} from "@codemirror/basic-setup"
import {StateField, EditorState} from "@codemirror/state"
import {keymap} from "@codemirror/view"
import {Tooltip, hoverTooltip} from "@codemirror/tooltip"

const lookupCssClass = (className) => {
  return className;
}
const isInAttribute = (attr, line, start, end) => {
  const regex = new RegExp( attr + '=[\'"]([\\w ]*?)[\'"]', 'gm');
  let m;

  while ((m = regex.exec(line)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    const matchStart = m.index + attr.length + 2;
    const matchEnd = m.index + m[0].length - 1;
    if (start >= matchStart && end <= matchEnd) {
      return true;
    }
  }
  return false;
}

export const wordHover = hoverTooltip((view, pos, side) => {
  let {from, to, text} = view.state.doc.lineAt(pos)
  let start = pos, end = pos
  while (start > from && /\w/.test(text[start - from - 1])) start--
  while (end < to && /\w/.test(text[end - from])) end++
  if (start == pos && side < 0 || end == pos && side > 0)
    return null

  const word = text.slice(start, end);
  const isCssClass = isInAttribute('class', text, start, end)
  if (!isCssClass)
    return null

  return {
    pos: start,
    end,
    above: true,
    create(view) {
      let dom = document.createElement("div")
      dom.textContent = word
      return {dom}
    }
  }
})

export default function cssPeek({theme = {}, config = {}} = {}) {
  return [
    wordHover,
  ];
}