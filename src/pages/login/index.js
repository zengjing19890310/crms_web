require('../../common/common');
require('./index.scss');
let loginCheck = require('../../../static/loginCheck');

let checkUser = (rule, value, callback) => {
    if(value===''){
        callback(new Error('用户名不能为空!'));
    }else{
        callback();
    }
};

let checkPsw = (rule, value, callback) =>{
    if(value===''){
        callback(new Error('密码不能为空!'));
    }else{
        callback();
    }
};


let app = new Vue({
    el:'#app',
    data:{
        loginForm:{
            user:'',
            psw:''
        },
        rules:{
            user:[
                {validator:checkUser,trigger:'blur'}
            ],
            psw:[
                {validator:checkPsw,trigger:'blur'}
            ]
        }
    },
    methods:{
        login (formName){
            // console.log('登录');
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    if(loginCheck(this.loginForm)){
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            duration: 3000,
                            onClose: ()=>{
                                window.location.href='../homepage';
                            }
                        });
                    }else{
                        this.$message({
                            message: '登录失败!',
                            type: 'error',
                            duration: 3000
                        });
                    }
                } else {
                    this.$message({
                        message: '输入有误!',
                        type: 'error',
                        duration: 3000
                    });
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        reset (formName){
            this.$refs[formName].resetFields();
        }
    }
});