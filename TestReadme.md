## Getting started

There are currently four pools setup in the test contract. wEth, HNY, Agaave, and Dai.

You can obtain wEth on Rinkeby by following (this link)[https://rinkeby.etherscan.io/address/0xc778417E063141139Fce010982780140Aa0cD5Ab#writeContract] and interacting with the deposit function.

You can obtain Dai on Rinkeby by following the instructions outlined (here)[https://ethereum.stackexchange.com/questions/82556/how-to-obtain-rinkeby-dai]

To obtain HNY or Agave on Rinkeby, please reach out to saltorious#7801, or any moderator within the tulip swarm.

## Sending a deposit
To create a deposit:
 -- Visit the farm page, and connect your account via the "connect account" button.
 -- Click the "Stake" button for the asset you wish to deposit
 -- Move the sliders corresponding to the amount of the token you would like to stake, and the length of time you would like to stake
 -- If you are required to approve your spend balance click 'Approve' and sign the transaction.
 -- Click "Deposit" and sign the transaction.

## Viewing your depsits
To view a deposit: 
 -- Visit the farm page, and connect your account via the "connect account" button.
 -- You will be able to view your deposits on the "My Deposits" tab.

## Withdrawing a deposit
 -- Visit the farm page, and connect your account via the "connect account" button.
 -- Navigate to the "My Deposits" tab.
 -- Click the 'Withdraw' button on the deposit you would like to withdraw

## Things to be aware of
 -- APY's for the farm page will be added once the APY stats have been included in the tulip-data module.
 -- We are still working on error handling for errors when interacting with the contract. For example if you try to close your deposit before the unlock time, nothing will happen. Errors messages will be added in the next push.
 -- The harvest function is not yet hooked up, as this function is not included in the current deployed version of the smart contract. This will be updated once the test-net contract has been updated to the current version. 
 -- The USD equivalents on the smart contract will be added once that data is included in the tulip-data module.
 -- If you are not connected to the rinkeby network when you land on the farm page, you will see the loading bee indefinitely. You will need to change your metamask RPC to rinkeby and reload the page if you encounter this.  

