<template>
  <div class="content px-3">
    <h2>Home</h2>
    <p>{{count}}</p>
    <button @click="decrease">Decrease</button>
    <button @click="increase">Increase</button>
    <button @click="setExact(0)">Zero</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

@Component
export default class Home extends Vue {
  @State count!: number
  @Mutation increase!: () => void 
  @Mutation decrease!: () => void
  @Mutation setExact!: (val: number) => void
}
</script>
