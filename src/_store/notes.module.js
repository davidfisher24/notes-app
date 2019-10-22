import { notesService } from '../_services';
import { router } from '../_helpers';

const state = {
    all: [],
    editing: null,
    sharing: null,
    creating: false,
    commitingShare: false,
};

const getters = {
    notes: state => state.all
}

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        notesService.getAll()
            .then(
                notes => commit('getAllSuccess', notes),
                error => commit('getAllFailure', error)
            );
    },

    create({ commit }, note) {
        commit('createRequest');

        notesService.create(note)
            .then(
                note => {
                    commit('createSuccess', note);
                    router.push('/notes');
                },
                error => commit('createFailure', error)
            );
    },

    startEdit({ commit }, note) {
        commit('startNoteEdit', note);
        router.push('/notes/edit')
    },

    startShare({ commit }, note) {
        commit('startNoteShare', note);
    },

    edit({ commit }, note) {
        commit('createRequest');

        notesService.update(note)
            .then(
                note => {
                    commit('editSuccess', note);
                    router.push('/notes');
                },
                error => commit('editFailure', error)
            );
    },

    addShare({commit},{note, user}) {
        //commit('shareRequest');
        notesService.addShare(note, user)
            .then(
                share => {
                    commit('shareSuccess', note);
                    //router.push('/notes');
                },
                error => commit('shareFailure', error)
            );
    },

    removeShare({commit}, note, user) {
        //commit('shareRequest');
        notesService.removeShare(note, user)
            .then(
                share => {
                    commit('shareSuccess', note);
                    //router.push('/notes');
                },
                error => commit('shareFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        notesService.delete(id)
            .then(
                () => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = [];
    },
    getAllSuccess(state, notes) {
        state.all = notes;
    },
    getAllFailure(state, error) {
        state.all = [];
    },
    createRequest(state) {
        state.creating = true;
    },
    createSuccess(state, note) {
        state.all = state.all.push(note);
    },
    createFailure(state, error) {
        state.all = { error };
        state.creating = false;
    },
    startNoteEdit(state,note) {
        state.editing = note;
    },
    startNoteShare(state,note) {
        state.sharing = note;
    },
    EditRequest(state) {
        state.editing = true;
    },
    EditSuccess(state, note) {
        const foundIndex = state.all.findIndex(x => x.id == note.id);
        state.all[foundIndex] = inote;
        state.editing = null;
    },
    ShareFailure(state, share) {
         this.commitingShare = false;
    },
    ShareRequest(state) {
        this.commitingShare = true;
    },
    ShareSuccess(state, share) {
         this.commitingShare = false;
    },
    EditFailure(state, error) {
        state.all = { error };
        stat.editing = null;
        state.editing = false;
    },
    deleteRequest(state) {
        state.creating = true;
    },
    deleteSuccess(state,id) {
        state.all = state.all.filter(note => note.id !== id)
    },
    deleteFailure(state, error) {
        state.all = { error };
        state.deleting = false;
    },
};

export const notes = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
