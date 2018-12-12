<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>

  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      setUEContent(){
        var imgUrl = this.$store.state.upImg
          return this.editor.setContent(imgUrl,true)
      }
    },
    destroyed() {
      this.editor.destroy();
    },
    deactivated(){
             
        }
  }
</script>
<style>
  .edui-popup-content.edui-default{ height: auto !important; }
  
</style>