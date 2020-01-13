<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <button class="artXButton createLobbyButton" v-on="on">
          Create lobby
        </button>
      </template>

      <v-card class="createLobbyForm">
        <div>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <input
                    class="artXButton lobbyFormInput"
                    v-model="Lobby.name"
                    placeholder="Name*"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <input
                    class="artXButton lobbyFormInput"
                    v-model="Lobby.description"
                    placeholder="Description*"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <input
                    class="artXButton lobbyFormInput"
                    v-model="Lobby.password"
                    placeholder="Password"
                    type="password"
                  />
                </v-col>
                <v-col cols="12">
                  <input
                    class="artXButton lobbyFormInput"
                    v-model="Lobby.tournamentCode"
                    placeholder="Tournament code"
                    type="password"
                  />
                </v-col>
              </v-row>
            </v-container>
            <small class="turtlesFont">*indicates required field</small>
          </v-card-text>
        </div>

        <div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <button class="artButton" text @click="dialog = false">
              Cancel
            </button>
            <button class="artButton" text @click="addNewLobby">Create</button>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "lobbyForm",
  data() {
    return {
      Lobby: {
        name: "",
        description: "",
        password: null,
        userOne: null
      },
      wsMessage: {
        Action: null,
        Content: null,
        Token: null
      },
      dialog: false
    };
  },
  methods: {
    async addNewLobby() {
      this.dialog = false;
      this.wsMessage.Action = "CREATE";
      this.wsMessage.Content = this.Lobby;
      this.wsMessage.Content.userOne = this.$store.getters.getPlayerInfo;
      this.wsMessage.Token = await this.$auth.getTokenSilently();
      this.$socket.send(JSON.stringify(this.wsMessage));
      console.log(this.wsMessage);
    }
  }
};
</script>

<style>
.createLobbyButton {
  margin-top: 5vh;
}

.createLobbyForm {
  background-color: #191938 !important;
}

.lobbyFormInput {
  width: 90%;
}
</style>
