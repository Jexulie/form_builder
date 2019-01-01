<template>
  <div class="show">
      <h2>Preview</h2>
      <ul>
          <li v-for="comp in comps" :key="comp.id">
            <form action="">
              <div v-if="comp.type === 'input'">
                <v-text-field type="text" :label="comp.placeholder"></v-text-field>
              </div>
              <div v-else>
                <v-btn type="submit" :formaction="comp.formaction" >{{comp.name}}</v-btn>
              </div>
            </form>
          </li>
      </ul>
  </div>
</template>

<script>
  export default {
    props: ['comps'],
    data(){
        return{
          // test:[{type:'input', placeholder:"woohoo"},{type:'button', name:"wooo", formaction:"/xxxx"}]
        }
    }
  }
</script>

<style>
ul{
  list-style: none;
}
</style>
