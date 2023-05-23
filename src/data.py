import json
backgroundSetting = """"
you are a DM master of a DND world 

the world is in the following setting:
\"\"\"
Intersubjective realities - religions and money 
Now, using the affordances of autonomy and transparency from Blockchain World-substrates, we can grant some of the rigidity and objectivity of our shared physical reality into our shared intangible realities.
Ethereum, the decentralized blockchain, is like an autonomous world. 
Blockchain enables people around the world to build on the same source of truth. 
> “To live together in the world means essentially that a world of things is between those who sit around it.”
Common sense might better be called “communal sense.”
We all create memories on the chain, whether it is a meme coin or __. 
Each of these tokens is a snapshot of our past and weaves into our collective memories of crypto.
\"\"\"

Although it is a diverse world, there is no violence in the world, only negotiation and coordination to advance together and resolve conflict.  
"""

RexTraits = """
 **Rex the Rationalist**
    - **Personality**: INTP, The Architect
    - **Element**: Fire
    - **Positive Trait**: Intellectual
    - **Negative Trait**: Aloof
    - **Stats**: Life: 35, Stamina: 35, Transparency: 25, Decentralization: 30, Privacy: 20
    - **Alignment**: Neutral, leans toward Self Interest
"""

RexStats  = {
  "Stats": {
    "Life": 35,
    "Stamina": 35,
    "Transparency": 25,
    "Decentralization": 30,
    "Privacy": 20
  }
}

RexStats_json = json.dumps(RexStats)

CigMon_bg = """
CigTokemon is a creature inspired by CigToken which is inspired by the 2nd most common cryptopunks traits. The token appears to be a meme coin with a punk attitude at the surface, but the heart of the project is to explore the application of harberger taxes. The project was launched in December 2021 and failed to gain adoptions, despite the best intentions and relatively successful plans.the creature h emphasize on emotional turbulence and learnings from this social experiment on blockchain.

"""

CigMon_Desc = """
CigTokemon is a peculiar creature that embodies the essence of CigToken. It stands at about 3 feet tall, resembling an anthropomorphic blend of a rebellious punk figure and a mischievous crypto imp. Its body is comprised of digits and blockchain codes swirling throughout its being, giving off an ethereal vibe. The most striking feature of this creature is its signature cigarette, defying norms and emphasizing the punk attitude it represents. Though it appears intimidating and enigmatic, CigTokemon possesses an underlying eagerness to explore the applications of harberger taxes and contribute positively to the blockchain world.

"""

CigMon_Traits = """ 
Positive Trait: Resilient
Negative Trait: Inscrutable
Element: Digital
Alignment: Chaotic Neutral (leans towards discovery and innovation)
"""

CigMon_Stats = {
  "Stats": {
    "Life": 35,
    "Stamina": 25,
    "Transparency": 15,
    "Decentralization": 30,
    "Privacy": 20
  }
}
CigMon_Stats_json = json.dumps(CigMon_Stats)

Quest1 = """
Quest 1: Reunite the scattered CigPunks
Goal: On your journey with CigTokemon, retrieve and form a support group of similarly-themed token creatures known as CigPunks.
Puzzle: Navigate the multi-layered puzzle dungeon "Vaporized Halls," concealed behind the swirling digits and strings of code surrounding CigPunks in their habitats. Each CigPunk holds a key to unlock the next room.
Reward: By forming the diverse support group, a unique community in the blockchain world will be established, enhancing CigTokemon, CigPunks, and future projects' capabilities influenced by the Harberger Tax ethos.
"""

instr_quest_dice = """
this should be a very hard quest.

now i will tell you what i want to do, and you will tell me the result of my action, remember to give me challenge at most of the time.
If you think my action is hard to achieve, then you should reply with a dice check on my skills
once a while you should force meto make a clear choice, reply me with 3 options
"""


instr_quest = """
this should be a very hard quest.
now i will tell you what i want to do, and you will tell me the result of my action, remember to give me challenge at most of the time.
once a while you should force meto make a clear choice, reply me with 3 options
"""

instr_choice2 = """
{
private message to DM ( these are not from Player)
1. only options 3, and 2 will be successful , option 1 will result in failure
2. when an option results in failure , you should give reason, the reason should be in the form of : you do not have enough points on one of the following skils Life:, Stamina:, Transparency: , Decentralization: , Privacy: 
3 you should minus one of player status point by 1, if there is failure, but plus 1 if there is success
4 you should offer more options for the next step no matter failure or success, there is no pre-defined path for the player, but you should make sure the player will not be stuck in the game
5 output only the result of the action, the reason, the current progress of the quest the new 3 options and the updated player stats in json form, but nothing else
}
"""

instr_choice = """
{
private message to DM ( these are not from Player)
1. only options 3, and 2 will be successful , option 1 will result in failure
2. when an option results in failure , you should give reason, the reason should be in the form of : you do not have enough points on one of the following skils Life:, Stamina:, Transparency: , Decentralization: , Privacy: 
3 you should offer more options for the next step no matter failure or success, there is no pre-defined path for the player, but you should make sure the player will not be stuck in the game
4 output only the result of the action, the reason, the current progress of the quest the new 3 options and the updated player stats in json form, but nothing else
}

here is a sample output 

{
"result": "Success", 
"reason": "you have high enough points on Decentralization: and Privacy: to succeed",
"progress": "You have contacted 3 out of 10 CigPunks. They have agreed to meet and discuss forming a support group. However, the remaining CigPunks still need to be found to unlock all rooms of the Vaporized Halls.",
"options": 
[
"1. Continue searching the blockchain for the remaining CigPunks and convince them to join", 
"2. Return to exploring the Vaporized Halls puzzle dungeon to find keys and CigPunks",
"3. Ask CigMon to help search for and contact the remaining CigPunks"
],
"stats": {
"Life": 35, 
"Stamina": 35,
"Transparency": 25,
"Decentralization": 30, 
"Privacy": 20 
} 
}


"""
