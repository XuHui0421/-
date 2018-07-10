<template>
   <div class="aside-left">
       <div>
           <div class="nav-logo">
            <a href="javascript:;">
                <img src="../../static/img/logo.png" alt="">
            </a>
            </div>
            <el-row class="nav nav-menu-list menu-height ">
                <el-col class="menu-height">
                    <el-menu :default-active="$route.path" router="router" class="el-menu-vertical-demo menu-height" active-text-color="#3497DB">
                        <div v-for="item in role">
                            <el-menu-item v-if="!item.leafMenuVos.length"  :index="item.path" v-bind:class="{active: $store.state.activeTab == item.path}">
                                <i class="icon iconfont" :class="item.icon"></i>
                                <span slot="title">{{item.displayName}}</span>
                            </el-menu-item>
                            <el-submenu v-else :index="item.path || '/system'" v-bind:class="{active: $store.state.activeTab == item.path}">
                                <template slot="title">
                                    <div class="submenu-title">
                                        <i class="icon iconfont " :class="item.icon"></i>
                                        <span>{{item.displayName}}</span>
                                    </div>
                                </template>
                                <el-menu-item v-for="child in item.leafMenuVos" :index="child.path">{{child.displayName}}</el-menu-item>
                            </el-submenu>
                        </div>
                    </el-menu>
                </el-col>
            </el-row>
       </div>
   </div>
</template>
<style lang="less">
@import "../assets/css/page/navMenu.less";
</style>

<script>
export default {
    data(){
        return {
            role: []
        }
    },
    created(){
        this.getRole();
    },
    methods: {
        getRole(){
            this.$axios.get('getRole')
            .then((resopnse) => {
                this.role = resopnse.rows
            });
        }
    }
};
</script>