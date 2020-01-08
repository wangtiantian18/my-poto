<template>
  <div class="page-index">
    <el-row>
      <el-col :span=5>
        <Emenu></Emenu>
      </el-col>
      <el-col :span=19>
        <life></life>  
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=24>
        <artistic></artistic>    
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu'
import Life from '@/components/index/life'
import Artistic from '@/components/index/artistic'
export default {
  components: {
    Emenu,
    Life,
    Artistic
  }
}
</script>

<style lang="scss">
@import '@/assets/css/index/index.scss';
</style>
