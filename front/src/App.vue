<template>
  <v-app>
    <v-content>
      <v-container grid-list-md test-cs-center>
        <v-layout column>
          <v-flex>
            <Nav/>
          </v-flex>
          <v-layout row>
            <v-flex>
              <Sidebar saveForm="save"/>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>      
    </v-content>
  </v-app>
</template>

<script>
import Nav from './components/Nav'
import Sidebar from './components/Sidebar'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Nav,
    Sidebar,
  },
  data () {
    return {
      
    }
  },
  methods: {
    save: function(name, html){
      this.curForm = name;
      axios.post("localhost:3000/save",{
        name: name,
        html: html
      })
    }
  }
}
</script>
