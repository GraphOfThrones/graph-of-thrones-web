<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <router-link class="navbar-brand" to="/">Graph Of Thrones</router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class='nav-link' to="/">
              <i class="fa fa-user"></i>
              Characters
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class='nav-link' to="/houses">
              <i class="fa fa-home"></i>
              Houses
            </router-link>
          </li>

        </ul>

        <ul class="navbar-nav ml-auto">

          <li class="nav-item">
            <router-link class='nav-link' to="/about">
              <i class="fa fa-question-circle"></i>
              About
            </router-link>
          </li>

          <li class="nav-item">
            <a class="nav-link" target="_blank" href="https://github.com/GraphOfThrones">
              <i class="fa fa-github"></i>
              GitHub
            </a>
          </li>

        </ul>
      </div>
    </nav>

    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
body{
  background-color: #f3f3f3;
}
</style>
