<template>
    <div>
      <iframe ref="pdfFrame" src="https://lovemedicine.cn/public/uesg/pdf/e-all.pdf" width="100%" height="600"></iframe>
    </div>
  </template>
  
  <script>
  import pdfjsLib from 'pdfjs-dist';
  
  export default {
    props: {
      pdfUrl: {
        type: String,
        required: true
      },
      pagesToShow: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        pdfSrc: ''
      };
    },
    mounted() {
      this.loadPdf();
    },
    methods: {
      async loadPdf() {
        const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
        const pdf = await loadingTask.promise;
        
        // 根据用户付款状态设置显示的页面数量
        const numPagesToShow = this.pagesToShow;
        
        // 限制页面数量
        for (let i = 1; i <= numPagesToShow; i++) {
          const page = await pdf.getPage(i);
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const viewport = page.getViewport({ scale: 1 });
  
          canvas.height = viewport.height;
          canvas.width = viewport.width;
  
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
  
          await page.render(renderContext);
  
          if (i === 1) {
            this.$refs.pdfFrame.src = canvas.toDataURL();
          } else {
            this.$refs.pdfFrame.contentWindow.document.body.appendChild(canvas);
          }
        }
      }
    }
  };
  </script>
  