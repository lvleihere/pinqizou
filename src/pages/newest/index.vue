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
        <img :src="post.headImg" alt="headImg">
        <div class="post-content">
          <p class="title" >{{post.title}}</p>
          <p class="author-info">
            <span :style="{color:titleRandomColor()}">{{post.nick}}</span>&nbsp;
            <span>{{post.time}}</span>
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
            <p @click="comment(index)"><img src="/static/img/icon/comment.png" alt="comment" class="comment-icon"><span>{{post.comment.content.length}}</span></p>
            <p @click.stop="openShow(index)"><img src="/static/img/icon/share.png" alt="share"></p>
          </div>
          <ul class="comment-box">
            <li v-for="(listComment, index) in post.comment.content" :key="index">
              <img :src="listComment.img" alt="headImg">
              <div class="bin-comment">
                <p class="comment-person-info">
                  <span>{{listComment.nick}}</span>&nbsp;&nbsp;<span class="comment-time">{{listComment.time}}</span>
                </p>
                <p class="comment-content">
                  {{listComment.word}}
                </p>
              </div>
            </li>
          </ul>
          <transition name="el-zoom-in-top">
          <div class="edit-comment" v-if="index === commentStatus">
            <el-input
              placeholder="回复内容在这里"
              class="input-with-select"
              v-model="commentWords"
              :autofocus='true'
            >
              <el-button slot="append" @click="reply(index)">回复</el-button>
            </el-input>
          </div>
          </transition>
        </div>
      </li>
    </ul>

    <p class="load-more" v-if="loadMoreStatus" @click="loadMore">
      <span>加载更多</span><i class="el-icon-loading" v-if="loadStatus"></i>
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
import Show from '@/pages/global/Show'
import Share from '@/pages/global/Share'

export default {
  components: {
    Show,
    Share
  },
  data() {
    return {
      loadMoreStatus: 0,
      loadStatus: 0,
      posts: null,
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

    };
  },
  created() {
    this.getAllPosts();
    bus.$on("bodyClick", () => {
      this.shareBoxStatus = 0;
    });
  },
  methods: {
    titleRandomColor() {
      return this.titleColor[Math.round(Math.random() * (5 - 0) + 0)];
    },
    tagRandomColor() {
      return this.tagColor[Math.round(Math.random() * (4 - 0) + 0)];
    },
    //获取所有的帖子
    getAllPosts() {
      let url =
        "https://www.easy-mock.com/mock/5a6b41662c8ae92ce8d3ca91/pinqizou/all_posts";
      axios({
        method: "get",
        url,
        params: {
          v: this.rand
        }
      }).then(res => {
        let result = res.data;
        if (result.code === 0) {
          let { data } = result;
          this.posts = data;

          this.startLoadStatus = 0;
          this.loadMoreStatus = 1;
        }
      });
    },
    //点赞
    good(index) {
      this.posts[index].goodNum++;
    },
    //评论
    comment(index) {
      this.commentWords = "";
      if (this.commentStatus === -1 && this.commentStatus !== index) {
        this.commentStatus = index;
      } else if (this.commentStatus === index) {
        this.commentStatus = -1;
      } else {
        this.commentStatus = index;
      }
    },
    //打开底部的分享框
    openShow(index) {
      this.shareBoxStatus = !this.shareBoxStatus;
    },
    reply(index) {
      //待改变api
      this.posts[index].comment.content.push({
        uid: 5,
        img: "/static/img/head3.jpg",
        nick: "胡瑶",
        time: "2018-1-27 16:55",
        word: this.commentWords
      });
      this.commentWords = "";
    },
    //加载更多
    loadMore() {
      this.loadStatus = !this.loadStatus;
    },
    //底部app详情
    showAppInfo() {
      this.$router.push("/appinfo");
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
