// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Character, Player } from "../codegen/Tables.sol";
import { VerifySig } from "./utils.sol";

contract DiceSystem is System {
    function rollDice() internal returns (uint8) {
        uint8(keccak256(abi.encode(_msgSender(), block.coinbase, block.number, block.difficulty)));
    }

    function determine(uint8 threshold) public returns (uint8, bool) {
        (rollDice(), rollDice() > threshold);
    }
}
