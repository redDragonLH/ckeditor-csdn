/**!
 * article summary
 * Copyright 2018 @LH
 */

  
  CKEDITOR.plugins.add( 'Summary', {
    lang: 'en,zh-cn',
    icons: 'Summary',
    hidpi: true,
    init: function( editor ){
      editor.addCommand( 'Summary', new CKEDITOR.dialogCommand( 'SummaryDialog' ) );
      editor.ui.addButton( 'Summary', {
          label: '添加摘要',
          icons: 'Summary',
          command: 'Summary',
          toolbar: 'insert,30'
      });
        CKEDITOR.dialog.add( 'SummaryDialog', this.path + 'dialogs/summary.js' );
    }
  })
