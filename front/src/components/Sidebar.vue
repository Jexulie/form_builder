<template>
  <div class="sidebar">
      <div class="form-settings">
          <v-text-field
        v-model="form_name"
        label="Form Name"
      ></v-text-field>
      <v-btn class="pink white--text" v-on:click="saveF">
        <span class="mr-2">Save</span>
      </v-btn>
      <v-btn class="pink white--text" v-on:click="newF">
        <span class="mr-2">New</span>
      </v-btn>
      <v-btn target="_blank" v-bind:href="'localhost:3000/render/' + form_name" class="green white--text">
        <span class="mr-2">Show-Form</span>
      </v-btn>
      </div>
      <br>
      <hr>
      <br>
      <div class="new-input">
        <v-text-field
        v-model="input_placeholder"
        label="Input Placeholder"
      ></v-text-field>
        <v-btn class="blue white--text" v-on:click="addInput">
            <span class="mr-2">Add Input</span>
        </v-btn>
      </div>
      <div class="new-button">
          <v-text-field
        v-model="button_name"
        label="Button Name"
      ></v-text-field>
      <v-text-field
        v-model="input_url"
        label="Input Url"
      ></v-text-field>
      <v-btn class="blue white--text" v-on:click="addButton">
        <span class="mr-2">Add Button</span>
      </v-btn>
      </div>
      <Show v-bind:comps="comp_list"/>
  </div>
</template>

<script>
    import Show from './Show'
  export default {
    props: ['saveForm'],
    components: {
        Show
    },
    data(){
        return {
            html_s: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                <title>Document</title>
            </head>
            <body><form>`,
            html_e: `</form></body></html>`,
            html_form: ``,
            input_method: "",
            input_placeholder: "",
            input_url: "",
            button_name: "",
            form_name: "",
            comp_list : []
        }
    },
    methods:{
        addButton: function(){
            var button = `<input type="submit" formaction="${this.input_url}" value="${this.button_name}">`
            if(this.button_name !== "" && this.input_url !== ""){
                this.html_form += button;
                this.comp_list.push({id: Math.random() * 1e7, type: "button", name: this.button_name, formaction: this.input_url})
                this.input_url = ""
                this.button_name = "";
            }
        },

        addInput: function(){
            var input = `<input type="text" placeholder="${this.input_placeholder}"/>`
            if(this.input_placeholder !== ""){
                this.html_form += input;
                this.comp_list.push({id: Math.random() * 1e7, type: "input", placeholder: this.input_placeholder})
                this.input_placeholder = ""
            }
        },

        saveF: function(){
            if(this.form_name !== ""){
                var fullHtml = this.html_s + this.html_form + this.html_e;
                this.saveForm(this.form_name, fullHtml)
                this.form_name = ""
            }
        },

        newF: function(){
            this.comp_list = []
            this.html_form = ""
            this.form_name = ""
        }
    }
  }
</script>

<style>

</style>