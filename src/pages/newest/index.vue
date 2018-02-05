<template>
  <div>
    <p class="loading" v-if="startLoadStatus">
      <i class="el-icon-loading"></i>
    </p>
    <show v-if="0"></show>
    <ul class="post-all-box">
      <li v-for="(post, index) in posts"
          :key='index'
          class="post-box clearfix"
      >
        <img :src="post.headImg" alt="headImg" @click="lookUser(index)">
        <div class="post-content">
          <p class="title" >{{post.title}}</p>
          <p class="author-info">
            <span :style="{color:titleRandomColor()}">{{post.nick}}</span>&nbsp;
            <span class="title-time">{{post.time}}</span>
          </p>
          <p class="tag-box">
            <el-tag
              :type="tagRandomColor()"
              v-for="(tag,index) in post.tags"
              :key="index"
              size = 'mini'
              class="tag"
            >
              {{tag}}
            </el-tag>
          </p>
          <p class="content">{{post.content}}</p>
          <div class="control-box">
            <p @click="good(index)"><img src="/static/img/icon/good.png" alt="good"><span>{{post.goodNum}}</span></p>
            <p @click.stop="comment(index)"><img src="/static/img/icon/comment.png" alt="comment" class="comment-icon"><span>{{post.comment.length}}</span></p>
            <p @click.stop="openShow(index)"><img src="/static/img/icon/share.png" alt="share"></p>
          </div>
          <ul class="comment-box">
            <li v-for="(listComment, i) in post.comment" :key="i">
              <img :src="listComment.img" alt="headImg" @click="lookCommentUser(i)">
              <div class="bin-comment">
                <p class="comment-person-info">
                  <span>{{listComment.nick}}</span><span class="comment-time">{{listComment.time}}</span>
                </p>
                <p class="comment-content">
                  {{listComment.word}}
                </p>
              </div>
            </li>
          </ul>
          <transition name="el-zoom-in-top">
          <div class="edit-comment" v-if="index === commentStatus" @click.stop="space">
            <el-input
              placeholder="回复内容在这里"
              class="input-with-select"
              v-model.lazy="commentWords"
              :autofocus='true'
              @keypress.enter.native="reply(index)"
            >
              <el-button slot="append" @click="reply(index)">回复</el-button>
            </el-input>
          </div>
          </transition>
        </div>
      </li>
    </ul>

    <p class="load-more"
      :class="{shark:sharkStatus}"
      v-if="loadMoreStatus"
      @click="loadMore" ref="loadMore"
    >
      <span>{{loadText}}</span><i class="el-icon-loading" v-if="loadingStatus"></i>
    </p>
    <footer @click="showAppInfo">
      <p>All Rights Reserved @lvleihere</p>
      <p>当前呈现版本 v.18.1.29</p>
    </footer>
     <transition name="el-zoom-in-bottom">
        <share v-if="shareBoxStatus" :allPosts="posts"></share>
      </transition>
  </div>
</template>
<script>
import axios from "axios";
import bus from "@/store/Bus";
import Show from "@/pages/global/Show";
import Share from "@/pages/global/Share";
import { mapState, mapMutations } from "vuex";
import moment from "moment";
import timeJs from "time.js";

export default {
  components: {
    Show,
    Share
  },
  data() {
    return {
      loadMoreStatus: 0,
      loadingStatus: 0,
      posts: [],
      titleColor: [
        "#F3D23A",
        "#74EED6",
        "#FEDDC2",
        "#67B9FF",
        "#ff0000",
        "#E9A9EB"
      ],
      tagColor: ["", "success", "info", "warning", "danger"],
      //iptContent:'',
      durStatus: -1,
      commentStatus: -1,
      commentWords: "",
      shareBoxStatus: 0,
      startLoadStatus: 1,
      loadText: "加载更多",
      sharkStatus: 1 //laoding抖动
    };
  },
  created() {
    this.getAllPosts(0);
    bus.$on("bodyClick", () => {
      this.shareBoxStatus = 0;
      this.commentStatus = null;
    });
  },
  computed: {
    ...mapState(["postStart"])
  },
  methods: {
    ...mapMutations(["changePostStart"]),
    space() {
      return false;
    },
    titleRandomColor() {
      return this.titleColor[Math.round(Math.random() * (5 - 0) + 0)];
    },
    tagRandomColor() {
      return this.tagColor[Math.round(Math.random() * (4 - 0) + 0)];
    },
    //获取所有的帖子
    getAllPosts(start) {
      let url = `${this.api}/getpost.php`;
      axios({
        method: "get",
        url,
        params: {
          start,
          v: this.rand
        }
      }).then(res => {
        let result = res.data;
        if (result.code === 0) {
          let { data } = result;
          if (data.length < 10) {
            this.loadText = "我是有底线滴~";
            this.$refs.loadMore.style.background = "grey";
            this.sharkStatus = 0;
          }
          this.posts = this.posts.concat(data);
          data.forEach((v, i) => {
            v.time = timeJs.ago(v.time);
            v.comment.forEach(c => {
              c.time = timeJs.ago(c.time);
            });
          });
          this.posts.forEach(v => {
            "string" === typeof v.tags ? (v.tags = v.tags.split(",")) : null;
          });

          this.loadingStatus = 0;
          this.startLoadStatus = 0;
          this.loadMoreStatus = 1;
        }
      });
    },
    //点赞
    good(index) {
      let uid = localStorage.getItem("uid");
      if(!uid){
        this.$message({
          message:'请先登录~',
          type:'errir',
          center:true
        })
      }else{
        let tid = this.posts[index].tid;
        let url = `${this.api}/good.php`;
        axios({
          method: "get",
          url,
          params: {
            tid,
            uid,
            v: this.rand
          }
        }).then(res => {
          let code = res.data.code;
          switch (code) {
            case -1:
              this.posts[index].goodNum--;
              break;
            case 1:
              this.posts[index].goodNum++;
              break;
          }
        });
      }
    },
    //评论
    comment(index) {
      let uid = localStorage.getItem("uid");
      if(!uid){
        this.$message({
          message:'请先登录~',
          type:'errir',
          center:true
        })
      }else{
        this.commentWords = "";
        if (this.commentStatus === -1 && this.commentStatus !== index) {
          this.commentStatus = index;
        } else if (this.commentStatus === index) {
          this.commentStatus = -1;
        } else {
          this.commentStatus = index;
        }
      }

    },
    //打开底部的分享框
    openShow(index) {
      this.shareBoxStatus = !this.shareBoxStatus;
    },
    reply(index) {
      if (!this.commentWords) {
        this.$message({
          message: "评论不能为空!",
          type: "error",
          center: true
        });
      } else {
        let self = this;
        let uid = localStorage.getItem("uid");
        let content = this.commentWords;
        let url = `${this.api}/comment.php`;

        axios({
          method: "post",
          url,
          params: {
            tid: self.posts[index].tid,
            uid,
            content,
            time: Date.now()
              .toString()
              .slice(0, 10),
            v: this.rand
          }
        })
          .then(res => {
            if (res.data.code === 0) {
              let { data } = res.data;
              self.posts[index].comment.push({
                uid,
                img: data.img,
                nick: data.nick,
                time: timeJs.ago(data.time),
                word: data.word
              });
              this.$message({
                message: "评论成功~",
                type: "success",
                center: true
              });
              this.commentWords = "";
              this.commentStatus = -1;
            }
          })
          .catch(err > {});
      }
    },
    //加载更多
    loadMore() {
      if (this.sharkStatus) {
        this.loadingStatus = 1;
        this.changePostStart();
        this.getAllPosts(this.postStart);
      }
    },
    //底部app详情
    showAppInfo() {
      this.$router.push("/appinfo");
    },
    lookUser(index) {
      let uid = this.posts[index].uid;
      this.$router.push(`/user/base/${uid}`);
    },
    lookCommentUser(i) {
      let uid = this.posts[i].uid;
      this.$router.push(`/user/base/${uid}`);
    }
  }
};
</script>
<style lang='scss' scoped>
$b: 1px red solid;
.loading {
  font-size: 4rem;
  text-align: center;
}
.post-all-box {
  min-height: 65vh;
}
.post-box {
  width: 100vw;
  margin-top: 10px;
  background: #f5f5f5;
  padding: 5px;
  & > img {
    width: 3rem;
    border-radius: 50%;
    float: left;
  }
  .post-content {
    margin-left: 3.5rem;
    .title {
      font-size: 16px;
    }
    .author-info {
      .title-time {
        float: right;
        margin-right: 3rem;
      }
    }
    .tag-box {
      margin-top: 5px;
      .tag {
        margin-right: 3px;
      }
    }
    .content {
      margin-top: 5px;
      font-size: 13px;
      color: grey;
    }
    .control-box {
      display: flex;
      margin: 10px 0 6px;
      font-size: 13px;
      & > p {
        flex-grow: 1;
        & > img {
          margin-right: 0.8rem;
        }
        .comment-icon {
          vertical-align: -3px;
        }
        & > span {
          vertical-align: 3px;
        }
      }
    }
    .comment-box {
      & > li {
        overflow: hidden;
        margin-bottom: 7px;
      }
      img {
        width: 2rem;
        border-radius: 50%;
        float: left;
      }
      .bin-comment {
        margin-left: 2.5rem;
        padding-top: 3px;
        .comment-person-info {
          .comment-time {
            color: grey;
            margin-left: 20px;
            // float: right;
            // padding-right: 3rem;
          }
        }
        .comment-content {
          margin-top: 2px;
          font-size: 14px;
          color: grey;
        }
      }
    }
    .edit-comment {
      input {
        font-size: 12px;
      }
    }
  }
}
.load-more {
  text-align: center;
  margin: 20px 0 40px;
  line-height: 3rem;
  background: #409eff;
  border-radius: 5px;
  color: #fff;
  font-size: 2.5rem;
  letter-spacing: 1px;
}
.shark {
  animation: shark 2s ease-in-out infinite alternate;
}
@keyframes shark {
  0% {
    transform: translateX(-2px);
  }
  2% {
    transform: translateX(0);
  }
  4% {
    transform: translateX(2px);
  }
  6% {
    transform: translateX(0);
  }
  8% {
    transform: translateX(-2px);
  }
  10% {
    transform: translateX(0);
  }
  90% {
    transform: translateX(0);
  }
}
.load-more-active {
  background: #5eabfb;
}
footer {
  text-align: center;
  margin-bottom: 10px;
  & > p {
    color: #aba9a9;
  }
}
</style>
