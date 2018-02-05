<template>
  <div>
      <p class="title">
        <span>个人信息</span>
        <span class="edit" @click="edit" v-if="showSafeStatus" v-text="editsave"></span>
      </p>
      <div class="base-info">
        <p><label>头像</label><img :src="baseInfo.head" alt="headImg"></p>
        <p><label>id</label><span>{{baseInfo.uid}}</span></p>
        <p><label>nick</label>
          <span
            ref="nick"
            :contenteditable="contentStatus"
            :class="{editing:contentStatus,noediting:!contentStatus}">{{baseInfo.nick}}</span></p>
        <p><label>邮箱</label>
          <span
            ref="email"
            :contenteditable="contentStatus"
            :class="{editing:contentStatus,noediting:!contentStatus}">{{baseInfo.email}}</span></p>
        <p><label>公司</label>
          <span
            ref="company"
            :contenteditable="contentStatus"
            :class="{editing:contentStatus,noediting:!contentStatus}">{{baseInfo.company}}</span></p>
        <p><label>职业</label>
          <span
            ref="job"
            :contenteditable="contentStatus"
            :class="{editing:contentStatus,noediting:!contentStatus}">{{baseInfo.job}}</span></p>
        <p><label>学历</label>
          <span
            ref="edu"
            :contenteditable="contentStatus"
            :class="{editing:contentStatus,noediting:!contentStatus}">{{baseInfo.edu}}</span></p>
      </div>
      <p class="count-tite" v-if="showSafeStatus">账号安全</p>
      <div class="count-safe clearfix" v-if="showSafeStatus">
        <p><label class="count-safe-label">修改密码</label><span class="count-safe-data"></span></p>
        <p><label class="count-safe-label">修改手机号</label><span class="count-safe-data">{{baseInfo.phone}}</span></p>
        <p><label class="count-safe-label">关注微信小程序</label><span class="count-safe-data"></span></p>
      </div>
      <p class="login-out" @click="logout" v-if="logoutStatus">退出登录</p>
    </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      editsaveStatus: 0,
      editsave: "编辑",
      baseInfo: {},
      showSafeStatus: 0,
      contentStatus: false,
      logoutStatus:0
    };
  },
  created() {
    window.scrollTo(0, 0);
    let cacheUid = localStorage.getItem("uid");
    cacheUid?this.logoutStatus = 1:null;
    this.$route.params.uid === localStorage.getItem("uid")
      ? (this.showSafeStatus = 1)
      : null;
    let url = `${this.api}/user/getbase.php`;
    let uid = this.$route.params.uid || cacheUid

    axios({
      method: "get",
      url,
      params: {
        uid,
        v: this.rand
      }
    }).then(res => {
      if (res.data.code === 0) {
        let { data } = res.data;
        this.baseInfo = Object.assign({}, data);
      }
    });
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
    edit() {
      if (!this.editsaveStatus) {
        this.contentStatus = true;
        this.editsave = "保存";
      } else {
        let nick = this.$refs.nick.innerText;
        let email = this.$refs.email.innerText;
        let company = this.$refs.company.innerText;
        let job = this.$refs.job.innerText;
        let edu = this.$refs.edu.innerText;
        console.log(nick, email, company, job, edu);
        if (nick && email && company && job && edu) {
          if (
            !new RegExp(
              "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
            ).test(email)
          ) {
            this.$message({
              message: "邮箱格式不正确!",
              type: "error",
              center: true
            });
          } else {
            let self = this
            let url = `${this.api}/moduserinfo.php`;
            let uid = localStorage.getItem('uid');
            axios({
              method: "post",
              url,
              params: {
                uid,
                nick,
                email,
                company,
                job,
                edu,
                v: this.rand
              }
            })
              .then(res => {
                this.$message({
                  message: "成功修改!",
                  type: "success",
                  center: true
                });
                this.contentStatus = false;
                this.editsave = "编辑";
              })
              .catch(err => {});
          }
        } else {
          this.$message({
            message: "请填写完整!",
            type: "error",
            center: true
          });
        }
      }
      this.editsaveStatus = !this.editsaveStatus;
    }
  }
};
</script>
<style lang='scss' scoped>
* {
}

.title {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  color: #409eff;
  text-align: center;
  border-bottom: 1px #409eff solid;
  position: relative;
  & > i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    padding: 0 20px;
  }
}
.edit {
  position: absolute;
  top: 0;
  right: 20px;
  font-size: 14px;
  color: #a05b6e;
}
.base-info {
  font-size: 16px;
  line-height: 50px;
  padding: 0 15px 0;
  background: #fff;
  & > p {
    overflow: hidden;
    border-bottom: 1px #edefff solid;
    & > label {
      display: inline-block;
      width: 50px;
    }
    & > img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      float: right;
      margin-top: 5px;
    }
    & > span {
      float: right;
      padding: 0 10px 0;
    }
  }
}
.count-tite {
  font-size: 16px;
  line-height: 50px;
  padding-left: 15px;
}
.count-safe {
  font-size: 16px;
  width: 100%;
  line-height: 50px;
  background: #fff;
  padding: 0 15px 0;
  & > p {
    border-bottom: 1px #edefff solid;
    overflow: hidden;
  }
  .count-safe-label {
    float: left;
  }
  .count-safe-data {
    float: right;
  }
}
.login-out {
  line-height: 50px;
  background: #ff615b;
  margin-top: 10px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  letter-spacing: 1px;
}
.noediting {
  color: grey;
}
.editing {
  color: red;
}
</style>
