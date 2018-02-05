<template>
  <div>
    <p class="tips" v-if="tipsStatus">暂无私信~主动去撩吧~</p>
    <ul class="private-box">
      <li v-for="(list, index) in lists" :key="index">
        <img :src="list.head" alt="headImg" @click.stop="space">
        <div>
          <p class="title">
            <span class="nick">{{list.fromNick}}</span>
            <span class="to-flag">私信</span>
            <span class="nick">{{list.toNick}}</span>&nbsp;:
            <span class="date-time">{{list.time}}</span>
          </p>
          <div class="content">
            <p>
              {{list.content}}
            </p>
            <span class="show-reply" @click.stop="showReply(index)">回复</span>
          </div>
          <transition name="el-zoom-in-top">
            <div class="edit-comment" v-if="index === replyStatus" @click.stop="space">
              <el-input
                placeholder="回复内容在这里"
                class="input-with-select"
                v-model="replyWords"
                @keypress.enter.native="reply(index)"
              >
                <el-button slot="append" @click.stop="reply(index)">发送</el-button>
              </el-input>
            </div>
          </transition>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import bus from "@/store/Bus";
import axios from "axios";
import timeJs from "time.js";

export default {
  data() {
    return {
      lists: [],
      replyWords: "",
      replyStatus: null,
      tipsStatus:0
    };
  },
  created() {
    bus.$on("bodyClick", () => {
      this.replyStatus = null;
    });
    this.getPrivate();
  },
  methods: {
    space() {
      return false;
    },
    getPrivate() {
      let self = this;
      let url = `${this.api}/getPrivate.php`;

      axios({
        method: "get",
        url,
        params: {
          uid: self.uid,
          v: this.rand
        }
      })
        .then(res => {
          if (res.data.code === 0) {
            let { data } = res.data;
            self.lists = data.slice(0);
            self.lists.forEach(v=>{
              v.time = timeJs.ago(v.time)
            })
            if(self.lists.length === 0){
              self.tipsStatus = 1
            }
          }
        })
        .catch(err => {});
    },
    showReply(index) {
      this.replyWords = "";
      if (this.replyStatus === -1 && this.replyStatus !== index) {
        this.replyStatus = index;
      } else if (this.replyStatus === index) {
        this.replyStatus = -1;
      } else {
        this.replyStatus = index;
      }
    },
    reply(index) {
      if (!this.replyWords) {
        this.$message({
          message: "回复不能为空!",
          type: "error",
          center: true
        });
      } else {
        let self = this;
        let url = `${this.api}/reply.php`;
        let toid = this.lists[index].fromid?this.lists[index].fromid:this.lists[index].toid;
        axios({
          method: "post",
          url,
          params: {
            fromid:this.uid,
            toid,
            content:self.replyWords,
            time: Date.now()
              .toString()
              .slice(0, 10),
            v: this.rand
          }
        }).then(res => {
          if (res.data.code === 0) {
            let { data } = res.data;
            self.lists.unshift({
              head: data.head,
              fromNick: "我",
              toNick:data.toNick,
              time: timeJs.ago(data.time),
              content: data.content
            });

            this.$message({
              message: "评论成功~",
              type: "success",
              center: true
            });
          }
        });
      }


      //要响应
      this.replyStatus = null;
    }
  }
};
</script>
<style lang='scss' scoped>
.tips{
  text-align: center;
  margin-top: 10px;
}
.private-box {
  & > li {
    margin-top: 10px;
    background: #f5f5f5;
    overflow: hidden;
    padding: 8px 10px;
    & > img {
      float: left;
      width: 3rem;
      border-radius: 50%;
    }
    & > div {
      margin-left: 3.5rem;
      .title {
        font-size: 12px;
      }
      .nick {
        // color:#6ED487;
        font-size: 15px;
      }
      .to-flag {
      }
      .date-time {
        float: right;
        font-size: 12px;
        margin-right: 10px;
      }
      .content {
        font-size: 13px;
        color: grey;
        margin-bottom: 10px;
        position: relative;
        & > p {
          width: 80%;
        }
        .show-reply {
          padding: 2px 5px;
          border: 1px grey solid;
          position: absolute;
          top: 0;
          right: 10px;
        }
      }
    }
  }
}
</style>
