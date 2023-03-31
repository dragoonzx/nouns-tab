<script lang="ts">
  import { queryStore, getContextClient } from "@urql/svelte";
  import { proposalsQuery } from "src/graph";
  import Skeleton from "svelte-skeleton/Skeleton.svelte";

  const proposals = queryStore({
    client: getContextClient(),
    query: proposalsQuery,
  });

  const proposalClassName = (proposal: string): string => {
    switch (proposal) {
      case "ACTIVE":
      case "PENDING":
        return "proposal-pending";
      case "CANCELLED":
        return "proposal-canceled";
      case "DEFEATED":
        return "proposal-defeated";
      case "EXECUTED":
        return "proposal-executed";
      default:
        return "proposal-pending";
    }
  };
</script>

<div>
  <h2 class="proposals-header">Recent proposals</h2>
  {#if $proposals.fetching}
    <!-- {#if true} -->
    <Skeleton height={338} width={600}>
      <rect width="600px" height="80" x="0" y="10" rx="12" ry="12" />
      <rect width="600px" height="80" x="0" y="110" rx="12" ry="12" />
      <rect width="600px" height="80" x="0" y="210" rx="12" ry="12" />
      <rect width="600px" height="80" x="0" y="310" rx="12" ry="12" />
    </Skeleton>
  {:else if $proposals.error}
    <div>Oh no... {$proposals.error.message}</div>
  {:else}
    <div class="proposals-list">
      <ul>
        {#each $proposals.data.proposals as proposal}
          <li>
            <a
              class="proposal-link"
              href="https://nouns.wtf/vote/{proposal.id}"
              target="_blank"
              rel="noreferrer"
              ><div class="proposal-info">
                <span class="proposal-title"
                  ><span class="proposal-id">{proposal.id}</span>
                  <span>{proposal.title}</span></span
                >
                <div class="proposal-status-wrapper">
                  <div
                    class={`proposal-status ${proposalClassName(
                      proposal.status
                    )}`}
                  >
                    {proposal.status}
                  </div>
                </div>
              </div>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .proposals-header {
    color: #151c3b;
    font-family: "Londrina Solid";
    font-size: 68px;
    margin-bottom: 16px;
    text-align: center;
    max-width: 600px;
    width: 600px;
  }

  .proposals-list {
    max-width: 600px;
    width: 600px;
  }

  .proposal-link {
    padding: 1rem;
    margin-top: 0.4rem;
    display: flex;
    flex-direction: column;
    border: 1px solid #e2e3e8;
    box-sizing: border-box;
    border-radius: 16px;
    background: #f4f4f8;
    font-size: 22px;
    font-family: "PT Root UI";
    font-weight: 700;
    text-decoration: none;
    color: inherit;
    margin-bottom: 1rem;
  }

  .proposal-link:hover {
    background: #fff;
    color: inherit;
    cursor: pointer;
  }

  .proposals-countdown {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.5019607843137255);
    min-width: max-content;
  }

  .proposal-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .proposal-title {
    width: 80%;
  }

  .proposal-id {
    color: #8c8d92;
    margin-right: 0.5rem;
  }

  .proposal-status-wrapper {
    margin-left: 0.5rem;
  }

  .proposal-status {
    font-family: "PT Root UI";
    font-weight: 700;
    color: #fff;
    border-radius: 8px;
    font-size: 14px;
    border: 0;
    padding: 0.36rem 0.65rem;
  }

  .proposal-countdown-wrapper {
    background-color: rgba(140, 141, 146, 0.1);
    border-radius: 8px;
  }

  .proposal-pending {
    background-color: #43b369;
  }

  .proposal-canceled {
    background-color: #8c8d92;
  }

  .proposal-defeated {
    background-color: #e40536;
  }

  .proposal-executed {
    background-color: #4965f0;
  }

  @media (max-width: 1380px) {
    .proposals-header {
      font-size: 48px;
    }

    .proposal-link {
      font-size: 18px;
    }

    .proposals-header {
      width: auto;
    }
  }
</style>
