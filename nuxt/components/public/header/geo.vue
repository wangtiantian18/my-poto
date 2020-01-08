<template>
    <div class="m-geo">
        <i class="el-icon-location"></i>北京市
        <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>[天津 东丽区]
    </div>
</template>
<style lang="scss" scoped>
.m-geo {
    color: #666;
    font-size: 12px;
    .changeCity {
        background: #f4f4f4;
        border: 1px solid #e5e5e5;
        border-radius: 2px;
        color: #666;
        margin: 0 4px;
        padding: 0 2px;
        &:hover {
            color: #31bbac;
        }
    }
    .username {
        color: #31bbac;
        cursor: pointer;
    }
    .login,
    .register {
        font-size: 12px;
        line-height: 40px;
        color: #999;
        margin: 0 5px;
        &.login {
            color: #31bbac;
            margin: 0 5px 0 20px;
        }
        &:hover {
            color: #31bbac;
        }
    }
}
</style>

