<script lang="ts">
  import { activeEngine, searchValue } from "./searchStore";
  import { defaultEngines } from "./Engines.svelte";
  import Icons from "./IconList.svelte";
  import { onMount } from "svelte";
  import { arrayRotate } from "src/utils/arrayRotate";

  let engines = Array.from(defaultEngines);
  let startPosition = $activeEngine;
  let input: HTMLInputElement;

  $: engines;
  $: aliases = [];
  $: query = engines[0].url + $searchValue;

  onMount(async () => {
    setTimeout(() => {
      rotateEngines();
      startPosition = $activeEngine;
      getAliases();
    }, 0);
    input?.focus();
  });

  function getAliases() {
    engines.forEach((engine, i) => {
      aliases = [...aliases, engine.alias];
    });
  }

  function selectAlias() {
    select(engines.find((engine) => engine.alias == $searchValue).position);
  }
  function deselectAlias() {
    select(startPosition);
  }

  $: if (!aliases.includes($searchValue)) {
    if (input && $searchValue == "") deselectAlias();
  } else {
    selectAlias();
  }

  // Key commands
  function hotkey(e: KeyboardEvent["key"]) {
    switch (e) {
      case "Enter":
        // Perform search
        aliases.forEach((a) => {
          if (query.startsWith(a)) {
            query = query.split(a.length + 1)[1];
          }
        });
        window.location.href = query;
        break;
      case "ArrowUp":
        select($activeEngine + 1);
        break;
      case "ArrowDown":
        select($activeEngine - 1);
        break;
      default:
        break;
    }
  }

  // Icon Position
  const select = (position: number) => {
    if (position < 0) {
      position = engines.length - 1;
    } else if (position > engines.length - 1) {
      position = 0;
    }

    const distance = Math.abs(engines.length - $activeEngine + position);
    $activeEngine = position;
    const targetPosition = engines.find(
      (engine) => engine.position == position
    ).position;
    // set element with targetPosition as first element of engines array
    engines = [
      engines.find((e) => e.position === targetPosition),
      ...engines.filter((e) => e.position !== targetPosition),
    ];

    input?.focus();
  };

  let targetPosition = engines.find(
    (engine) => engine.position == startPosition
  ).position;
  // Rotate array based on users default setting
  const rotateEngines = (target = $activeEngine) => {
    targetPosition = engines.find(
      (engine) => engine.position == target
    ).position;
    engines = arrayRotate(engines, targetPosition);
    input?.focus();
  };

  const debug = false;
  let searchFocused = true;
</script>

<div class="nouns-searchy">
  <div class="search-wrapper">
    <Icons
      bind:engines
      on:newSelection={(e) => select(e.detail.position)}
      {searchFocused}
    />
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      id="search"
      class="nouns-search"
      autocomplete="off"
      placeholder="Search"
      bind:this={input}
      bind:value={$searchValue}
      on:keydown={(e) => hotkey(e.key)}
      on:focus={() => (searchFocused = true)}
      on:blur={() => (searchFocused = false)}
    />
  </div>
</div>

<style>
  .nouns-search {
    width: 720px;
    padding: 0.75rem 25px 0.7rem 3rem;

    color: var(--brand-black);
    border: 1px solid #e2e3e8;
    border-radius: 12px;
    background: white;

    resize: false;
    transform: translateX(-1.4rem);
  }

  .nouns-search:focus {
    box-shadow: inset 0 0 0 1px #14161b;
    outline: none;
  }

  :global(.nouns-search:focus .icon) {
    opacity: 1 !important;
  }

  .search-wrapper {
    display: flex;

    width: 500px;
    margin: auto;

    transform: translateX(-12px);
  }

  input {
    font-size: 15px;
  }
</style>
