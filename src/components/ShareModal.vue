
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            Share Note

            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>


        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            <div v-if="sharing">
              <h3>Note</h3>
              <strong>{{sharing.title}}</strong>
              &nbsp;&nbsp;
              <span>{{sharing.text}}</span>
              <br><br>
              <h4>Share With:</h4>
              <vueSelect :options="all.items" label="email" @input="setSelected"></vueSelect>
              <button @click.prevent="commitShare()">Share</button>
            </div>
          </slot>
        </section>

      </div>
    </div>
  </transition>
</template>


<script>
  import { mapState, mapActions } from 'vuex'
  import vueSelect from 'vue-select'

  export default {
    name: 'modal',
    components: {
      vueSelect
    },
    beforeMount(){
        this.getAll()
    },
    data () {
      return {
        options: [],
        selected: null
      };
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState('users', ['all']),
        ...mapState('notes', ['sharing'])
    },
    methods: {
        ...mapActions('notes', ['addShare']),
        ...mapActions('users', ['getAll']),
        close() {
          this.$emit('close');
        },
        setSelected(value) {
           this.selected = value;
        },
        commitShare(e){
          const { selected, sharing } = this;

          if (selected && sharing) {
            const note = sharing;
            const user = selected
            this.addShare({note, user}).then(this.close())
          }
        }
    },
  }
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
</style>