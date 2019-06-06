import { observable, action } from 'mobx'

class RootStore {
  @observable count = 0

  @action.bound
  increase(): void {
    this.count += 1
  }

  @action.bound
  decrease(): void {
    this.count -= 1
  }
}

export default new RootStore()
