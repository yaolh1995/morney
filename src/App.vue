<template>
  <div id="app">
    <div id="nav">
        <li><router-link to="/money">记账</router-link> </li>
        <li><router-link to="/labels">标签</router-link></li>
        <li><router-link to="/statistics">统计</router-link></li>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
