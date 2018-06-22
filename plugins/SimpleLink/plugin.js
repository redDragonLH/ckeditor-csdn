CKEDITOR.plugins.add( 'SimpleLink', {
    icons: 'simplelink',
    hidpi: true,
    init: function( editor ) {
        editor.addCommand( 'simplelink', new CKEDITOR.dialogCommand( 'simplelinkDialog' ) );
        editor.ui.addButton( 'SimpleLink', {
            label: '添加链接',
            icons: 'simplelink',
            command: 'simplelink',
            toolbar: 'insert,13'
        });

        CKEDITOR.dialog.add( 'simplelinkDialog', this.path + 'dialogs/simplelink.js' );
    }
});