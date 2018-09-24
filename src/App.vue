<template>
  <div id="app">
    <nav class="navbar bg-dark text-light">
      <router-link class="navbar-brand text-light" to="/">Graph Of Thrones</router-link>
      <ul class="navbar-nav ml-auto">

        <li class="nav-item">
          <router-link class='nav-link text-light' to="/about">
            <i class="fa fa-question-circle"></i>
            About
          </router-link>
        </li>

        <!-- <li class="nav-item"> -->
          <!-- <a class="nav-link text-light" target="_blank" href="https://github.com/GraphOfThrones"> -->
            <!-- <i class="fa fa-github"></i> -->
            <!-- GitHub -->
          <!-- </a> -->
        <!-- </li> -->

      </ul>
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
