# Migrate Emmet from CodeMirror 5 to CodeMirror 6

```
npm install
npm run dev
```

Tracking progress/issues [here](https://github.com/mateomorris/primo.af/issues/325)

## Current Status: 

### May 22
I tried setting up the emmet plugin to run locally but didn't have any luck, and either way it looks really complicated and like it's going to be a lot of work to port it to a CodeMirror 6 extension. Instead, I've started creating an extension from scratch on the editor that's calling emmet directly instead of using the emmet plugin library. 

It works, but it only works correctly as is - when the emmet string `main>div*3>ul>li*5` is the only content in the editor and you press Tab. It also isn't displaying a preview of the expanded markup, but that should be easy. The hard part will probably be copying in the code from the plugin piecemeal, although at first glance it doesn't seem like a lot of that code will be needed with how much functionality the base emmet library provides out of the box.