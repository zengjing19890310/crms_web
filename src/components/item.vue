<template>
    <div class="itemContainer" :style="{marginLeft:(4/6)+'%',marginRight:(4/6)+'%'}" @mouseleave="hideOverlay">
        <div class="frame">
            <transition name="fade">
                <div class="overlay" @mouseleave="hideOverlay" v-show="overlay" @click="showModal">
                    这里显示一些该文物的基础信息<br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consequuntur culpa dolorum expedita iste laborum magni modi nam nisi quia, quibusdam recusandae sapiente voluptatem? Et iure natus nobis quidem voluptates?
                </div>
            </transition>
            <img :src="url" alt="图片无法正常显示" @mouseenter="showOverlay"  @click="showModal">
            <div v-show="url==='../../uploads/default.png'" style="position: absolute;top:18px;left:18px;color:#999999;font-size:14px;z-index:20;">
                3D效果.obj格式
            </div>
            <footer>
                <span class="eye" @click.self.stop="eye">{{focus}}</span>
                <span class="talk" @click.self.stop="talk">{{comment}}</span>
                <span class="heart" @click.self.stop="heart">{{fav}}</span>
            </footer>
        </div>
        <footer class="userInfo">
            <p>
                <img class="userIcon"  :src="user.pic"/>{{user.name}} <b> ( {{time}} ) </b>
            </p>
        </footer>
    </div>
</template>
<script>
    export default {
        props:['path','user','id','focus','comment','fav','time'],
        data () {
            return {
                overlay:false,
                url:'../../uploads/default.png'
            }
        },
        created (){
            let reg = /.obj$/ig;
            if(reg.test(this.path)){
                return false;
            }
            this.url = this.path;
        },
        methods:{
            showOverlay (){
                this.overlay = true;
            },
            hideOverlay (){
                let me = this;
                setTimeout(function(){
                    me.overlay = false;
                },0);
            },
            showModal (){
                this.$emit('show-detail');
            },
            eye (e){
//                e.stopPropagation();
                console.log('关注',this.id);
            },
            talk (e){
//                e.stopPropagation();
                console.log('评论',this.id);
            },
            heart (e){
//                e.stopPropagation();
                console.log('喜欢',this.id);
            }
        }
    }
</script>
<style lang="scss" scoped>
    $row-col-4:32%;
    .itemContainer{
        width:$row-col-4;
        margin-bottom: 30px;
        /*border:1px solid red;*/
        float:left;
        .frame{
            position: relative;
            border-radius:2px;
            background-color:#ffffff;
            box-shadow: 0 1px 2px rgba(0,0,0,0.07);
            .overlay{
                position:absolute;
                top:5%;
                left:5%;
                right:5%;
                height:140px;
                background-color :#ffffff;
                font-size:12px;
                color:#aaa;
                padding:5px;
                cursor:pointer;
                z-index:25;
                /*border:1px solid red;*/
            }
            img {
                height:140px;
                width:90%;
                margin:5%;
            }
            footer{
                padding:10px;
                font-size:12px;
                color:#aaa;
                text-align: right;
                span{
                    padding-left:16px;
                    line-height:12px;
                    cursor: pointer;
                    &.eye{
                        background:url(../common/images/eye.png) no-repeat 0 3px;
                    }
                    &.talk{
                        background:url(../common/images/talk.png) no-repeat 0 3px;
                        &:hover{
                            background-position: 0 -13px;
                        }
                    }
                    &.heart{
                        background:url(../common/images/heart.png) no-repeat 0 3px;
                        &:hover{
                            background-position: 0 -14px;
                        }
                    }
                }
            }
        }
        footer.userInfo{
            font-size:13px;
            color:#3a8bbb;
            cursor:pointer;
            padding:10px 0 5px 5px;
            &:hover{
                color:#1e6189;
            }
            p{
                height:16px;
                line-height: 16px;
                .userIcon{
                    width:16px;
                    height:16px;
                    border-radius: 50%;
                    vertical-align: bottom;
                    margin-right: 5px;
                }
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .25s ease;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0;
    }
</style>