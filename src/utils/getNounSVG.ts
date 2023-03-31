import { Contract, ethers } from "ethers";

interface INounSeed {
  accessory: string;
  background: string;
  body: string;
  glasses: string;
  head: string;
}

const RPC_URL = "https://rpc.ankr.com/eth";

const abi = [
  "function generateSVGImage(INounsSeeder.Seed seed) returns (string)",
];

export const getNounSVG = async (seed: INounSeed) => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const NounsDescriptorV2 = new Contract(
    "0x6229c811D04501523C6058bfAAc29c91bb586268",
    abi,
    provider
  );

  const svgImage = await NounsDescriptorV2.generateSVGImage(seed);
  console.log({ svgImage });
  return svgImage;
};
