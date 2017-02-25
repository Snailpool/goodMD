import React from 'react';
import CSSModules from 'react-css-modules';
import marked from 'marked';
import highlight from 'highlight.js';
import GenerateTemplates from './generateTemplates.js';
import styles from './home.css';

const defaultText = `# Markdown 線上編輯器
**點 [這裡](https://help.github.com/categories/writing-on-github/) 
了解更多GFM格式**
## 介紹
- 由github README.md 檔認識了markdown 這種文字編輯標準
- 寫了這個編輯器做簡單的預覽功能
 - 網路上像這樣的編輯器像山~~~ 一樣多
 

## 一些用法
1. 這個＃可以打到六個，分別對應html 的 h1 ~ h6 tag
2. 
> 蘋果，柳丁，橘子，蘋果
3. *斜斜的*和**重要的**

## 使用工具


 [**chjj/marked**](https://github.com/chjj/marked) : markdown 的parser


 [**isagalaev/highlight.js**](https://github.com/isagalaev/highlight.js) : 程式碼區塊的 highlight


 [**afeld/emoji-css**](https://github.com/afeld/emoji-css/) : emoji 圖片的 class 
`


class Home extends React.Component {
	constructor(defaultProps) {
		super(defaultProps);
		this.state = { defaultText, preview: '', startPosition: 0, endPosition: 0, helper: false };
		this.inputTextarea = document.getElementById('inputTextarea');
	}

	// parse markdown form editor, and append it to preview block.
	parseMarkdown(evt) {
		const textArea = evt.target;
		marked.setOptions({
			highlight: function (code, lang) {
				return highlight.highlight(lang, code).value;
			},
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: false,
			smartLists: true,
			smartypants: false,
		});
		
		this.setState({ preview: marked(this.refs.markdown.value),
			startPosition: textArea.selectionStart,
			endPosition: textArea.selectionEnd });

	}
	// append certain type of markdown.
	append(type, evt) {
		const generator = new GenerateTemplates(type);
		this.refs.markdown.value = this.refs.markdown.value.slice(0, this.state.startPosition)
									+ generator.render()
									+ this.refs.markdown.value.slice(this.state.endPosition, this.refs.markdown.value.length);
	}

	toggleHelper() {
		this.setState({ helper: !this.state.helper });
	}
	render() {
		return (
			<div style={{ height: '100%' }}>
				<div styleName="editor">
					<div styleName={ this.state.helper ? 'helper' : 'helper helper--hide' }>
						<button styleName="helper__btn" onClick={ this.append.bind(this, 'link') }>連結</button>
						<button styleName="helper__btn" onClick={ this.append.bind(this, 'table') }>表格</button>
						<button styleName="helper__btn" onClick={ this.append.bind(this, 'code') }>程式碼</button>
						<button styleName="helper__btn" onClick={ this.append.bind(this, 'image') }>圖片</button>
						<button styleName="helper__btn" onClick={ this.append.bind(this, 'video') }>youtube影片</button>
						<span styleName="helper__hint" onClick={ this.toggleHelper.bind(this) }>help !</span>
					</div>
					<textarea id="inputTextarea" onClick={this.parseMarkdown.bind(this)} onChange={this.parseMarkdown.bind(this) } styleName="editor__textarea" defaultValue={this.state.defaultText} ref="markdown"></textarea>
				</div>
				<div styleName="preview" id="preview">
					<div dangerouslySetInnerHTML={{ __html: this.state.preview }}></div>
				</div>
			</div>
		);
	}
}

export default CSSModules(Home, styles,{allowMultiple:true});
