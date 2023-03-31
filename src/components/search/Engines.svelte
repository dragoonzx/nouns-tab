<!-- svelte:options immutable={true} -->
<script context="module" lang="ts">
  import StackOverflow from "./icons/StackOverflow.svelte";
  import DuckDuckGo from "./icons/DuckDuckGo.svelte";
  import Archive from "./icons/Archive.svelte";
  import type { Engine } from "../../types/index";
  import Google from "./icons/Google.svelte";

  export const defaultEngines: Engine[] = [
    {
      position: 0,
      name: "DuckDuckGo",
      url: `https://duckduckgo.com/?q=`,
      icon: DuckDuckGo,
      alias: "d ",
    },
    {
      position: 1,
      name: "Google",
      url: `https://www.google.com/search?q=`,
      icon: Google,
      alias: "g ",
    },
    {
      position: 2,
      name: "Internet Archive",
      url: `https://archive.org/search.php?query=`,
      icon: Archive,
      alias: "ar ",
    },
  ];
</script>
