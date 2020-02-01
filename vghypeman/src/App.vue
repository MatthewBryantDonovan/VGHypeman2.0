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
.searchBtn {
    background-image: url("../src/assets/SearchIcon.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: #0B0C10;
    margin-left:3px;
    height: 42px;
    width: 42px;
}

.searchBtn:hover {
    background-image: url("../src/assets/SearchIconHover.png");
    background-size: 100% 100%;
    background-color: #0B0C10;
}

.searchBtn:focus {
    background-image: url("../src/assets/SearchIconHover.png");
    background-size: 100% 100%;
    background-color: #0B0C10;
    outline: 0;
}

.official {
    margin-top: 10px;
    background-image: url("../src/assets/ScreenShotIcon.png");
    background-size: 50px 50px;
    background-repeat: no-repeat;
    background-color: #0B0C10;
    height: 50%;
    width: 50%;
}

.official:hover {
    background-image: url("../src/assets/ScreenShotIconHover.png");
    background-size: 50px 50px;
    background-color: #0B0C10;
}

.official:focus {
    background-image: url("../src/assets/ScreenShotIconHover.png");
    background-size: 50px 50px;
    background-color: #0B0C10;
}

.socialBtn {
    width: 50px;
    height: 50px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
