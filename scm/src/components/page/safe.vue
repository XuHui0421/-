<template>
  <div class="container" ref="container">
    <div class="container-wrap">
      <div class="container-left">
        <div class="detail-header">
          <h2 class="header-title">角色列表</h2>
          <div class="header-right">
              <el-row>
                  <el-col :span="12">
                      <el-button type="primary" size="mini" round icon="el-icon-plus" @click="addRoleDialog = true">添加角色</el-button>
                  </el-col>
                  <el-col :span="12">
                      <el-button type="danger" size="mini" round icon="el-icon-close" @click="deleRole">删除角色</el-button>
                  </el-col>
              </el-row>
          </div>
        </div>
        <div class="detail-list-wrap">

          <ul class="detail-list">
            <li v-for="role in roleList" class="role-list" @click="selectRole(role.id)">
              <el-checkbox v-model="role.checked" class="mr10"></el-checkbox>
              <span>{{role.name}}</span>
              <span class="fr">数量{{role.number}}</span>
            </li>
          </ul>
        </div>
        <div class="list-num">
          当前已加载：{{roleList.length}}条
        </div>
      </div>
      <div class="container-right">
        <div class="detail-header">
          <h1 class="detail-title">财务部门</h1>
        </div>
        <div class="detail-tab">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="用户管理" name="first">
              <div class="tab-header">
                <div class="fl">
                  <el-input placeholder="请输入关键字查询">
                    <template slot="append">
                      <el-button class="btn-green">查询</el-button>
                    </template>
                  </el-input>
                </div>
                <div class="tab-header-fr">
                  <el-button type="primary" size="mini" round icon="el-icon-plus" @click="updateUser">修改</el-button>
                  <el-button type="primary" size="mini" round icon="el-icon-plus" @click="addUser">新增用户</el-button>
                  <el-button type="danger" size="mini" round icon="el-icon-close" @click="deleUser">删除用户</el-button>
                  <el-dropdown trigger="click" class="dropdown dropdown-round dropdown-primary">
                    <span class="el-dropdown-link">
                      更多
                      <i class="el-icon-arrow-down"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>启用</el-dropdown-item>
                      <el-dropdown-item>停用</el-dropdown-item>
                      <el-dropdown-item>批量导入</el-dropdown-item>
                      <el-dropdown-item>密码重置</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div class="mt20">
                <el-table ref="multipleTable" :data="customerTable" class="table">
                  <el-table-column width="60">
                    <template scope="scope">
                        <el-radio v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column label="头像">
                    <template slot-scope="scope">
                      <img v-bind:src="scope.row.logo" class="face" alt="">
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="用户名"></el-table-column>
                  <el-table-column prop="mobile" label="联系方式"></el-table-column>
                  <el-table-column prop="email" label="邮箱"></el-table-column>
                  <el-table-column prop="department" label="部门"></el-table-column>
                  <el-table-column prop="role" label="权限"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="权限设置" name="second">
              <el-collapse @change="openPower">
                <el-collapse-item v-for="(powerPre,i) in powerList"  :name="powerPre.name">
                  <template slot="title">
                    <el-checkbox class="mr10" v-model="powerPre.checked"></el-checkbox>
                    <span class="collapse-title">{{powerPre.name}}</span>
                  </template>
                  <ul class="power-list">
                    <li class="role-switch" v-for="(power,j) in powerPre.list">
                      {{power.displayName}}
                      <el-switch v-model="power.checked" @change="setPower(i,j)"> </el-switch>
                    </li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <user-dialog v-on:userSure="setUser" :roleList="roleList" :title="UserDialogTitle"></user-dialog>
    <el-dialog title="添加角色" :visible.sync="addRoleDialog" width="30%">
      <div class="dialog-body">
        <el-form :model="addRoleForm" :rules="addRoleRule"  ref="roleForm" label-width="70px">
          <el-form-item label="角色名" prop="name">
            <el-input v-model="addRoleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="addRoleForm.description" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
  @import "../../assets/css/page/safe.less";
  @import "../../assets/css/page/detail.less";
</style>

<script>
import UserDialog from '../page/userDialog.vue'
  export default {
    components:{
        UserDialog
    },
    data() {
      return {
        activeTab: "first",
        addRoleDialog: false,
        checkedList: {
          order: true
        },
        orderPower: {
          add: true,
          update: true,
          dele: true,
          import: true,
          export: true,
          confirm: true
        },
        addRoleForm:{},
        addRoleRule:{
            name: {required: true, message: '请输入角色名称' },
        },
        selectedRole: '',
        roleList: [],
        customerTable: [],
        powerList: [],//权限列表
        checkedPowerList:[],//已有的权限列表
        radio: '',
        UserDialogTitle: ''
      };
    },
    created() {
      this.$store.commit("setActiveTab", "/system");
      this.getRoleList();
    },
    methods: {
      getRoleList(){//获取角色列表
            this.$axios.get('role/query')
            .then((res) => {
               this.roleList = res.rows;
               if(res.rows.length > 0){
                   this.getCustomerList([res.rows[0].id]);
                   this.getPowerList([res.rows[0].id]);
                   this.$set(this.roleList[0], "checked", true);
                   this.selectedRole = res.rows[0].id;
               }
            });
      },
      selectRole(pid) {//选择角色
        for (let i = 0; i < this.roleList.length; i++) {
          if (this.roleList[i].id == pid) {
            this.$set(this.roleList[i], "checked", true);
          } else {
            this.$set(this.roleList[i], "checked", false);
          }
        }
        this.selectedRole = pid;
      },
      addRole(){//添加角色
        this.$refs['roleForm'].validate((valid) => {
            if(valid){
                this.$axios.post('role/add',this.addRoleForm)
                .then(() =>{
                    this.addRoleDialog = false;
                    this.$Message.success('添加成功');
                    this.getRoleList();
                });
            }
        });
      },
      deleRole(){//删除角色
          if(this.selectedRole){
              this.$axios.delete('role/delete/'+this.selectedRolus)
              .then(() => {
                  this.$Message.success('删除成功');
                  this.getRoleList();
              });
          }else{
              this.$Message.error('请选择一个角色');
          }
      },
      getCustomerList(roleId){//查询用户列表
        this.$axios.get('customer/query?roleId='+roleId)
        .then((res) => {
            this.customerTable = res.rows
        });
      },
      getPowerList(roleId){//权限列表
        this.$axios.get('role/grantRoleList/'+roleId)
        .then((res) => {
            for(var key in res.rows.rolePerMap){
                this.powerList.push({
                    name: key,
                    list: res.rows.rolePerMap[key]
                });
                for(var i = 0;i<res.rows.rolePerMap[key].length;i++){
                    if(res.rows.rolePerMap[key][i].checked){
                        this.checkedPowerList.push(res.rows.rolePerMap[key][i].permissionId);
                    }
                }
            }
        });
      },
      openPower(value){
        for(var i = 0;i<this.powerList.length;i++){
            this.$set(this.powerList[i],'checked',false);
        }
        for(var i = 0;i<value.length;i++){
            for(var j = 0;j<this.powerList.length;j++){
                if(value[i] == this.powerList[j].name){
                this.$set(this.powerList[j],'checked',true);
                }
            }
        }
      },
      setPower(i,j){
          var powerObj = this.powerList[i].list[j]
          if(powerObj.checked){
              this.checkedPowerList.push(powerObj.permissionId);
          }else{
              for(var i = 0;i<this.checkedPowerList.length;i++){
                  if(this.checkedPowerList[i] == powerObj.permissionId){
                      this.checkedPowerList.splice(i,1);
                  }
              }
          }
          this.$axios.post('role/grantRole/'+this.selectedRole,{perId: this.checkedPowerList})
          .then(() => {
          });
      },
      updateUser() {
          if(this.radio){
              this.customerTable.map((c,i) => {
                if(this.radio == this.customerTable[i].id){
                    this.$store.commit("setUserForm",this.customerTable[i]);
                    this.$store.commit("openUserDialog");
                }
              })
              this.UserDialogTitle = "修改人员信息";
          }else{
              this.$Message.error('请选择一个用户');
          }
      },
      addUser(){
          this.UserDialogTitle = "新增用户";
          this.$store.commit("clearUserForm");
          this.$store.commit('openUserDialog');
      },
      setUser(){
        if(this.$store.state.userform.id){//编辑
            this.$axios.put('/customer/update',this.$store.state.userform)
            .then(() =>{
                this.$Message.success('修改成功!');
            });
        }else{//新增
            this.$axios.post('customer/add',this.$store.state.userform)
            .then(() =>{
                this.$Message.success('添加成功!');
            });
        }
      },
      deleUser(){
          if(this.radio){
            this.$axios.delete('/customer/delete/'+this.radio)
            .then(() =>{
                this.$Message.success('删除成功!');
                this.getCustomerList(this.selectedRole);
            });
          }else{
              this.$Message.error('请选择一个用户');
          }
      }
    }
  };

</script>
