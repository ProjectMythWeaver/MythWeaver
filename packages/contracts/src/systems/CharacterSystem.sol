// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Character, Player } from "../codegen/Tables.sol";
import { VerifySig } from "./utils.sol";

contract CharacterSystem is System {
    function initialize() public returns (uint8){
        // TODO: turn this into private
        Character.set(keccak256("ISTJ"), "Eve the Explorer", "Dependable", "Stubborn", 40, 30, 20, 15, 20);
        Character.set(keccak256("ISFJ"), "Gwen the Guardian", "Loyal", "Reluctant to change", 45, 30, 15, 20, 30);
        Character.set(keccak256("INFJ"), "Nora the Nurturer", "Insightful", "Overly sensitive", 40, 20, 20, 30, 30);
        Character.set(keccak256("INTP"), "Eve the Explorer", "Intellectual", "Aloof", 35, 35, 25, 30, 20);
        Character.set(keccak256("ESFJ"), "Alice the Altruistr", "Selfless", "Needy", 50, 20, 15, 25, 25);
        Character.set(keccak256("ENFP"), "Felix the Free Spirit", "Enthusiastic", "Overly optimistic", 35, 35, 30, 40, 10);
        Character.set(keccak256("ENTP"), "Liam the Luminary", "Innovative", "Argumentative", 30, 25, 30, 40, 10);
        Character.set(keccak256("ESTP"), "Oscar the Opportunist", "Energetic", "Impatient", 30, 40, 35, 30, 15);
        
        return 8;
    }

    function buildCharacter(
        string calldata personality, 
        address controller,
        bytes memory sig
    ) public returns (bytes32) {
        // check controller's signature
        bytes32 _msgHash = keccak256(abi.encodePacked(controller, _msgSender())); 
        address recoveredAddr = VerifySig.recoverSigner(VerifySig.getEthSignedMessageHash(_msgHash), sig);
        require(recoveredAddr == controller,"Controller wallet is not matched!");

        // retrieve the character skills
        uint256 tableId = uint256(keccak256("Character"));
        bytes32[] memory key = new bytes32[](1);
        key[0] = keccak256(personality);

        // check if registered
        // emit Log("already registered");

        bytes memory loadedLife = StoreCore.getField(tableId, key, 3);
        uint8 life = (uint32(Bytes.slice1(loadedLife, 0)));
        bytes memory loadedStamina = StoreCore.getField(tableId, key, 4);
        uint8 stamina = (uint32(Bytes.slice1(loadedStamina, 0)));
        bytes memory loadedTransparency = StoreCore.getField(tableId, key, 5);
        uint8 transparency = (uint32(Bytes.slice1(loadedTransparency, 0)));
        bytes memory loadedDecentralization = StoreCore.getfield(tableId, key, 6);
        uint8 decentralization = (uint32(bytes.slice1(loadedDecentralization, 0)));
        bytes memory loadedPrivacy = StoreCore.getfield(tableId, key, 7);
        uint8 privacy = (uint32(bytes.slice1(loadedPrivacy, 0)));
        Player.set(keccak256(controller), life, stamina, transparency, decentralization, privacy);

        return keccak256(_msgSender());
    }

    function migrateCharacter(
        address controller, 
        bytes memory sig
    ) public returns (bytes32) {
        // check controller's signature
        bytes32 _msgHash = keccak256(abi.encodePacked(controller, _msgSender())); 
        require(
            VerifySig.recoverSigner(VerifySig.getEthSignedMessageHash(_msgHash), sig) == controller,
            "Controller wallet is not matched!"
        );
        //try:
        Player.set(keccak256(_msgSender()), Player.get(keccak256(_msgSender())));

        return keccak256(_msgSender());
    }

}
