/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

 /**
 * @fileOverview Rich code snippets for CKEditor.
 */

'use strict';

( function() {
	var isBrowserSupported = !CKEDITOR.env.ie || CKEDITOR.env.version > 8;

	CKEDITOR.plugins.add( 'codesnippet', {
		requires: 'widget,dialog',
		lang: 'ar,az,bg,ca,cs,da,de,de-ch,el,en,en-au,en-gb,eo,es,es-mx,et,eu,fa,fi,fr,fr-ca,gl,he,hr,hu,id,it,ja,km,ko,ku,lt,lv,nb,nl,no,oc,pl,pt,pt-br,ro,ru,sk,sl,sq,sv,th,tr,tt,ug,uk,vi,zh,zh-cn', // %REMOVE_LINE_CORE%
		icons: 'codesnippet', // %REMOVE_LINE_CORE%
		hidpi: true, // %REMOVE_LINE_CORE%

		beforeInit: function( editor ) {
			editor._.codesnippet = {};

			/**
			 * Sets the custom syntax highlighter. See {@link CKEDITOR.plugins.codesnippet.highlighter}
			 * to learn how to register a custom highlighter.
			 *
			 * **Note**:
			 *
			 * * This method can only be called while initialising plugins (in one of
			 * the three callbacks).
			 * * This method is accessible through the `editor.plugins.codesnippet` namespace only.
			 *
			 * @since 4.4
			 * @member CKEDITOR.plugins.codesnippet
			 * @param {CKEDITOR.plugins.codesnippet.highlighter} highlighter
			 */
			this.setHighlighter = function( highlighter ) { // 把高亮逻辑放到全局editor
				editor._.codesnippet.highlighter = highlighter;  // 188 line 定义

				var langs = editor._.codesnippet.langs =
					editor.config.codeSnippet_languages || highlighter.languages;

				// We might escape special regex chars below, but we expect that there
				// should be no crazy values used as lang keys.
				editor._.codesnippet.langsRegex = new RegExp( '(?:^|\\s)language-(' +
					CKEDITOR.tools.objectKeys( langs ).join( '|' ) + ')(?:\\s|$)' ); //获取语言的正则
			};
		},

		onLoad: function() {
			CKEDITOR.dialog.add( 'codeSnippet', this.path + 'dialogs/codesnippet.js' );
		},

		init: function( editor ) {
			editor.ui.addButton && editor.ui.addButton( 'CodeSnippet', { // 加载button
				label: editor.lang.codesnippet.button,
				command: 'codeSnippet',
				toolbar: 'insert,14'
			} );
		},

		afterInit: function( editor ) {
			var path = this.path;

			registerWidget( editor );  // 注册 Widget

			// At the very end, if no custom highlighter was set so far (by plugin#setHighlighter)
			// we will set default one.
			if ( !editor._.codesnippet.highlighter ) {
				var hljsHighlighter = new CKEDITOR.plugins.codesnippet.highlighter( {  //187ling 定义 highlighter，141挂载到codesnippet
					languages: {
						bash: 'Bash',
						cpp: 'C++',
						cs: 'C#',
						css: 'CSS',
						Delphi: 'Delphi',
						diff: 'diff',
						vbnet: 'VB.NET',
						Go: 'Go',
						html: 'HTML',
						java: 'Java',
						javascript: 'JavaScript',
						Kotlin: 'Kotlin',
						objectivec: 'Objective-C',
						perl: 'Perl',
						php: 'PHP',
						python: 'Python',
						ruby: 'Ruby',
						sql: 'SQL',
						vbscript: 'VBScript',
						Swift: 'Swift'
					},

					init: function( callback ) { // 初始化 加载高亮和行号
						var that = this;

						if ( isBrowserSupported ) {
							CKEDITOR.scriptLoader.load( path + 'lib/highlight/highlight.pack.js', function() {
								that.hljs = window.hljs;					
								callback();
								CKEDITOR.scriptLoader.load( path + 'lib/highlight/highlightjs-line-numbers.min.js', function() {
									hljs.initLineNumbersOnLoad();
									
								} );

				
							} );
						}

						// Method is available only if wysiwygarea exists.
						if ( editor.addContentsCss ) {
							editor.addContentsCss( path + 'lib/highlight/styles/' + editor.config.codeSnippet_theme + '.css' );
						}
					},
 // 添加的 widgets的codeSnippet内的highlight方法挂载 与 Highlighter.prototype.highlight  运行
					highlighter: function( code, language, callback ) { // 执行高亮 
						var highlighted = this.hljs.highlightAuto( code,
								this.hljs.getLanguage( language ) ? [ language ] : undefined );
						if ( highlighted )
							callback( highlighted.value );
					}
				} );

				this.setHighlighter( hljsHighlighter );
			}
		}
	} );

	/**
	 * Global helpers and classes of the Code Snippet plugin.
	 *
	 * For more information see the [Code Snippet Guide](#!/guide/dev_codesnippet).
	 *
	 * @class
	 * @singleton
	 */
	CKEDITOR.plugins.codesnippet = {
		highlighter: Highlighter
	};
	/**
	 * A Code Snippet highlighter. It can be set as a default highlighter
	 * using {@link CKEDITOR.plugins.codesnippet#setHighlighter}, for example:
	 *
	 *		// Create a new plugin which registers a custom code highlighter
	 *		// based on customEngine in order to replace the one that comes
	 *		// with the Code Snippet plugin.
	 *		CKEDITOR.plugins.add( 'myCustomHighlighter', {
	 *			afterInit: function( editor ) {
	 *				// Create a new instance of the highlighter.
	 *				var myHighlighter = new CKEDITOR.plugins.codesnippet.highlighter( {
	 *					init: function( ready ) {
	 *						// Asynchronous code to load resources and libraries for customEngine.
	 *						customEngine.loadResources( function() {
	 *							// Let the editor know that everything is ready.
	 *							ready();
	 *						} );
	 *					},
	 *					highlighter: function( code, language, callback ) {
	 *						// Let the customEngine highlight the code.
	 *						customEngine.highlight( code, language, function() {
	 *							callback( highlightedCode );
	 *						} );
	 *					}
	 *				} );
	 *
	 *				// Check how it performs.
	 *				myHighlighter.highlight( 'foo()', 'javascript', function( highlightedCode ) {
	 *					console.log( highlightedCode ); // -> <span class="pretty">foo()</span>
	 *				} );
	 *
	 *				// From now on, myHighlighter will be used as a Code Snippet
	 *				// highlighter, overwriting the default engine.
	 *				editor.plugins.codesnippet.setHighlighter( myHighlighter );
	 *			}
	 *		} );
	 *
	 * @since 4.4
	 * @class CKEDITOR.plugins.codesnippet.highlighter
	 * @extends CKEDITOR.plugins.codesnippet
	 * @param {Object} def Highlighter definition. See {@link #highlighter}, {@link #init} and {@link #languages}.
	 */
	function Highlighter( def ) {

		CKEDITOR.tools.extend( this, def ); // 复制属性，把def 内的属性复制到this，def：70+line的对象

		/**
		 * A queue of {@link #highlight} jobs to be
		 * done once the highlighter is {@link #ready}.
		 *
		 * @readonly
		 * @property {Array} [=[]]
		 */
		this.queue = [];

		// Async init – execute jobs when ready.
		if ( this.init ) {
			this.init( CKEDITOR.tools.bind( function() {
				// Execute pending jobs.
				var job;

				while ( ( job = this.queue.pop() ) )
					job.call( this );

				this.ready = true;
			}, this ) );
		} else {
			this.ready = true;
		}

		/**
		 * If specified, this function should asynchronously load highlighter-specific
		 * resources and execute `ready` when the highlighter is ready.
		 *
		 * @property {Function} [init]
		 * @param {Function} ready The function to be called once
		 * the highlighter is {@link #ready}.
		 */

		/**
		 * A function which highlights given plain text `code` in a given `language` and, once done,
		 * calls the `callback` function with highlighted markup as an argument.
		 *
		 * @property {Function} [highlighter]
		 * @param {String} code Code to be formatted.
		 * @param {String} lang Language to be used ({@link CKEDITOR.config#codeSnippet_languages}).
		 * @param {Function} callback Function which accepts highlighted String as an argument.
		 */

		/**
		 * Defines languages supported by the highlighter.
		 * They can be restricted with the {@link CKEDITOR.config#codeSnippet_languages} configuration option.
		 *
		 * **Note**: If {@link CKEDITOR.config#codeSnippet_languages} is set, **it will
		 * overwrite** the languages listed in `languages`.
		 *
		 *		languages: {
		 *			coffeescript: 'CoffeeScript',
		 *			cpp: 'C++',
		 *			cs: 'C#',
		 *			css: 'CSS'
		 *		}
		 *
		 * More information on how to change the list of languages is available
		 * in the [Code Snippet documentation](#!/guide/dev_codesnippet-section-changing-languages-list).
		 *
		 * @property {Object} languages
		 */

		/**
		 * A flag which indicates whether the highlighter is ready to do jobs
		 * from the {@link #queue}.
		 *
		 * @readonly
		 * @property {Boolean} ready
		 */
	}

	/**
	 * Executes the {@link #highlighter}. If the highlighter is not ready, it defers the job ({@link #queue})
	 * and executes it when the highlighter is {@link #ready}.
	 *
	 * @param {String} code Code to be formatted.
	 * @param {String} lang Language to be used ({@link CKEDITOR.config#codeSnippet_languages}).
	 * @param {Function} callback Function which accepts highlighted String as an argument.
	 */
	Highlighter.prototype.highlight = function() {
		var arg = arguments;

		// Highlighter is ready – do it now.
		if ( this.ready )
			this.highlighter.apply( this, arg );
		// Queue the job. It will be done once ready.
		else {
			this.queue.push( function() {
				this.highlighter.apply( this, arg );
			} );
		}
	};

	// Encapsulates snippet widget registration code.
	// @param {CKEDITOR.editor} editor
	function registerWidget( editor ) {
		var codeClass = editor.config.codeSnippet_codeClass, //获取设置的代码片 class 名
			newLineRegex = /\r?\n/g,
			textarea = new CKEDITOR.dom.element( 'textarea' ),
			lang = editor.lang.codesnippet;

		editor.widgets.add( 'codeSnippet', {
			allowedContent: 'pre; code(language-*)', // 要生成的html结构
			// Actually we need both - pre and code, but ACF does not make it possible
			// to defire required content with "and" operator.
			requiredContent: 'pre',
			styleableElements: 'pre',
			template: '<pre><code class="' + codeClass + ' hljs"></code></pre>', // 样式模板
			dialog: 'codeSnippet', // 对话窗口的名称
			pathName: lang.pathName, //路径
			mask: false, // 不生成图片

			parts: {
				pre: 'pre',
				code: 'code'
			},
			highlight: function() { // 高亮
				var that = this,
					widgetData = this.data,
					callback = function( formatted ) {

						// IE8 (not supported browser) have issue with new line chars, when using innerHTML.
						// It will simply strip it.
						that.parts.code.setHtml( isBrowserSupported ?
							formatted : formatted.replace( newLineRegex, '<br>' ) );
					};

				// Set plain code first, so even if custom handler will not call it the code will be there.
				// 首先设置纯代码，即使自定义处理程序不会调用它，代码也会在那里。
				callback( CKEDITOR.tools.htmlEncode( widgetData.code ) );

				// Call higlighter to apply its custom highlighting.
				editor._.codesnippet.highlighter.highlight( widgetData.code, widgetData.lang, function( formatted ) {

					editor.fire( 'lockSnapshot' );
					callback( formatted );
					editor.fire( 'unlockSnapshot' );
				} );
			},

			data: function() {
				var newData = this.data,
					oldData = this.oldData;
				if ( newData.code )
					this.parts.code.setHtml( CKEDITOR.tools.htmlEncode( newData.code ) );

				// Remove old .language-* class.
				if ( oldData && newData.lang != oldData.lang )
					this.parts.code.removeClass( 'language-' + oldData.lang );

				// Lang needs to be specified in order to apply formatting.
				if ( newData.lang ) {
					// Apply new .language-* class.
					this.parts.code.addClass( 'language-' + newData.lang );

					this.highlight(); // registerWidget 定义的 highlight方法,代码高亮
				}

				// Save oldData.
				this.oldData = CKEDITOR.tools.copy( newData );
			},

			// Upcasts <pre><code [class="language-*"]>...</code></pre>
			upcast: function( el, data ) {
				if ( el.name != 'pre' )
					return;
				
				// 兼容旧代码
				var isOldCode = false; // 判断是否为旧代码格式
				for (var i = 0; i < el.children.length; i++) {
					// 子节点有code就略过
					isOldCode =	el.children[i].name == 'code'? false: true;
					if(!isOldCode){
						break;
					}
				}

				if(el.attributes.class != undefined && el.attributes.class.indexOf('has') === -1 && isOldCode){
					var code = new CKEDITOR.htmlParser.element( 'code' ); // 生成code节点
					var text = new CKEDITOR.htmlParser.text(el.getHtml()) // 生成内部代码段节点
					code.addClass("language-" + el.classes[0])
					code.children[0] = text
					el.children[0] = code;
					el.attributes.class = 'has';
				}
				// 兼容旧代码end
				
				var childrenArray = getNonEmptyChildren( el ),
					code;

				if ( childrenArray.length != 1 || ( code = childrenArray[ 0 ] ).name != 'code' )
					return;

				// Upcast <code> with text only: https://dev.ckeditor.com/ticket/11926#comment:4
				if ( code.children.length != 1 || code.children[ 0 ].type != CKEDITOR.NODE_TEXT )
					return;

				// Read language-* from <code> class attribute.
				var matchResult = editor._.codesnippet.langsRegex.exec( code.attributes[ 'class' ] );

				if ( matchResult )
					data.lang = matchResult[ 1 ];

				// Use textarea to decode HTML entities (https://dev.ckeditor.com/ticket/11926).
				textarea.setHtml( code.getHtml() );
				data.code = textarea.getValue();

				code.addClass( codeClass );

				return el;
			},

			// Downcasts to <pre><code [class="language-*"]>...</code></pre>
			downcast: function( el ) {
				
				// var code = el.getFirst( 'code' );
				var code = el.getFirst( 'code' );

				// Remove pretty formatting from <code>...</code>.
				code.children.length = 0;

				// Remove config#codeSnippet_codeClass.
				code.removeClass( codeClass );
				// Set raw text inside <code>...</code>.
				code.add( new CKEDITOR.htmlParser.text( CKEDITOR.tools.htmlEncode( this.data.code )  ) );
				// hljs.lineNumbersBlock(document.querySelectorAll(".hljs"));
				return el;
			}
		} );

		// Returns an **array** of child elements, with whitespace-only text nodes
		// filtered out.
		// @param {CKEDITOR.htmlParser.element} parentElement
		// @return Array - array of CKEDITOR.htmlParser.node
		var whitespaceOnlyRegex = /^[\s\n\r]*$/;

		function getNonEmptyChildren( parentElement ) {
			var ret = [],
				preChildrenList = parentElement.children,
				curNode;

			// Filter out empty text nodes.
			for ( var i = preChildrenList.length - 1; i >= 0; i-- ) {
				curNode = preChildrenList[ i ];

				if ( curNode.type != CKEDITOR.NODE_TEXT || !curNode.value.match( whitespaceOnlyRegex ) )
					ret.push( curNode );
			}

			return ret;
		}
	}
} )();

/**
 * A CSS class of the `<code>` element used internally for styling
 * (by default [highlight.js](http://highlightjs.org) themes, see
 * {@link CKEDITOR.config#codeSnippet_theme config.codeSnippet_theme}),
 * which means that it is **not present** in the editor output data.
 *
 *		// Changes the class to "myCustomClass".
 *		config.codeSnippet_codeClass = 'myCustomClass';
 *
 * **Note**: The class might need to be changed when you are using a custom
 * highlighter (the default is [highlight.js](http://highlightjs.org)).
 * See {@link CKEDITOR.plugins.codesnippet.highlighter} to read more.
 *
 * Read more in the [documentation](#!/guide/dev_codesnippet)
 * and see the [SDK sample](https://sdk.ckeditor.com/samples/codesnippet.html).
 *
 * @since 4.4
 * @cfg {String} [codeSnippet_codeClass='hljs']
 * @member CKEDITOR.config
 */
CKEDITOR.config.codeSnippet_codeClass = 'hljs';

/**
 * Restricts languages available in the "Code Snippet" dialog window.
 * An empty value is always added to the list.
 *
 * **Note**: If using a custom highlighter library (the default is [highlight.js](http://highlightjs.org)),
 * you may need to refer to external documentation to set `config.codeSnippet_languages` properly.
 *
 * Read more in the [documentation](#!/guide/dev_codesnippet-section-changing-supported-languages)
 * and see the [SDK sample](https://sdk.ckeditor.com/samples/codesnippet.html).
 *
 *		// Restricts languages to JavaScript and PHP.
 *		config.codeSnippet_languages = {
 *			javascript: 'JavaScript',
 *			php: 'PHP'
 *		};
 *
 * @since 4.4
 * @cfg {Object} [codeSnippet_languages=null]
 * @member CKEDITOR.config
 */

/**
 * A theme used to render code snippets. See [available themes](http://highlightjs.org/static/test.html).
 *
 * **Note**: This will only work with the default highlighter
 * ([highlight.js](http://highlightjs.org/static/test.html)).
 *
 * Read more in the [documentation](#!/guide/dev_codesnippet-section-changing-highlighter-theme)
 * and see the [SDK sample](https://sdk.ckeditor.com/samples/codesnippet.html).
 *
 *		// Changes the theme to "pojoaque".
 *		config.codeSnippet_theme = 'pojoaque';
 *
 * @since 4.4
 * @cfg {String} [codeSnippet_theme='default']
 * @member CKEDITOR.config
 */
CKEDITOR.config.codeSnippet_theme = 'default';
