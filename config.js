/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	// %REMOVE_START%

	config.toolbarGroups = [
			{ name: 'insert', groups: [ 'insert' ] },
			{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
			{ name: 'clipboard', groups: [ 'clipboard'] },
			{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
			{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
			{ name: 'forms', groups: [ 'forms' ] },
			{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
			{ name: 'links', groups: [ 'links' ] },
			{ name: 'styles', groups: [ 'styles' ] },
			{ name: 'colors', groups: [ 'colors' ] },
			{ name: 'tools', groups: [ 'tools' ] },
			{ name: 'others', groups: [ 'others' ] },
			{ name: 'about', groups: [ 'about' ] }
		];
	
		config.removeButtons = 'DocProps,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,Subscript,Superscript,Outdent,Indent,SpecialChar,Styles,Html5video,RemoveFormat,Source,Font,FontSize,Emojione';

	config.plugins =  'basicstyles,'+
										'blockquote,'+
										'dialogui,'+
										'dialog,'+
										'notification,'+
										'button,'+
										'toolbar,'+
										'clipboard,'+
										'panel,'+
										'floatpanel,'+
										'menu,'+
										'contextmenu,'+
										'enterkey,'+
										'entities,'+
										'popup,'+
										'filetools,'+
										'filebrowser,'+
										'floatingspace,'+
										'listblock,'+
										'richcombo,'+
										// 'format,'+
										'horizontalrule,'+
										'htmlwriter,'+
										'wysiwygarea,'+
										'image,'+
										'indent,'+
										'indentlist,'+
										'fakeobjects,'+
										'list,'+
										'magicline,'+
										'maximize,'+
										'pastetext,'+
										'pastefromword,'+
										'removeformat,'+
										'showborders,'+
										'sourcearea,'+
										'specialchar,'+
										'menubutton,'+
										'stylescombo,'+
										'tab,'+
										'table,'+
										'tabletools,'+
										'tableselection,'+
										// 'undo,'+
										'lineutils,'+
										'widgetselection,'+
										'widget,'+
										'notificationaggregator,'+
										'uploadwidget,'+
										'uploadimage,'+
										'codesnippet,'+
										// 'find,'+
										'autolink,'+
										// 'autoembed,'+
										'balloonpanel,'+
										'chart,'+
										'colordialog,'+
										'docprops,'+
										'imagebase,'+
										'xml,'+
										'ajax,'+
										'emojione,'+
										'image2,'+
										'eqneditor,'+
										'font,'+
										'html5video,'+
										'imageuploader,'+
										'indentblock,'+
 										// 'wordcount,'+  // 统计单词显示在编辑器页脚
										'toc,'+
										'SimpleLink,'+
										'textindent,'+
										'onchange,'+
										// 'editareaup,'+ // 编辑区域向上滚动 集成到enterkey
										// 'dialogadvtab,'+ // 表格高级对话框 
										'tableresize,'+ // 图表 鼠标调整表格列大小
										'addsvgicon,'+ // 加载自定义的图标
										'Summary,'+
										'textselection';
										
	 config.toolbarLocation = 'top';
	 config.height = 700; 
	 config.extraPlugins = 'uploadimage';
	 config.imageUploadUrl = '/UploadImage?shuiyin=2';
	 

	 
	 config.filebrowserImageUploadUrl= '/UploadImage?shuiyin=2';
	 
	 // config.allowedContent = true; // 允许一切
	 config.extraAllowedContent = 'img[class](*);pre[class](*);a[href](*)';  // 开启自动模式 保留需要的内容
	 // config.disallowedContent = 'p[style](*)';
	 
	 config.bodyClass = 'htmledit_views';  //给body设置class名
	 config.pasteFilter = 'semantic-content'; // 粘贴内容 已知标签（除div，span）的所有属性（除了 style和class）将保持不变
	 // Enables the greedy "put everywhere" mode.
	 config.magicline_everywhere = true; // 所有块元素显示辅助插入线
	 // Changes magic line color to blue.
	 config.magicline_color = '#ca0c16'; // 辅助插入线 颜色
	 // 全屏时使用
	 config.saveClass = {
		 BODY:['ed_fullscreen'],
		 MAIN:['container']
	 }
	 try {
		config.csdn_stlye_url = context_style_url;
	 	config.codeSnippet_theme = codeStyle;
	 } catch (e) {
	 	config.csdn_stlye_url = null;
		config.codeSnippet_theme = 'atom-one-dark';
		config.sammary  = '';
	 }
};

// %LEAVE_UNMINIFIED% %REMOVE_LINE%
