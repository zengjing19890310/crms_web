require('../../common/common');
require('./index.scss');

import {ModelObj} from 'vue-3d-model';

let app = new Vue({
    el:'#app',
    components:{
        ModelObj
    }
});