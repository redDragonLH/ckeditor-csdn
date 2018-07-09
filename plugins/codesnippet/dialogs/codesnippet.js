/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

( function() {
	CKEDITOR.dialog.add( 'codeSnippet', function( editor ) {
		var snippetLangs = editor._.codesnippet.langs,
			lang = editor.lang.codesnippet,
			clientHeight = document.documentElement.clientHeight,
			langSelectItems = [],
			snippetLangId;

		langSelectItems.push( [ editor.lang.common.notSet, '' ] );

		for ( snippetLangId in snippetLangs )
			langSelectItems.push( [ snippetLangs[ snippetLangId ], snippetLangId ] );

		// Size adjustments.
		var size = CKEDITOR.document.getWindow().getViewPaneSize(),
			// Make it maximum 800px wide, but still fully visible in the viewport.
			width = Math.min( size.width - 70, 740 ),
			// Make it use 2/3 of the viewport height.
			height = size.height / 1.6;

		// Low resolution settings.
		if ( clientHeight < 650 ) {
			height = clientHeight - 220;
		}

		return {
			title: lang.title,
			minHeight: 200,
			resizable: CKEDITOR.DIALOG_RESIZE_NONE,
			contents: [
				{
					id: 'info',
					elements: [
						{
							id: 'lang',
							type: 'select',
							// label: lang.language,
							items: langSelectItems,
							style: 'color: #E0E0E0;margin-top: 0;',
							controlStyle: 'position: absolute;right:24px;top: 59px;color:#fff;',
							labelStyle: 'margin-left: 0;',
							setup: function( widget ) {
								if ( widget.ready && widget.data.lang )
									this.setValue( widget.data.lang );

								// The only way to have an empty select value in Firefox is
								// to set a negative selectedIndex.
								if ( CKEDITOR.env.gecko && ( !widget.data.lang || !widget.ready ) )
									this.getInputElement().$.selectedIndex = -1;
							},
							commit: function( widget ) {
								widget.setData( 'lang', this.getValue() );
							}
						},
						{
							id: 'code',
							type: 'textarea',
							className: 'codebox',
							// label: lang.codeContents,
							setup: function( widget ) {
								this.setValue( widget.data.code );
							},
							commit: function( widget ) {
								widget.setData( 'code', this.getValue() );
							},
							required: true,
							validate: CKEDITOR.dialog.validate.notEmpty( lang.emptySnippetError ),
							labelStyle: 'line-height:0;display:none;',
							inputStyle: 'cursor:auto;' +
								'width:' + width + 'px;' +
								'height:' + height + 'px;' +
								'padding: 16px;' +
								'tab-size:4;' +
								'text-align:left;'+
								'font-size: 14px;'+
								'color: #CCCCCC;'+
								'background: #272E39;'+
								'font-family: Consolas,Inconsolata,Courier,monospace,PingFang SC,Microsoft YaHei,sans-serif;',
							'class': 'cke_source'
						}
					]
				}
			],
			onLoad: function(){
				var codebox = document.getElementsByClassName('codebox')[0].getElementsByTagName('textarea')[0];
				codebox.addEventListener('keydown',function(e){
				  if(e.keyCode===9){
						window.event? window.event.returnValue = false : e.preventDefault(); //阻止默认行为
						// 谷歌阻止tab默认 这个好使
				    window.event? window.event.cancelBubble = true : e.stopPropagation(); //停止冒泡

						var position=this.selectionStart+4;//四个空格
						// '    ' 修改缩进位置
				    this.value=this.value.substr(0,this.selectionStart) + '    ' + this.value.substr(this.selectionStart);
				    this.selectionStart=position;
				    this.selectionEnd=position;
				    this.focus();
				  }
				},false);
			}
		};
	} );
}() );
