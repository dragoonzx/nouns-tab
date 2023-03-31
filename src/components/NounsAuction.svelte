<script lang="ts">
  import { queryStore, getContextClient } from "@urql/svelte";
  import { auctionQuery } from "src/graph";
  import { createEventDispatcher, onMount } from "svelte";
  import loadingNoun from "../assets/icons/loading-skull-noun.gif";

  const client = getContextClient();
  const queryAuction = auctionQuery;
  const auction = queryStore({
    client: client,
    query: queryAuction,
  });

  const dispatch = createEventDispatcher();

  let bgColor = "0";

  const dispatchColorChange = () => {
    bgColor = $auction.data.auctions[0].noun.seed.background;
    dispatch("colorChange", bgColor);
  };

  $: $auction.data && dispatchColorChange();

  const getRemainingTime = () => {
    if (!$auction.data?.auctions[0].endTime) {
      return { total: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const now = new Date();
    const endTime = new Date($auction.data?.auctions[0].endTime * 1000);
    // @ts-expect-error
    const total = endTime - now;
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return { total, hours, minutes, seconds };
  };

  let remaining = getRemainingTime();

  onMount(() => {
    setInterval(() => {
      remaining = getRemainingTime();
    }, 1000);
  });
</script>

<div class="nouns-auction">
  {#if $auction.fetching}
    <div class="img-wrapper">
      <img class="loading-noun" src={loadingNoun} alt="loading noun" />
    </div>
  {:else if $auction.error}
    <p>Oh no... {$auction.error.message}</p>
  {:else}
    <div class="row">
      <div class="noun-wrapper">
        <img
          src={`https://noun.pics/${$auction.data.auctions[0].id}.svg`}
          alt=""
        />
      </div>
      <div>
        <h4 class="date">
          {Intl.DateTimeFormat("en-EN", { dateStyle: "medium" }).format(
            $auction.data.auctions[0].endTime * 1000
          )}
        </h4>
        <h1 class="name">Noun {$auction.data.auctions[0].id}</h1>
        <div class="row">
          <div class="bid-col">
            <p class="bid">Current bid</p>
            <p class="bid-highest">
              Ξ {(Number($auction.data.auctions[0].amount) * 10 ** -18).toFixed(
                2
              )}
            </p>
          </div>
          <div class="col time-col">
            <p class="bid">Auction ends in</p>
            <div class="bid-highest">
              <span>{remaining.hours}h</span>
              <span>{remaining.minutes}m</span>
              <span>{remaining.seconds}s</span>
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .row {
    display: flex;
    align-items: center;
  }

  .noun-wrapper {
    padding: 0 12px;
    align-self: end;
  }

  .date {
    color: #79809c;
    font-weight: 700;
    font-size: 17px;
    line-height: 27px;
  }

  .time-col {
    padding-left: 40px;
  }

  .name {
    color: #151c3b;
    font-family: "Londrina Solid";
    font-size: 68px;
    margin-bottom: 10px;
  }

  .bid {
    font-weight: 700;
    font-size: 18px;
    color: #79809c;
  }

  .bid-highest {
    color: #151c3b;
    font-weight: 700;
    font-size: 32px;
    margin-top: 4px;
  }

  .bid-col {
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    border-right: 1px solid rgba(121, 128, 156, 0.28627450980392155);
  }

  .col {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1380px) {
    .name {
      font-size: 48px;
    }

    .bid-highest {
      font-size: 22px;
    }
  }
</style>
