<template>
	<div h-60px px-15px flex items-center justify-between border-b border-gray-200>
		<div flex items-center>
			<div text-gray-400 p-4px flex items-center justify-center bg-gray-100 rounded-sm cursor-pointer
				hover:text-blue-400 hover:bg-gray-200 mr-5 @click="menuStore.setCollapse()">
				<el-icon class="collapse-icon" text-16px>
					<component :is="isCollapse ? 'expand' : 'fold'"></component>
				</el-icon>
			</div>
			<el-breadcrumb>
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>超级表格</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div flex items-center>
			<!-- username -->
			<span text-14px text-gray-500 mr-2>Geeker</span>
			<!-- usercenter -->
			<el-dropdown trigger="click">
				<div w-40px h-40px i-carbon-user-avatar-filled />
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click.native="openDialog('infoRef')">个人资料</el-dropdown-item>
						<el-dropdown-item @click.native="openDialog('passwordRef')">修改密码</el-dropdown-item>
						<el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<!-- infoDialog -->
		<InfoDialog ref="infoRef"></InfoDialog>
		<!-- passwordDialog -->
		<PasswordDialog ref="passwordRef"></PasswordDialog>
	</div>
</template>

<script setup lang="ts">
import { MenuStore } from "~/store/modules/menu";
import InfoDialog from "./components/infoDialog.vue";
import PasswordDialog from "./components/passwordDialog.vue";

const menuStore = MenuStore();
const isCollapse = computed((): boolean => menuStore.isCollapse);
const route = useRoute();
console.log(route.matched);

// logout
const logout = () => {
	ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "OK",
		cancelButtonText: "Cancel",
		type: "warning"
	}).then(() => {
		// router.push({ name: "login" });
		ElMessage({
			type: "success",
			message: "退出登录成功！"
		});
	});
};

interface DialogExpose {
	openDialog: () => void;
}

const infoRef = ref<null | DialogExpose>(null);

const passwordRef = ref<null | DialogExpose>(null);

// openDialog
const openDialog = (refName: string) => {
	if (refName == "infoRef") return infoRef.value?.openDialog();
	passwordRef.value?.openDialog();
};
</script>