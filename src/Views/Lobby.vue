<template>
  <div>
    <homebutton />
    <div>
      <lobbylist />
      <lobbyform />
    </div>
  </div>
</template>

<script>
import lobbyform from "@/components/lobby/lobbyForm";
import lobbylist from "@/components/lobby/lobbylist";
import homebutton from "@/components/buttons/homebutton";

export default {
  name: "LobbyScreen",
  components: {
    lobbyform,
    lobbylist,
    homebutton
  }
};
</script>
