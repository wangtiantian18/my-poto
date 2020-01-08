<template>
    <div class="m-menu">
        <dl class="nav" @mouseleave="mouseleave">
            <dt>全部分类</dt>
            <dd v-for="(item,index) in menu" :key="index" @mouseenter="mouseenter(item.type)">
                <i :class="item.type"></i>{{ item.title }}<span class="arraw"></span>
            </dd>
        </dl> 
        <div class="detail" v-if="kind" @mouseenter="sover" @mouseout="sout">
            <div v-for="(item,index) in currentDetail.child" :key="index">
                <h4 class="title" >{{ item.title }}</h4>
                <span v-for="(v,i) in item.child" :key="i">{{ v }}</span>
            </div>

        </div>      
    </div>
</template>
<script>
export default {
    data() {
        return {
            kind: '',
            change:false,
            menu:[{
                type: 'food',
                title: '美食',
                child: [{
                    title: '传统美食',
                    child: ['蒸羊羔', '蒸鹿邑', '烧花鸭', '烧子鹅', '琉璃丸子', ]
                },{
                    title: '西方美食',
                    child: ['牛排', '鹅肝', '红酒', '松露', '鱼子酱' ]
                }]
            },{
                type: 'movie',
                title: '电影',
                child: [{
                    title: '最近热映',
                    child: ['伟大的愿望', '哪吒传奇', '白蛇缘起', '山炮进城' ]
                },{
                    title: '海外大片',
                    child: ['生化危机1', '生化危机1', '生化危机1', '生化危机1', '生化危机1', ]
                }]
            },{
                type: 'hotel',
                title: '居住',
                child: [{
                    title: '民宿',
                    child: ['民宿', '民宿', '民宿', '民宿', '民宿', ]
                },{
                    title: '酒店',
                    child: ['酒店', '酒店', '酒店', '酒店', '酒店', ]
                }]
            },{
                type: 'takeout',
                title: '出行',
                child: [{
                    title: '汽车',
                    child: ['滴滴', '滴滴', '滴滴', '滴滴', '滴滴', ]
                },{
                    title: '自行车',
                    child: ['摩拜单车', '摩拜单车', '摩拜单车', '摩拜单车', '摩拜单车', ]
                }]
            }]
        }
    },
    computed: {
        currentDetail(){
            return this.menu.filter((item)=>{
                return item.type===this.kind
            })[0]
        }
    },
    watch: {

    },
    methods: {
        mouseleave(){
            setTimeout(()=>{
                if(!this.change){
                    this.kind='';
                }
            },150)
        },
        mouseenter(type){
            this.kind=type
        },
        sover(){
            this.change=true;
        },
        sout(){
            this.change=false;
            this.kind='';
        }
    },
}
</script>
<style lang="scss" scope> 
    
</style>