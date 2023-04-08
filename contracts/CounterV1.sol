// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract CounterV1 {
    uint public count;

    event AddedCount(uint value);

    function inc() external {
        count += 1;
    }

    function admin() public pure returns (address) {
        return address(1);
    }

    function implementation() public pure returns (address) {
        return address(2);
    }

    function addToCount(uint val) public returns (uint256) {
        emit AddedCount(val);
        return count + val;
    }
}
