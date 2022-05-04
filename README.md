# dApp-wave-portal
A simple dApp developed using the buildspace project instructions.

## buildspace project link
https://bld.so/HeSg6

you can enroll in above project to get start in the blockchain development.


# Live App URL
https://unwittingstudioussource.greathayat.repl.co/

## Backend Setup (smart contract)

- cd `backend-app`
- npm install
- add `.env` file with two values, `ALCHEMY_API_URL` and `PRIVATE_KEY` (OPTIONAL STEP)

## How to run the backend?

In order to run it locally,

- npx hardhat node
- npx hardhat scripts/deploy.js --network localhost

In order to deploy it using Alchemy,

- npx hardhat scripts/deploy.js --network ropsten
- for this step, make sure, you have an account on Alchemy.


## Frontend Setup (ReactJS Application)

- cd `frontend-app`
- npm install
- npm start






#### NOTE: I HAVE DEPLOYED THIS CONTRACT ON ROPSTEN TEST NETWORK USING ALCHEMY
