export default class generateTemplates {
	constructor(type) {
		this.type = type;
	}
	render() {
		switch (this.type) {
		case 'link':
			return `\n [這裡是連結的文字](https://這裡是連結內容) \n`;
		case 'table':
			return `\n第一 | 第二 | 第三 | 第四
------- | ------- | ----- | ------
第一  | 內容 | 內容 | 內容
第二  | 內容 | 內容 | 內容
第三  | 內容 | 內容 | 內容\n`;
		case 'code':
			return `\`\`\`js
function(){
	const weather = "cold";
	console.log(\`the weather is forever $\{weather}\`);
}\`\`\``;
		case 'video':
			return `\n[![這裡寫圖片ALT](https://img.youtube.com/vi/YOUTUBE影片ID/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE影片ID)\n`;
		case 'image':
			return `\n![這裡寫圖片ALT](https://這裡是圖片連結)\n`;
		default:
			return false;
		}
	}
}
