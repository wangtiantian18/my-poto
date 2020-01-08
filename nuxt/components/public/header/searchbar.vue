<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <el-col :span="3" class="left">
                <img src="" alt />
            </el-col>
            <el-col :span="15" class="center">
                <div class="wrapper">
                    <el-input placeholder="搜索商家或地点" v-model="search"
                    @focus="focus" @blur="blur"></el-input>
                    <button class="el-button el-button--primary">
                        <i class="el-icon-search"></i>
                    </button>
                    <dl class="hotPlace" v-if="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(item,index) in hotPlace" :key="index">{{item}}</dd>
                    </dl>
                    <dl class="searchList" v-if="isSearchList">
                        <dd v-for="(item,index) in searchList" :key="index">{{item}}</dd>
                    </dl>
                </div>
                <p class="suggset">
                    <a href="#">故宫博物院</a>
                    <a href="#">故宫博物院</a>
                    <a href="#">故宫博物院</a>
                    <a href="#">故宫博物院</a>
                </p>
                <ul class="nav">
                    <li>
                        <nuxt-link class="takeOut" to="/">美团外卖</nuxt-link>
                        <nuxt-link class="movie" to="/">猫眼电影</nuxt-link>
                        <nuxt-link class="hotel" to="/">美团酒店</nuxt-link>
                        <nuxt-link class="apartment" to="/">公寓/民宿</nuxt-link>
                        <nuxt-link class="business" to="/">商家入驻</nuxt-link>
                    </li>
                </ul>
            </el-col>
            <el-col :span="6" class="right">
                <ul class="security">
                    <li>
                        <i class="refund" />
                        <p class="txt">随时退</p>
                    </li>
                    <li>
                        <i class="single" />
                        <p class="txt">不满意免单</p>
                    </li>
                    <li>
                        <i class="overdue" />
                        <p class="txt">过期退</p>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isFouse: false,
            search: '',
            hotPlace:['火锅','火锅','火锅','火锅','火锅',],
            searchList:['火锅','火锅','火锅','火锅','火锅',],
        }
    },
    computed: {
        isHotPlace(){
            return this.isFouse&&!this.search
        },
        isSearchList(){
            return this.isFouse&&this.search
        }
    },
    watch: {
        search(n,o){
            if(n===o) return
            console.log(n)
        }
    },
    methods: {
        focus(){
            this.isFouse = true;
        },
        blur(){
            this.$nextTick(()=>{
                this.isFouse = false;
            })
        }
    },
};
</script>
