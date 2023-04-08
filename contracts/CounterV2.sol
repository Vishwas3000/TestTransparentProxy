// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract CounterV2 {
    uint public count;

    function inc() external {
        count += 1;
    }

    function dec() external {
        count -= 1;
    }

    function admin() public pure returns (address) {
        return address(1);
    }

    function implementation() public pure returns (address) {
        return address(2);
    }
}
