/*
 * 编辑到底部后内容向上滚动到中央
 * 
 */
 // 获取光标位置
 function getCursortPosition (textDom) {
     var cursorPos = 0;
     if (document.selection) {
         // IE Support
         textDom.focus ();
         var selectRange = document.selection.createRange();
         selectRange.moveStart ('character', -textDom.value.length);
         cursorPos = selectRange.text.length;
     }else if (textDom.selectionStart || textDom.selectionStart == '0') {
         // Firefox support
         cursorPos = textDom.selectionStart;
     }
     return cursorPos;
 }
 CKEDITOR.plugins.add( 'editareaup', {
     init: function( editor ) {
       editor.on( 'contentDom', function() {
         console.log( editor)
        } );
        editor.on( 'focus', function( e ) {
          console.log(editor.focusManager.currentActive.getName());
        } );
     }
 });