<template>
    <el-dialog :title="title" :visible.sync="$store.state.userdialog">
      <div class="dialog-body">
          <div class="user-dialog-face">
              <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" class="input-file" ref="logo" @change="changLogo($event)">
              <img :src="$store.state.userform.logo  || '../../../static/img/user_logo.png'" alt="" >
          </div>
        
        <el-form :model="$store.state.userform" class="dialog-form" label-width="70px" label-position="left">
          <el-form-item label="用户名">
            <el-input v-model="$store.state.userform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="$store.state.userform.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="$store.state.userform.mobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="$store.state.userform.department" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="$store.state.userform.role" placeholder="请选择权限">
              <el-option :label="role.name" :value="role.id" v-for="role in roleList"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userCancel">取 消</el-button>
        <el-button type="primary" @click="userSure">确 定</el-button>
      </div>
    </el-dialog>
</template>
<style scoped lang="less">
  @import "../../assets/css/page/userDialog.less";
</style>
<script>
export default {
    props: ['title',"roleList"],
    data(){
        return {
            
        }
    },
    methods:{
        userCancel(){
            this.$store.commit('closeUserDialog');
        },
        userSure(){
            this.$emit("userSure");
            this.$store.commit('closeUserDialog');
        },
        changLogo(){
            if (this.$refs.logo.files.length !== 0) {
                var image = new FormData();
                image.append('file', this.$refs.logo.files[0])
                this.$axios.post('file/action/upload/image/url', image)
                .then((response) => {
                    this.$set(this.$store.state.userform,"logo",response.rows.url);
                })
            }
        }
    }
}
</script>
