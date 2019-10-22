<template>
    <div>
        <h2>Edit Note</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="title">title</label>
                <input type="text" v-model="title" name="title" class="form-control" :class="{ 'is-invalid': submitted && !title }" />
                <div v-show="submitted && !title" class="invalid-feedback">title is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="text">Text</label>
                <input type="text" v-model="text" name="text" class="form-control" :class="{ 'is-invalid': submitted && !text }" />
                <div v-show="submitted && !text" class="invalid-feedback">Text is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.editing">Edit</button>
                <img v-show="status.editing" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    beforeMount(){
        this.id = this.editing.id;
        this.title = this.editing.title;
        this.text = this.editing.text;
    },
    data () {
        return {
            id: this.editing.id,
            title: this.editing.title,
            text: this.editing.text,
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState('notes', ['editing'])
    },
    methods: {
        ...mapActions('notes', ['edit']),
        handleSubmit (e) {
            this.submitted = true;
            const { id, title, text } = this;
            if (id && title && text) {
                this.edit({ id, title, text })
            }
        }
    }
};
</script>