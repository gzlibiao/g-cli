## 获取文件

```js
const options={
  types: [
      {
        description: "Images",
        accept: {
          "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
      },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

async function getFile() {
  
  // Open file picker and destructure the result the first handle
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  return file;
}
```
