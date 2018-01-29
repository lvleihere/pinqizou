export default {
  changeNavTab (state, options) {
    state.navTab = options
  },
  changeUserStatus (state) {
    state.userStatus = !state.userStatus
  },
  changeUserNavStatus (state) {
    state.userNavStatus = !state.userNavStatus
  },
  closeUserNav (state) {
    state.userNavStatus = 0
  }
}
