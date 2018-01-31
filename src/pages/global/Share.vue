<template>
  <div class="transition-box">
      <p  @click.stop="space">分享到</p>
      <ul @click.stop="space" v-if="!copyStatus">
        <li
          v-for="(shareList, index) in shareLists"
          :key="index"
          @click="shareTo(index)"
        >
          <img :src="shareList.icon" alt="shareIcon">
          <p>{{shareList.name}}</p>
        </li>
      </ul>
      <div v-show="copyStatus" class="copyBox">
        <p contenteditable="true" id="share-text" @click.stop="space">{{copyText}}</p>
        <p>
          <span
            @click="copy"
            class="copy-btn btn"
            data-clipboard-target="#share-text"
          >一键复制</span> 以上链接，将其狠狠的粘贴在你的朋友圈里！</p>
      </div>
      <p class="cancel-share">取消</p>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import bus from "@/store/Bus";

export default {
  props: ["allPosts"],
  data() {
    return {
      shareLists: [
        {
          name: "QQ",
          icon: "/static/img/share/qq.png"
        },
        {
          name: "微信",
          icon: "/static/img/share/wx.png"
        },
        {
          name: "朋友圈",
          icon: "/static/img/share/friend.png"
        },
        {
          name: "QQ空间",
          icon: "/static/img/share/zone.png"
        },
        {
          name: "微博",
          icon: "/static/img/share/weibo.png"
        }
      ],
      copyStatus: 0,
      copyText: ""
    };
  },
  created() {
    bus.$on("bodyClick", () => {
      this.copyStatus = 0;
    });
  },
  mounted() {
    const clipboard = new Clipboard('.btn');
  },
  methods: {
    space() {
      return false;
    },
    shareTo(index) {
      console.log(
        `${this.allPosts[index].nick}正在【拼起走网】, Ta邀请你在：【${
          this.allPosts[index].time
        }】, 一起来拼车哟~`
      );
      switch (index) {
        case 0:
          console.log("QQ");
          window.open(
            ` http://connect.qq.com/widget/shareqq/index.html?url=${
              this.url
            }&title=我正在【拼起走网】, 我邀请你在：【${
              this.allPosts[index].time
            }】, 一起来拼车哟~来看看节省一半费用的拼车神技！！`,
            "newwindow"
          );
          break;
        case 1:
          console.log("微信");
          this.copyStatus = 1;
          this.copyText = `我正在【拼起走网->${
            this.url
          }】, 一起来拼车哟~来看看节省一半费用的拼车神技！！`;
          break;
        case 2:
          console.log("朋友圈");
          this.copyStatus = 1;
          this.copyText = `我正在【拼起走网->${
            this.url
          }】,一起来拼车哟~来看看节省一半费用的拼车神技！！`;
          break;

        case 3:
          console.log("QQ空间");
          window.open(
            `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${
              this.url
            }&title=我正在【拼起走网】, 我邀请你在：【${
              this.allPosts[index].time
            }】,一起来拼车哟~来看看节省一半费用的拼车神技！！&desc=&summary=&site=&pics=`,
            "newwindow"
          );
          break;
        case 4:
          console.log("微博");
          window.open(
            `http://service.weibo.com/share/share.php?url=${
              this.url
            }&title=我正在【拼起走网】, 我邀请你在：【${
              this.allPosts[index].time
            }】,一起来拼车哟~来看看节省一半费用的拼车神技！！&appkey=1214333208&pic=`,
            "newwindow"
          );
          break;
      }
    },
    copy() {
      this.$message({
          message: '成功复制，去狠狠的粘贴吧！',
          type: 'success',
          center:true
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.transition-box {
  width: 100%;
  height: 12rem;
  border-radius: 6px 6px 0 0;
  background-color: #fff;
  text-align: center;
  color: grey;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  padding: 10px 0;
  & > ul {
    display: flex;
    margin-top: 1rem;
    padding: 0 10px;
    & > li {
      flex: 0 0 20%;
      text-align: center;
      & > img {
        width: 3rem;
      }
    }
  }
  .copyBox {
    & > p {
      line-height: 2rem;
      &:first-of-type {
        font-size: 2.2rem;
        padding: 0 10px;
        color: grey;
        margin-top: 5px;
      }
      &:last-of-type {
        margin-top: 3px;
        .copy-btn{
          color: #67B9FF;
          border:1px #67B9FF solid;
          padding: 2px 5px;
        }
      }
    }
  }
  .cancel-share {
    border-top: 1px #eff0f1 solid;
    position: absolute;
    bottom: 0;
    width: 100%;
    line-height: 2.5rem;
    color: #111;
    letter-spacing: 3px;
    text-align: center;
  }
}
</style>
