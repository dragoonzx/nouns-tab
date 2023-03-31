import NounsTab from "src/components/NounsTab.svelte";

const target = document.getElementById("app");

function render() {
  new NounsTab({ target });
}

document.addEventListener("DOMContentLoaded", render);
