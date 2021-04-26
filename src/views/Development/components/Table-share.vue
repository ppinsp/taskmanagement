<template>
  <v-dialog v-model="dialogShare" max-width="500">
    <v-card>
      <v-app-bar color="primary" dark>
        <h2>กระดานสนทนา</h2>
      </v-app-bar>
      <div class="chatbox" ref='messageBody' v-if="dialogShare">
        <div class="messageBody" >
          <div v-for="message in messages" :key="message.id">
            <div :class="yourMessage(message.userId.username)?'outgoing lower':'incoming'">
              <div class="bubble">
                <span class="name">{{yourMessage(message.userId.username)?'You': message.userId.firstName}} : </span><p>{{message.massages}}</p>
                <div class="timeStamp">
                  {{ formatTime(message.createdAt)}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-card-actions>
        <div justify-center mr-5>
          <v-text-field
            v-model="text"
            filled
            outlined
            full-width
            clear-icon="mdi-send"
            clearable
            label="Sent message"
            type="text"
            @click:clear="sendMessage" />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ChatProvider from "@/resources/ChatProvider";
import { getUser } from "../../../utils/js/Auth"
import dayjs from 'dayjs'
const chatService = new ChatProvider();
export default {
  props: {
    value: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    dialogShare: {
      get() {
        return this.value
      },
      set(value) {
        this.scrollToEnd(); 
        this.$emit('input', value)
      }
    },
  },
  data() {
    return {
      user: {},
      messages: [],
      text: '',
      content: null,
    }
  },
  async mounted() {
    this.getMessage()
    this.user = getUser(); 
  },
  
  methods: {
    scrollToEnd () {
      this.content =this.$refs.messageBody;
      this.content.scrollTop = this.content.scrollHeight;
    },
    formatTime(time) {
      return dayjs(time).format('MMM D, YYYY h:mm A')
    },
    async getMessage() {
      const { data } = await chatService.getChat();
      this.messages = data
      console.log('this.message',this.messages);
    },
    async sendMessage() {
      const {message} = await chatService.createChat({ massages: this.text });
      if (message === 'done') {
        await this.getMessage()
        this.scrollToEnd(); 
      }
    },
    yourMessage(username) {
      if (this.user.username === username) {
        return true
      }
      else {
        return false
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .chatbox {
    width: 500px;
    height: auto;
    max-height: 300px;
    overflow-y: scroll;
    padding: 20px;
    .messageBody {
      .bubble {
        display: inline-block;
        padding:10px;
        margin-bottom: 10px;
        border-radius: 15px;
        .name {
          font-size: 13px;
        }
        p {
          width: 180px;
          color: #f9fbff;
          font-size: 16px;
          text-align: left;
          line-height: 1.4;
          padding: 0 !important;
        }
        .timeStamp {
          font-size: 11px;
        }
      }
    }
    .messageBody .incoming {
      text-align: left;
    }
    .messageBody .incoming .bubble {
      background-color: #b2b2b2;
    }
    .messageBody .outgoing {
      text-align: right;
    }
    .messageBody .outgoing .bubble {
      background-color: #79c7c5;
    }
  }

</style>