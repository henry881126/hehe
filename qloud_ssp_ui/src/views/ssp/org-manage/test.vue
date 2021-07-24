<template>
  <div class="app-container">
    <div class="filter-container filter-box">
      <span v-if="resourcePermissions.hasUserQuery" >搜索：</span>
      <el-select v-if="resourcePermissions.hasUserQuery"  v-model="listQuery.searchKey" placeholder="-请选择-" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-input v-if="resourcePermissions.hasUserQuery"  v-model="listQuery.searchValue" placeholder="输入关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-if="resourcePermissions.hasUserQuery" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-if="resourcePermissions.hasUserAdd" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >    
    <!-- :default-sort = "{prop: 'id', order: 'ascending'}" -->
      <el-table-column label="序号" type="index" align="center" sortable  show-overflow-tooltip width="80px">
      </el-table-column>
      <el-table-column label="角色编号" prop="roleId" sortable  min-width="120" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roleId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName"  sortable  min-width="100">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色描述" sortable prop="roleDescribe"  min-width="100" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roleDescribe }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否管理员" width="100">
        <template slot-scope="{row}">
          <span>{{ row.roleType | roletypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" sortable prop="createTime"   align="center"  min-width="110">
        <template slot-scope="{row}">
           <span>{{ row.createdStamp }}</span>
        </template>    
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="220" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="resourcePermissions.hasUserEdit" type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-if="resourcePermissions.hasUserDelete"  size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
   <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 380px; margin:auto;">
        <el-form-item label="角色编号" prop="roleId">
           <el-input v-model="temp.roleId" placeholder="请输入角色编号" />
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="temp.roleName"  placeholder="请输入角色名称" />
        </el-form-item>
          <el-form-item label="是否管理员" prop="isManager">
            <el-radio-group v-model="temp.isManager">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDescribe">
          <el-input type="textarea" :rows="5" v-model="temp.roleDescribe" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { fetchRoleList,createRole, updateRole, deleteRole, resetPasword,updateRoleStatus } from '@/api/dap/basemodel/role'
import { checkresourcePermission } from '@/utils/resource-permission'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' 

const calendarTypeOptions = [
  { key: 'user_id', display_name: 'ID' },
  { key: 'username', display_name: '账号' },
  { key: 'nick_name', display_name: '用户名' },
  { key: 'mobile', display_name: '手机号' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'UserList',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      let st = "";
      if(status === true){
        st="正常"
      }else{
        st="锁定"
      }
      return st;
    },
    sexFilter(roleType){
      const sexMap = {
        0: '男',
        1: '女',
      }
      return sexMap[sex]
    },
    roletypeFilter(type){
      const roletypeMap = {
       '': '否',
        2: '是',
      }
      return roletypeMap[type]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    },
    timeFilter(time){
      return parseTime(time,'{y}-{m}-{d} {h}:{i}')
    }
  },
  data() {
    return {
      resourcePermissions:{
        hasUserQuery:checkresourcePermission("user_query"),
        hasUserDelete:checkresourcePermission("user_delete"),
        hasUserEdit:checkresourcePermission("user_edit"),
        hasUserAdd:checkresourcePermission("user_add"),
        hasUserResetPassword:checkresourcePermission("user_reset_password"),
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        searchValue: undefined,
        searchKey: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      allRolesOptions: [],
      temp: {
        roleId: '',
        roleName: '',
        isManager: "",
        roleDescribe: '',
        namemm:''
      },
      commonHeader: {
        Header:{
              SourceSysId: "1", 
              ConsumerId: "1", 
              ServiceCode: "1", 
              TranCode: "1", 
              GlobalSeq: "1", 
              TranSeq: "1", 
              Channel: "1", 
              BranchId: "1", 
              TranTeller: "100001", 
              AuthFlag: "1", 
              TranDate: "20180821", 
              TranTime: "230651354", 
              LocalLang: "1", 
              LegalRepCode: "1", 
              PageStart: "0",
              PageEnd: "1",
              TotalNum: "10",
              PageTotalNum:"10",
              CurrentPageNum:"1"
          }
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改角色',
        create: '添加角色'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        nickname: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5a-z]+$/gi, message: '不能含有特殊字符', trigger: 'change'}
        ],
        // username: [{ required: true, message: '账号不能为空', trigger: 'change' }],
        // mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true;
      let tempObj = Object.assign({},this.commonHeader, this.listQuery);
      fetchRoleList(tempObj).then(response => {
        this.list = response.roleListInfo
        this.total = parseInt(response.Header.TotalNum)
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        roleId: '',
        roleName: '',
        isManager: '',
        roleDescribe: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let tempObj = Object.assign({},this.commonHeader, this.temp);
          //tempObj.isManager = tempObj.isManager+"";
          tempObj.isManager = "0";
          createRole(tempObj).then((data)=>{
            this.getList();
            this.dialogFormVisible = false
                this.$notify({
                title: 'Success',
                message: '创建成功',
                type: 'success',
                duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      let temp = Object.assign({}, row) // copy obj
      let currroles = [];
     /*  if(temp.roles){
        temp.roles.map(item => {
          currroles.push(item.id)
        })
        temp.roles = currroles
      } */
      this.temp = temp;
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let tempObj = Object.assign({},this.commonHeader, this.temp);
          //tempObj.isManager = tempObj.isManager+"";
          tempObj.isManager = "0";
          updateRole(tempObj).then(() => {
            this.getList();
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('确定删除该角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let tempObj = Object.assign({},this.commonHeader, this.temp);
          tempObj.roleId = row.roleId;
        deleteRole(tempObj).then(() => {
          this.getList();
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除操作'
        });          
      });
    },
    formatJson(filterVal) {
        return this.list.map(v => filterVal.map(j => {
          if (j === 'createTime') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
    },
    changeEnable(row){
      let parma = {
        id:row.id,
        enabled:row.enabled
      }
      updateRoleStatus(parma).then((response) => {
         if(response.statusCode === 200){
          this.getList();
          this.$notify({
            title: 'Success',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
        this.dialogFormVisible = false  
      })
    }
  }
}
</script>

<style scoped>
.filter-box{
  padding: 0 0 20px 0;
}
.el-table td, .el-table >>> th.is-leaf {
    border-bottom: 1.2px solid #EBEEF5;
}
</style>
