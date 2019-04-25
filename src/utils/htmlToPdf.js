// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
  install (Vue, options) {
    Vue.prototype.getPdf = function () { // pdf预览
      var title = this.htmlTitle
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true,
        taintTest: false
      }).then(function (canvas) {
        // 创建一个关闭按钮
        let closeBtn = document.createElement('p')
        closeBtn.innerHTML = 'X'
        closeBtn.style = 'position:fixed;top:18px;left:15px;color:#fff;z-index:10000000;font-size:10px;cursor: pointer;'
        closeBtn.onclick = function () {
          closeBtn.style = 'display:none'
          htmlPDF.style = 'display:none'
        }
        // 创建一个下载按钮
        let downloadBtn = document.createElement('i')
        downloadBtn.className = 'el-icon-download'
        downloadBtn.style = 'position:fixed;bottom:20px;right:40px;z-index:100000;font-size:28px'
        let PDF = new JsPDF('p', 'mm', 'a4') // A4纸，纵向
        let ctx = canvas.getContext('2d')
        let a4w = 190; let a4h = 278 // A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
        let imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
        let renderedHeight = 0

        while (renderedHeight < canvas.height) {
          var page = document.createElement('canvas')
          page.width = canvas.width
          page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页

          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
          PDF.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距

          renderedHeight += imgHeight
          if (renderedHeight < canvas.height) { PDF.addPage() }// 如果后面还有内容，添加一个空页
          // delete page;
        }
        PDF.setProperties({// 设置文档属性
          title: '笔录预览',
          subject: 'This is the subject',
          author: 'Dragon',
          keywords: 'javascript, web 2.0, ajax',
          creator: 'MEEE'
        })
        // PDF.save('导出笔录.pdf')
        // 创建一个iframe
        let htmlPDF = document.createElement('iframe')
        htmlPDF.style = 'position:absolute;top:0px;width:100%;height:100%;z-index:10000'
        // pdf预览
        htmlPDF.src = PDF.output('datauristring')
        document.body.append(htmlPDF)
        document.body.append(closeBtn)
      })
    }
    Vue.prototype.exportPdf = function (id, name,type) {
      if(type == 'dailyBriefing'){
        $('#pdfDom').css({
          'overflow-y': 'visible',
          'height': 'auto'
        });
      }else if( type == 'officeIntroduction'){
        $('#pdfDom').css({
          'overflow-y': 'visible',
          'height': 'auto',
          'background':'url('+require('../assets/images/main.png')+')' + 'no-repeat',
          'background-size':'100% 100%'
        });
        $('.contentShow').css({
          'height': 'auto'
        });
        $('.ql-editor').css({
          'overflow-y': 'visible',
          'height': 'auto'
        });

      }
    
    
      html2Canvas(document.querySelector(`#${id}`), {
        allowTaint: true,
        taintTest: false
      }).then(function (canvas) {
        let PDF = new JsPDF('p', 'mm', 'a4') // A4纸，纵向
        let ctx = canvas.getContext('2d')
        let a4w = 190; let a4h = 276.6 // A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
        let imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
        let renderedHeight = 0
       
        while (renderedHeight < canvas.height) { // 分页
          var page = document.createElement('canvas')
          page.width = canvas.width
          page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页

          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
          PDF.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距

          renderedHeight += imgHeight
          if (renderedHeight < canvas.height) { PDF.addPage() }// 如果后面还有内容，添加一个空页
          // delete page;
        }
        // PDF.setProperties({// 设置文档属性
        //   title: '导出简报',
        //   color: 'black'
        // })
        if(type == 'officeIntroduction'){
          $('#pdfDom').css({
            'overflow-y': 'auto',
            'height': 'auto'
          });
          $('.contentShow').css({
            'height': '404px'
          });
          $('.ql-editor').css({
            'overflow-y': 'auto',
            'height': '100%'
          });
        }
        PDF.save(name + '.pdf')
        
        // // 创建一个iframe
        // let htmlPDF = document.createElement('iframe')
        // htmlPDF.style = 'position:absolute;top:0px;width:100%;height:100%;z-index:10000'
        // // pdf预览
        // htmlPDF.src = PDF.output('datauristring')
        // document.body.append(htmlPDF)
      })
    }
  }
}
