export default {
  changeNavTab (state, options) {
    state.navTab = options
  },
  changeUserStatus (state, status) {
    state.userStatus = status
  },
  changeUserNavStatus (state) {
    state.userNavStatus = !state.userNavStatus
  },
  closeUserNav (state) {
    state.userNavStatus = 0
  },
  changePostStart (state) {
    state.postStart = state.postStart + 10
  }
}
