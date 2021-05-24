# Emmet CodeMirror 6 Extension

```
npm install
npm run dev
```

[localhost:3000](http://localhost:3000)

## Status

The basic functionality is up and running, so you can expand HTML reliably.

## Missing Features

### General

#### Not auto-placing cursor 
When expanding an abbreviation, the cursor jumps to the end of the expanded markup instead of jumping to the relevant spot within the string (e.g. between the tags), which is the expected Emmet behavior.

### CSS

#### Broken selectors
When you type a selector and brackets, Emmet tries expanding it and deletes the brackets. 
![image](https://user-images.githubusercontent.com/39444813/119354352-49939800-bca4-11eb-8c64-ccdd8ce9009b.png)


#### Preview appearing for root-level styles
The dialog box apepars for styles when outside of a selector, should only appear within it. 
![image](https://user-images.githubusercontent.com/39444813/119354490-6d56de00-bca4-11eb-87c0-52e4f43d724d.png)
