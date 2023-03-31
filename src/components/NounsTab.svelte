<script lang="ts">
  import NounsSearch from "./search/NounsSearch.svelte";
  import NounsAuction from "./NounsAuction.svelte";
  import {
    createClient,
    getContextClient,
    queryStore,
    setContextClient,
    dedupExchange,
    cacheExchange,
    fetchExchange,
  } from "@urql/svelte";
  import NounsProposals from "./NounsProposals.svelte";
  import { holderStore } from "src/store/holderStore";
  import { storage } from "src/storage";
  import { onMount } from "svelte";
  import { addressNounsQuery } from "src/graph";
  import earth from "../assets/icons/earth.mp4";

  const client = createClient({
    url: "https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph",
    exchanges: [dedupExchange, cacheExchange, fetchExchange],
  });

  setContextClient(client);

  const backgrounds = {
    "0": "rgb(213, 215, 225)",
    "1": "#e1d7d5",
  };

  let backgroundColor = backgrounds["0"];

  const onColorChange = (detail) => {
    console.log("color changed");
    backgroundColor = backgrounds[detail.detail];
  };

  let holder = "";

  onMount(async () => {
    holder = (await storage.get()).holder;
  });

  const saveHolder = async () => {
    if (!holder) {
      return;
    }

    await storage.set({
      holder: $holderStore,
    });
    holder = $holderStore;
  };

  const resetHolder = async () => {
    await storage.set({
      holder: $holderStore,
    });
    holder = "";
  };
</script>

<div class="container" style={`background-color: ${backgroundColor};`}>
  <div class="row-top">
    <a href="https://nouns.wtf" target="_blank" rel="noreferrer">
      <div class="logo-container">
        <video
          src={earth}
          autoplay
          muted
          playsinline
          loop
          width="40"
          height="40"
          class="logo-video"
        />
      </div>
    </a>
  </div>
  <div class="search-container">
    <NounsSearch />
  </div>
  <div class="nouns-auction-container">
    <NounsAuction on:colorChange={onColorChange} />
    <NounsProposals />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    background-color: #e1d7d5;
    padding: 0 40px;
    min-height: 100vh;
  }

  .row-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
  }

  .logo-video {
    border-radius: 50%;
  }

  .search-container {
    margin-top: 120px;
  }

  .nouns-auction-container {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
</style>
