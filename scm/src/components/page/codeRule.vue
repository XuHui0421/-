<template>
  <div class="container">
    <div class="list-wrap">
      <div class="container-head">
        <div class="container-head-lf">
          <div class="container-header-search">
            <el-input placeholder="请输入关键字查询" class="input-radius" v-model="keyword">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <el-button type="primary" class="btn-search" round @click="getCodeList">高级搜索</el-button>
        </div>
        <div class="container-head-rt">
          <el-button type="primary" size="mini" round class="mr10" @click="editCodeRule">修改</el-button>

        </div>
      </div>
      <div class="container-list ">
        <el-table ref="multipleTable" :data="codeTable" class="table">
          <el-table-column>
            <template scope="scope">
              <el-radio v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="名称"></el-table-column>
          <el-table-column prop="keyCode" label="编码"></el-table-column>
          <el-table-column prop="serialNoValue" label="序列号"></el-table-column>
          <el-table-column prop="serialNoLength" label="序列号长度"></el-table-column>
          <el-table-column prop="detail" label=""></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @current-change="currentChange" @prev-click="currentChange" @next-click="currentChange" :current-page.sync="paging.currentPage" :page-sizes="[10,20,50]" :page-size="10" layout="prev, pager, next, total,jumper"
            :total="paging.total" background>
          </el-pagination>
          <el-button class="btn-pagination">确认</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="修改" :visible.sync="editDialog" width="30%">
      <div class="dialog-body">
        <el-form :model="editForm" :rules="editRule"  ref="editForm" label-position="left" label-width="90px">
          <el-form-item label="名称" prop="title">
            <el-input v-model="editForm.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="keyCode">
            <el-input v-model="editForm.keyCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="序列号" prop="serialNoValue">
            <el-input v-model="editForm.serialNoValue" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="序列号长度" prop="serialNoLength">
            <el-input v-model="editForm.serialNoLength" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editCodeRuleSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        editDialog: false,
        codeTable: [],
        paging: {
          total: 0,
          pageSize: 10,
          offset: 1,
          currentPage: 0 //当前页数
        },
        radio: '',
        editForm: {},
        editRule: {},
        keyword: ''
      };
    },
    created() {
      this.$store.commit("setActiveTab", "/system");
      this.getCodeList();
    },
    methods: {
         currentChange(value){
            this.paging.offset = value;
            this.getCodeList();
        },
      getCodeList() {
        this.$axios.get('coderule/query',{params:{
            keyword: this.keyword,
            offset: this.paging.offset
        }})
          .then((res) => {
            this.codeTable = res.rows;
            this.paging.total = res.total;
          })
      },
      editCodeRule(){
        if(this.radio){
            this.editDialog = true;
            this.codeTable.map((c,i) => {
                if(c.id == this.radio){
                    this.editForm = this.codeTable[i];
                }
            })
        }else{
            this.$Message.error('请选择一条编码!');
        }
      },
      editCodeRuleSure(){//修改编码规则
        this.$refs["editForm"].validate((valid) => {
            if(valid){
                this.$axios.put('coderule/update',this.editForm)
                .then(() => {
                    this.editDialog = false;
                    this.getCodeList();
                    this.$Message.success('修改成功!');
                });
            }
        });
      }
    }
  };
</script>
