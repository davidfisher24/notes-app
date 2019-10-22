<template>
    <div>
        <h2>My Notes</h2>
        <h3 v-if="all.length === 0">You don't have any notes yet :(</h3>
        <ul id="example-2">
          <div v-for="(note, index) in all">
            <p>
                <strong>{{note.title}}</strong>
                &nbsp;&nbsp;
                <span>{{note.text}}</span>
                <br>
                <button @click.prevent="handleEdit(note)">Edit</button>
                <button @click.prevent="handleDelete(note.id)">Delete</button>
                <button @click.prevent="showModal(note)">Share</button>
            </p>
          </div>
        </ul>


    <modal
      v-show="modalVisible"
      @close="closeModal"
    />

        <router-link to="/notes/add" class="btn btn-link">Add A new note</router-link>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import modal from '../components/ShareModal.vue';

export default {
    beforeMount(){
        this.getAll()
    },
    data () {
      return {
        modalVisible: false,
      };
    },
    components: {
      modal,
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState('notes', ['all', 'notes'])
    },
    methods: {
        ...mapActions('notes', ['create', 'getAll', 'delete', 'startEdit', 'startShare']),
        handleSubmit (e) {
            this.submitted = true;
            const { title, text } = this;
            if (title && text) {
                this.create({ title, text }).then(this.notes.push({
                    title,
                    text
                }))
            }
        },
        handleDelete (id) {
            this.delete(id)
        },
        handleEdit(note) {
            this.startEdit(note)
        },
        showModal(note) {
            this.startShare(note)
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
        }
    },
};
</script>