require('../../common/common');
require('./index.scss');

import header from '../../components/header.vue';
import imageItem from '../../components/item.vue';
import { ModelObj } from 'vue-3d-model'

let id = 100000;

let tagColors = [
    '#F5CEDD',
    '#efacc7',
    '#e56e9c',
    '#d83373'
];

let  isExtObj = (path)=>{
    let reg = /.obj$/ig;
    return reg.test(path);
};

let app = new Vue({
    el:'#app',
    data:{
        keyword:'',
        keywordUpload:'',
        tabContentPanelHeight:0,
        orderType:{
            time:'asc',
            focus:'asc'
        },
        currIsObj:false,
        conditions:[
            '条件1',
            '条件2',
            '条件3',
        ],
        tagList:[
            {tagName:'标签1',heat:15},
            {tagName:'标签4',heat:10},
            {tagName:'标签2',heat:53},
            {tagName:'标签3',heat:110},
            {tagName:'标签5',heat:27},
            {tagName:'标签1',heat:24},
            {tagName:'标签41',heat:78},
            {tagName:'标签2',heat:14},
            {tagName:'标签3',heat:10},
            {tagName:'标签5',heat:55}
        ],
        tagSizeMax:20,
        tagSizeMin:12,
        tagHeatMax:null,
        tagHeatMin:null,
        itemList:[
            {
                id:1,
                name:'文物1',
                path:'../../uploads/hk/hk.obj',
                user:{name:'罗丹',pic:'../../uploads/user.jpg'},
                focus:651,
                comment:125,
                fav:927,
                same:'../../uploads/img1.jpg',
                time:'2017-07-29',
                share:3,
                collect:37,
                download:6,
            },
            {
                id:2,
                name:'文物2',
                path:'../../uploads/img1.jpg',
                user:{name:'曾竞',pic:'../../uploads/user.jpg'},
                focus:679,
                comment:1250,
                fav:971,
                same:'../../uploads/img2.jpg',
                time:'2017-07-28',
                share:18,
                collect:35,
                download:70
            },
            {
                id:3,
                name:'文物3',
                path:'../../uploads/img2.jpg',
                user:{name:'刘阳',pic:'../../uploads/user.jpg'},
                focus:365,
                comment:1225,
                fav:42,
                same:'../../uploads/img1.jpg',
                time:'2017-07-30',
                share:13,
                collect:37,
                download:16
            }
        ],
        catalogs: [{
            parent_id:0,
            id: 1,
            label: '一级 1',
            children: [{
                id: 101,
                label: '二级 1-1',
                children: [{
                    parent_id:101,
                    id: 10101,
                    label: '三级 1-1-1'
                }, {
                    parent_id:101,
                    id: 10102,
                    label: '三级 1-1-2'
                }]
            }]
        },{
            parent_id:0,
            id: 1,
            label: '一级 1',
            children: [{
                id: 101,
                label: '二级 1-1',
                children: [{
                    parent_id:101,
                    id: 10101,
                    label: '三级 1-1-1'
                }, {
                    parent_id:101,
                    id: 10102,
                    label: '三级 1-1-2'
                }]
            }]
        },{
                parent_id:0,
                id: 2,
                label: '一级 2',
                children: [{
                    parent_id:2,
                    id: 201,
                    label: '二级 2-1'
                }, {
                    parent_id:2,
                    id: 202,
                    label: '二级 2-2',
                    children:[{
                        parent_id:202,
                        id: 20201,
                        label: '三级 2-2-1'
                    },{
                        parent_id:202,
                        id: 20202,
                        label: '三级 2-2-2'
                    }
                    ]
                }]
            }],
        defaultProps: {
            children: 'children',//子节点属性
            label: 'label'//标签
        },
        checkedCatalog:[],
        editCatalog:false,
        currNodeLabel:null, //当前编辑的节点LABEL
        currNodeId:null,  //当前编辑的节点ID
        detailModal:false, //详情模态框是否显示
        detailId:null||'*', //详情对应ID
        detailZoom:false,  //详情图片缩放标志位
        isCollection:false, //当前详情是否被收藏
        detailTags:[],
        detailLock:false,
        currPanel:'历史版本',
        currDetail:null,
        preDetail:null,
        nextDetail:null,
        currDetailIndex:null,
        uploadInfo:{
            total:60,
            done:30
        },
        uploadModal:false,
        objLoadingStatus:true,//加载OBJ文件模态LOADING
        taskPanel:'正在上传',
        currPanelTasks:{
            "正在上传":9,
            "完成上传":20
        }
    },
    watch:{
        keyword (val){
            this.$refs.catalogs.filter(val);
        },
        keywordUpload (val){
            this.$refs.catalogsUpload.filter(val);
        }
    },
    created(){
        let arr = [];
        if(this.tagList&&this.tagList.length!==0){
            this.tagList.forEach(function(tag){
                if(tag.heat){
                    arr.push(tag.heat);
                }
            });
        }
        // console.log(arr);
        // console.log(_.max(arr),_.min(arr));
        this.tagHeatMax = _.max(arr);
        this.tagHeatMin = _.min(arr);
    },
    mounted(){
        // resizePage.call(this);
        // console.log(panels.height());
    },
    methods:{
        changePanel (panel){
            this.taskPanel = panel;
        },
        lockStatusChange (){
            this.detailLock = !this.detailLock;
        },
        preView (){
            this.currDetailIndex--;
            this.showDetail(this.currDetailIndex);
            // console.log('查看上一个详情');
        },
        nextView (){
            this.currDetailIndex++;
            this.showDetail(this.currDetailIndex);
            // console.log('查看下一个详情');
        },
        collect (){
            this.isCollection = !this.isCollection;
        },
        zoomChange (){
            this.detailZoom = !this.detailZoom;
        },
        showDetail (n){
            if (!n&&n!==0){
                return;
            }
            this.currDetailIndex = n;
            let len = this.itemList.length;
            if(n===0){
                this.preDetail = null;
                this.nextDetail = this.itemList[n+1];
            }else if(n===len-1){
                this.preDetail = this.itemList[n-1];
                this.nextDetail = null;
            }else{
                this.preDetail = this.itemList[n-1];
                this.nextDetail = this.itemList[n+1];
            }
            this.currDetail = this.itemList[n];
            this.currIsObj = isExtObj(this.currDetail.path);
            // console.log('显示详情模态框',n,this.itemList[n]);
            // this.detailId = n ;
            this.detailModal = true;
        },
        hideDetail (){
            this.detailModal = false;
        },
        showUpload (){
            this.uploadModal = true;
        },
        hideUpload (){
            this.uploadModal = false;
        },
        handleClose (item){
            //移除一个搜索条件
            this.conditions.splice(this.conditions.indexOf(item),1);
        },
        tagStyle (heat){
            let max = 18,
                min = 12,
                result = null,
                sizeRange = max - min ,
                heatRange = this.tagHeatMax-this.tagHeatMin,
                color = '';
            if(heat<=this.tagHeatMin){
                result = min;
                color = tagColors[0];
            }else if(heat>=this.tagHeatMax){
                result = max;
                color = tagColors[3];
            }else{
                let heatPercent = (heat-this.tagHeatMin)/heatRange;
                result = min + Math.round(heatPercent*sizeRange);
                if(heatPercent<0.5){
                    color = tagColors[1];
                }else{
                    color = tagColors[2];
                }
            }
            return 'font-size:'+result+'px;color:'+color+';';
        },
        filterNode (value, data){
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        filterUploadNode (value,data){
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleIconClick (){

        },
        handleCheckedChange (val){
            console.log(val);
        },
        changeOrderType (type){
            var curr = this.orderType[type];
            if(curr){
                if(curr === 'asc'){
                    this.orderType[type] = 'desc';
                    curr = 'desc';
                }else if(curr ==='desc'){
                    this.orderType[type] = 'asc';
                    curr = 'asc';
                }
                this.itemList.sort(function(a,b){
                    // console.log(a[type],b[type]);
                    let result = null;
                    if(type==='time'){
                        result = curr === 'asc'?(new Date(a[type]).getTime()-new Date(b[type]).getTime()):(new Date(b[type]).getTime()-new Date(a[type]).getTime());
                    }else{
                        result = curr === 'asc'?a[type]-b[type]:b[type]-a[type];
                    }
                    return result;
                });
            }
        },
        append(store, data,e) {
            e.stopPropagation();
            // var me = this;
            // console.log(store,data);
            // console.log(data);
            id++;
            store.append({ id: id, label: '新目录', children: [] }, data);
        },
        edit(store,data,e){
            e.stopPropagation();
            console.log(store,data);
            //当前编辑节点的ID
            this.currNodeId = data.id;
            this.currNodeLabel = data.label;
            this.editCatalog = true;
        },
        hideModal (e){
            // console.log(e);
            this.editCatalog = false;
        },
        submitEdit (){
            // console.log(this.currNodeId,this.currNodeLabel);
            this.hideModal();
        },
        remove(store, data,e) {
            e.stopPropagation();
            console.log(data);
            store.remove(data);
            console.log(store);
            console.log(this.catalogs.indexOf(data));
            console.log(this.catalogs);
        },
        clickNodeHandler (node, data,store){
            let elms = document.querySelectorAll('.el-button-group');
            if(elms&&elms.length!==0){
                elms.forEach((elm)=>{
                    elm.style.display = 'none';
                });
            }
            let el = store.$el.querySelector('.el-button-group');
            el.style.display = 'inline-block';
        },
        objLoading (){
            this.objLoadingStatus = false;
        },
        renderContent(h, { node, data, store }) {
            return h('span',{

            },[
                h('span', {
                    domProps: {
                        innerHTML: node.label
                    },
                }),
                h('span',{
                    'class':{
                        btns:true
                    }
                },[
                    h('el-button-group',{
                        style:{
                            transform:'scale(0.9)',
                            display:'none'
                        },
                        props:{
                            nodeid:node.id
                        }
                    },[
                        h('el-button',{
                            attrs:{
                                icon:'edit',
                                size:'mini'
                            },
                            'class':{
                                nodeHandle:true
                            },
                            on:{
                                click:(e)=>this.edit(store,data,e)
                            }
                        }),
                        h('el-button',{
                            attrs:{
                                icon:'plus',
                                size:'mini'
                            },
                            'class':{
                                nodeHandle:true
                            },
                            on:{
                                click:(e)=>this.append(store,data,e)
                            }
                        }),
                        h('el-button',{
                            attrs:{
                                icon:'minus',
                                size:'mini'
                            },
                            'class':{
                                nodeHandle:true
                            },
                            on:{
                                click:(e)=>this.remove(store,data,e)
                            }
                        }),
                    ])
                ])
            ]);
        }
    },
    components:{
        'header-cp':header,
        'image-item':imageItem,
        'model-obj':ModelObj
    }
});

function resizePage() {
    // var $parent = document.getElementsByClassName('userType');
    // console.log($parent[0].clientHeight);
    // var $panels = document.getElementsByClassName('tabContentPanel');
    // this.tabContentPanelHeight = $parent[0].clientHeight-42-30;
}
window.onresize = ()=>{
    // resizePage.call(app);
};

function seekTree(treeData){

}