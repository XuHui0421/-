<template>
        <div class="flex-wrap">
            <div class="flex-main">
                <div class="text-title blue">sorry！您访问的页面不存在......</div> 
                <img src="../../static/img/404.png" alt="" class="mt80">
                <p class="mt50 fz16">即将离开本页，<span class="blue">{{time}}</span> 秒后自动返回上一页</p>
                <router-link to="/index" class="mt60">
                    <el-button type="primary">返回首页</el-button>
                </router-link>
            </div>
            <div class="flex-footer">
                <img src="../../static/img/tree.png" alt="">
            </div>
        </div>
</template>
<style>
.flex-wrap{
    height: 100%;
    
}
.flex-main{
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
}
.flex-footer{
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 0;
}

</style>
<script>
export default{
    data(){
        return {
            time: 3,
            InterValObj: ''
        }
    },
    created(){
        this.goback();
    },
    destroyed(){
        window.clearInterval(this.InterValObj);
    },
    methods: {
        goback(){
            var _this = this;
            this.InterValObj = window.setInterval(function() {
                --_this.time;
                if (_this.time == 0) {
                   _this.$router.go('-2');
                } 
            }, 1000);
        }
    }
}
</script>
