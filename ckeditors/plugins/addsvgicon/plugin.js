( function() {
	function splitstr(str,tag){
		return str.split(tag)
	};
	function overDEV(url,that){
		var url = url.replace(/_hover\.png/g, ".png");
		$(that).css('backgroundImage',url);
	}
	function onDEV(url,that){
		var url = url.replace(/\.png/g, "_hover.png");
		$(that).css('backgroundImage',url);
	}
	CKEDITOR.plugins.add( 'addsvgicon', {
		beforeInit: function( editor ) {
		},
    init: function(editor){
      CKEDITOR.scriptLoader.load( this.path + 'iconfont.js', function() {
				function over(e){
					var that = this;
					var url = $(this).css('backgroundImage');
					if (url.indexOf('/plugins/') > -1) {
						overDEV(url,that);
					} else {
						this.className = this.className.replace(/_hover/g, "");
					}

				}
				function on(e){
					var that = this;
					var url = $(this).css('backgroundImage');
					if (url.indexOf('/plugins/') > -1) {
						onDEV(url,that)
					} else {
						var classArr = this.className.split(/\s+/);
						var icon;
						classArr.map(function(cn){
							if(cn.indexOf('cke_button__') > -1){
								icon = cn;
							}
						})
						var c = icon.replace(/_icon$/g, "");
						var removeCN = new RegExp( icon + "$","gim");
						this.className = this.className.split(/\s+/)[0]
						this.className = this.className + ' ' + c + '_hover_icon';
					}
				}
				$('.cke_button_icon').hover(on,over)
      } );
			CKEDITOR.on('instanceReady',function( evt ){
				var pres = editor.document.getBody().$.getElementsByTagName( 'pre' );
				Array.prototype.forEach.call(pres,function(e){
					var dom = e;
					if (dom.className.indexOf('cke_widget_element') === -1 && Array.apply(null,dom.getElementsByTagName('code')).length === 0 ) {
						var text = e.innerText;
						var code = document.createElement('code');
						code.className = 'language-'+(dom.className ? dom.className : "html" ) +' hljs';
						code.innerText = text
						dom.innerText = '';
						dom.appendChild(code);
						dom.className = '';
					}
				})
 			})
    }
  })
})()