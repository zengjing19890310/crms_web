<template>
    <header>
        <div class="title">
            文物数字资源管理系统
        </div>
        <div class="search">
            <el-input placeholder="请输入搜索内容..."
                      icon="search"
                      v-model="keyword"
                      :on-icon-click="handleIconClick"
                      size="small"
            >

            </el-input>
        </div>
        <!--添加用户信息-->
        <div class="userInfo">
            <!--用户头像-->
            <img :src="userPic" alt="用户头像无法正常显示">
            <!--用户名-->
            <div class="username" @mouseenter="showMenu" @mouseout="hideMenu">
                {{user}}
            </div>
            <!--系统菜单-->
            <el-collapse-transition>
                <ul class="systemMenu" v-show="menuStatus"  @mouseenter="showMenu" @mouseout="hideMenu">
                    <li @click="logout">注销</li>
                </ul>
            </el-collapse-transition>
        </div>
    </header>
</template>
<script>
export default {
    props:['color'],
    data () {
        return {
            app_name: '文物数字资源管理系统',
            keyword:'',
            user:'用户名字很长很长很长用户名字很长很长很长',
            userPic:require('../common/images/default.jpg'),
            menuStatus:false
        }
    },
    methods:{
        handleIconClick (){

        },
        showMenu (){
            this.menuStatus = true;
        },
        hideMenu (e){
            this.menuStatus = false;
        },
        logout (){
            this.$message({
                message: '注销登录!',
                type: 'warning',
                duration: 3000,
                onClose: ()=>{
                    window.location.href='../login';
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    $font-color:#DDDDDD;
    $bg-color:rgba(47, 47, 47, 0.98);
    header{
        height:70px;
        background-color: $bg_color;
        position: relative;
    }
    .title{
        color:$font-color;
        font-size:36px;
        line-height:70px;
        padding-left:20px;
    }
    div.search{
        width:200px;
        position: absolute;
        right:300px;
        top:20px;
    }
    div.userInfo{
        width:260px;
        position: absolute;
        top:0;
        bottom:0;
        right:0;
        z-index:10000;
        /*border:1px solid #ffffff;*/
        color:#ffffff;
        img{
            width:50px;
            height:50px;
            border-radius: 50%;
            vertical-align: middle;
            position: relative;
            top:10px;
        }
        div.username{
            position: absolute;
            left:60px;
            right:10px;
            top:0;
            bottom:0;
            line-height:70px;
            font-size:14px;
            color:$font-color;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            cursor:pointer;
        }
        .systemMenu{
            position: absolute;
            top:70px;
            left:0;
            right:0;
            color: $font-color;
            background-color: rgba(47, 47, 47, 0.98);
            li{
                cursor:pointer;
                text-align: center;
                line-height:30px;
                font-size:12px;
                border:1px solid $font-color;
                border-top:none;
                &:hover{
                    background-color:$font-color;
                    color:rgba(47, 47, 47, 0.98);
                    border:1px solid rgba(47, 47, 47, 0.98);
                }
            }
        }
    }
</style>