(function(window,CKEDITOR){
  'use strict';
  var editor_inter = 0; //定时器
  var MaxLength = 256;
  function changeNum(e){
    var text = e.target;
    var changeNumDom = document.getElementById('changeNum');
    editor_inter = setInterval(function() {
      if(text.value.length < MaxLength){
        changeNumDom.innerText = text.value.length;
      }else{
        text.value = text.value.substr(0,MaxLength);
        changeNumDom.innerText = MaxLength;
      }
    }, 200);
  }
  function changeBlur(){
    if (editor_inter) clearInterval(editor_inter);
  }
  
  /**
   * 弹框样式
   */
  var summaryCss={
    summaryBox: 'border-radius:4px;'+
                'position:relative;'+
                'border-width:1px;'+
                'border-style:solid;'+
                'border-color:#CCCCCC;'+
                'margin-top:8px;'+
                'margin-bottom:8px;'+
                'box-sizing:border-box;',
    summaryCon: 'width:100%;'+
                'resize:none;'+
                'padding:8px;'+
                'box-sizing:border-box;'+
                'height:180px',
    summaryNum: 'position:absolute;'+
                'right:20px;'+
                'bottom:2px;'+
                'font-size:12px;'+
                'color:#D6D6D6;'
  }
  /**
   * 弹框结构
   */
  var summaryHtml = '<div id="summaryBox" style='+ summaryCss.summaryBox + '>'+
                      '<textarea id="summaryCon" placeholder="请填写文章摘要，如未填写则摘要由系统生成" style='+ summaryCss.summaryCon +'></textarea>'+
                      '<span id="summaryNum" style='+ summaryCss.summaryNum +'><span id="changeNum" style="color:#D6D6D6">0</span>/'+ MaxLength +'</span>'+
                    '</div>';
  CKEDITOR.dialog.add("SummaryDialog", function(editor) {
    return {
      title: "生成摘要",
      minWidth: 468,
      minHeight: 180,
      resizable: CKEDITOR.DIALOG_RESIZE_NONE,
      contents:[{
        id: "summary",
        label: "summary",
        elements:[{
          id:'textcontent',
          type: 'html',
          html:summaryHtml
      }]
    }],
    onShow:function( editor,c ){
      var textDom = document.getElementById('summaryCon')
      textDom.addEventListener('focus', changeNum);
    },
    onLoad:function(editor){
      var textDom = document.getElementById('summaryCon'),
          conDom = document.getElementById('txtSammary');
      textDom.addEventListener('focus', changeNum);
      if(conDom.value){
        textDom.value = conDom.value;
        var changeNumDom = document.getElementById('changeNum');
        changeNumDom.innerText = textDom.value.length;
      }
    },
    onCancel:changeBlur,
    onOk:changeBlur
    }
  });
  
})(window,CKEDITOR)
