// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyMint is ERC20 {

    string tokenName= "Denarius"; // You set the name.
    string tokenSymbol= "DNU"; // You set the symbol.
    uint256 tokenDecimals= 18; // Most tokens use 18 decimal places.
    uint256 maxTokenSupply= 1000000*(10**tokenDecimals); // You set the max supply.
    uint256 prevMintNumber;

    constructor() ERC20(tokenName, tokenSymbol) { 
        /* This function creates the token, but it does not mint any tokens.
            The minting is done by a separate function below. */   
            prevMintNumber = 100000;  
    }
    
    function mintFunction(uint256 amountToMint) public {

        // Amount is submitted as a whole number, but _mint() function is in decimals. 
        uint256 amountInDecmials = prevMintNumber/4*10**tokenDecimals;

        // check that current supply plus new mint amount < token supply 
        uint256 currentSupply = totalSupply(); // Gets the current supply of this token.
        
        // If the new mint would exceed maxTokenSupply, the return an error message.
        require(currentSupply + amountToMint <= maxTokenSupply, 
            "Minting the amount requested would exceed the max sypply allowed.") ;

        /* You could add more requirements here like a restricting who can mint tokens
            or the amount they are allowed to mint. */

        _mint(msg.sender, amountInDecmials);
    }
}
