<template>
  <nav class="board-navigation">
    <div class="title">
      <h1>Kanban App</h1>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'KbnBoardNavigation',

}
</script>

<style scoped>
.board-navigation {
  display: flex;
  border-bottom: medium solid black;
}
.title {
  flex: 1;
}
h1 {
  margin: 0px;
}
</style>
