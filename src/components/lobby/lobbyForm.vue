<template>
    <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Create new lobby</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Lobby creation details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="Lobby.name" label="Lobby Name*" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field v-model="Lobby.description" label="Description*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="Lobby.password" label="Password" type="password"></v-text-field>
              </v-col>
                <v-col cols="12">
                <v-text-field v-model="Lobby.tournamentCode" label="Tournament code" type="password"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="addNewLobby">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    name: "lobbyForm",
    data(){
        return{
            Lobby: {
                name:"",
                description:"",
                password: null,
                tournamentCode: "",
                playerOne: null,
            },
            wsMessage: {
              Subject: null,
              Action: null,
              Content: null,
              Token: null
              },
            dialog: false,

        };
    },
    methods: {
        async addNewLobby(){
            this.dialog = false
            this.wsMessage.Subject = "LOBBY"
            this.wsMessage.Action = "ADDLOBBY"
            this.wsMessage.Content = this.Lobby
            this.wsMessage.Content.playerOne = this.$store.getters.getPlayerInfo
            this.wsMessage.Token = await this.$auth.getTokenSilently()
            this.$socket.send(JSON.stringify(this.wsMessage))
            console.log(this.wsMessage)
             },
        }
    }
</script>

<style>

</style>