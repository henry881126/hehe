<template>
  <div>
    <form-view
      labelWidth="80px"
      :searchData="searchData"
			:rules='Rules'
			ref="form"
			:formRef = "formRef"
      :searchForm="searchForm"
      :searchHandle="searchHandle"
    ></form-view>
  </div>
</template>
<script>
let sexs = [
  { label: "男", value: "M" },
  { label: "女", value: "F" },
];
let sexProps = { label: "label", value: "value" };
let intersts = [
  { label: "羽毛球", value: "badminton" },
  { label: "篮球", value: "basketball" },
  { label: "足球", value: "football" },
  { label: "兵乓球", value: "pong" },
];

let interstProps = { label: "label", value: "value" };

export default {
  data() {
    return {
      searchData: {
        name: null,

        age: null,

        sex: null,

        date: "",

        interst: [],
      },
			formRef:"inlineForm",
      searchForm: [
        {
          type: "Input",
          label: "姓名",
          prop: "name",
          width: "220px",
          placeholder: "请输入姓名",
        },

        {
          type: "Input",
          label: "年龄",
          prop: "age",
          width: "220px",
          placeholder: "请输入年龄",
        },

        {
          type: "Date",
          label: "日期",
          prop: "date",
          width: "220px",
          placeholder: "请选择日期",
        },

        {
          type: "Select",
          label: "性别",
          prop: "sex",
          width: "220px",
          options: sexs,
          props: sexProps,
          change: (row) => "",
          placeholder: "请选择性别",
        },

        {
          type: "Checkbox",
          label: "爱好",
          prop: "interst",
          checkboxs: intersts,
          props: interstProps,
        },
      ],

      searchHandle: [
        {
          label: "查询",
          type: "primary",
          handle: () => this.searchHandleForm(this.formRef),
        },

        { label: "重置", type: "primary", handle: () => this.resetForm(this.formRef) },
      ], 
			// 表单验证
      Rules: {
        name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
      },
    };
  },

  methods: {
		async resetForm(formName){
			await this.$refs["form"].$refs[formName].resetFields();
		},
    async searchHandleForm(formName) {
      // console.log("searchHandle");
			await this.$refs["form"].$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
    },
  },
};
</script>