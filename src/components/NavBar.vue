<template>
	<el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
	background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
	  <el-menu-item index="1">Employbl Store</el-menu-item>
	  <el-submenu index="2">
	    <template slot="title">Dropdown Items</template>
	    <el-menu-item index="2-1">
				<nuxt-link to="/Countries">Countries</nuxt-link>
			</el-menu-item>
	    <el-menu-item index="2-2">item two</el-menu-item>
	    <el-menu-item index="2-3">item three</el-menu-item>
	  </el-submenu>
	  <el-menu-item index="3">
      <nuxt-link to="/Countries">Countries</nuxt-link>
    </el-menu-item>
	</el-menu>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
