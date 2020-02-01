<template>
  <div id="app">
    <nav id="hi8 valign-wrapper">
      <div class="nav-wrapper">
        <a href="/home">
          <div class="left hide-on-small-only" id="VGHlogo"></div>
        </a>
        <div class="left show-on-small hide-on-med-and-up" id="VGHlogoMobile"></div>
        <form action>
          <ul id="nav-mobile" class="right">
            <li>
              <input
                id="game-entry"
                class="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </li>
            <li>
              <input class="searchBtn" type id="game-submit" onclick="getGame()" />
              <!-- <a id="game-submit" href="#" type="submit" onclick="getGame()"></a> -->
            </li>
            <li>
              <a class="socialBtn official" href="/myprofile"></a>
            </li>
          </ul>
        </form>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@import url('../public/style.css');

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
