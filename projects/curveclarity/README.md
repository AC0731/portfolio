# CurveClarity

A launch-design and disclosure prototype for the Meteora DBC side track. The product idea is to help builders make launch mechanics understandable before buyers transact: compare illustrative curve profiles, set scenario assumptions, disclose fee splits and graduation targets, and export a plain-language launch brief.

## Current prototype

- Responsive launch-studio interface
- Three illustrative curve profiles
- Adjustable supply, graduation target, fee, and community share
- Clarity checklist that responds to scenario values
- JSON launch brief export
- Clear warnings that values and curve previews are not SDK quotes or deployment instructions

## Run locally

```bash
npm install
npm run dev
```

## Next work before hackathon submission

1. Replace illustrative curve paths with quote simulations from Meteora's official DBC TypeScript SDK.
2. Add a wallet-connected devnet flow and verify the generated configuration and pool on-chain.
3. Add allocation and vesting disclosures and a shareable launch receipt.
4. Record a short demo showing a user choosing a profile, reviewing the receipt, and verifying the devnet transaction.

Official developer references: https://docs.meteora.ag/developer-guides/dbc
