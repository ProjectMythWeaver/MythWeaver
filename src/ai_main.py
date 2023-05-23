from langchain.llms import OpenAI
from langchain import Anthropic
from langchain.chains import ConversationChain
from langchain.prompts import (
    PromptTemplate,
)

from langchain.chains import ConversationChain
# from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.output_parsers import CommaSeparatedListOutputParser
from langchain.memory import ConversationBufferMemory
# from langchain import Anthropic
from langchain.chat_models import ChatAnthropic
from print_helper import print_player, print_internal
import data
import json

class PLAYER:
    def __init__(self,traits:str,stats:dict,name:str) -> None:
        self.traits = traits
        self.stats = stats
        self.name = name
class CREATURE(PLAYER):
    def __init__(self,traits:str,stats:dict,name:str,bg:str,desc:str) -> None:
        super().__init__(traits,stats,name)
        self.bg = bg
        self.desc = desc
class DM_STATE_SIMPLE:
    def __init__(self,bg:str,player:PLAYER,creature:CREATURE,quest:str, llm) -> None:
        self.bg = bg
        self.creature=creature
        self.quest=quest
        self.player=player
        self.llm = llm
        self.conv_mem = ConversationBufferMemory()
        self.llm2 = OpenAI(model_name="text-davinci-003", n=2, best_of=2)

        self.initial_internal_msg_for_LLM = f"""
        {self.bg}
        you are going to help me {self.player.name} start my journey, my info are as follows:
        {self.player.traits}
        {json.dumps(self.player.stats)}

        i met the following creature {self.creature.name}:
        {self.creature.traits}
        {json.dumps(self.creature.stats)}

        i am going to do the following quest:
        {self.quest}
        now describe the quest to me, and offer me three options to choose from
        """
        prm = PromptTemplate(input_variables=['history', 'input'], output_parser=None, partial_variables={}, template='The following is a friendly conversation between DM and a player. The DM tries best to give the Player an enjoyable experience\n\nCurrent conversation:\n{history}\nHuman: {input}\nAI:', template_format='f-string', validate_template=True)

        self.conversation_mainGame = ConversationChain(
            llm=self.llm,
            memory=self.conv_mem,
            verbose=False,
            prompt=prm,
        )
    def start_game(self):
        print_internal(self.initial_internal_msg_for_LLM)
        rep = self.conversation_mainGame.predict(input=self.initial_internal_msg_for_LLM)
        print_player(rep)
        return rep
    
    def get_player_choice(self,choice:str):
        """
        rep is the response from the DM
        updatedStats is the updated stats of the player
        """
        player_choice = choice
        print_player(player_choice)
        internal_msg_for_LLM = f"""
        i choose option {player_choice}
        {data.instr_choice}
        """
        print_internal(internal_msg_for_LLM)
        rep = self.conversation_mainGame.predict(input=internal_msg_for_LLM)
        print_player(rep)
        updatedStats = self.llm2(f"""
        {rep}
        retrieve from above message the player stats
        output a json format that can be run with 
        json.loads(json_string)
        only the stats part of the json string
        """)
        print_player("xxxxxxx"+updatedStats)

        return rep,updatedStats


def print_player(text):
    print(text)

def default_game_setting():
    llm= ChatAnthropic(model="claude-v1.3-100k")
    rex_player = PLAYER(data.RexTraits,data.RexStats,"Rex")
    cigmon_creature = CREATURE(data.CigMon_Traits,data.CigMon_Stats,"CigMon",data.CigMon_bg,data.CigMon_Desc)
    dm_state = DM_STATE_SIMPLE(data.backgroundSetting,rex_player,cigmon_creature,data.Quest1,llm)
    return dm_state

if __name__ == "__main__":
    dm_state = default_game_setting()
    rep = dm_state.start_game()
    print_player(rep)
    for i in range(10):
        rep,updatedStats = dm_state.get_player_choice(input("enter your choice"))
        print_player(rep)
        print_player("xxxxx"+updatedStats)
        dm_state.player.stats = updatedStats
if False:
    print_player("\n\n\n***new game start\n\n\n")
    print_internal("\n\n\n***new game start\n\n\n")
    # llm4 = ChatOpenAI(temperature=1, model_name="gpt-4")
    # llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
    # llm4 = ChatAnthropic(model="claude-instant-v1-100k")
    llm= ChatAnthropic(model="claude-v1.3-100k")
    llm2 = OpenAI(model_name="text-davinci-003", n=2, best_of=2)
    conv_mem = ConversationBufferMemory()

    
    rex_player = PLAYER(data.RexTraits,data.RexStats,"Rex")
    cigmon_creature = CREATURE(data.CigMon_Traits,data.CigMon_Stats,"CigMon",data.CigMon_bg,data.CigMon_Desc)
    dm_state = DM_STATE_SIMPLE(data.backgroundSetting,rex_player,cigmon_creature,data.Quest1,llm)

    initial_internal_msg_for_LLM = f"""
    {dm_state.bg}
    you are going to help me {dm_state.player.name} start my journey, my info are as follows:
    {dm_state.player.traits}
    {json.dumps(dm_state.player.stats)}

    i met the following creature {dm_state.creature.name}:
    {dm_state.creature.traits}
    {json.dumps(dm_state.creature.stats)}

    i am going to do the following quest:
    {dm_state.quest}

    now describe the quest to me, and offer me three options to choose from
    """

    prm = PromptTemplate(input_variables=['history', 'input'], output_parser=None, partial_variables={}, template='The following is a friendly conversation between DM and a player. The DM tries best to give the Player an enjoyable experience\n\nCurrent conversation:\n{history}\nHuman: {input}\nAI:', template_format='f-string', validate_template=True)
    conversation_mainGame = ConversationChain(
        llm=llm,
        memory=conv_mem,
        verbose=False,
        prompt=prm,
    )


    print_internal(initial_internal_msg_for_LLM)
    rep = conversation_mainGame.predict(input=initial_internal_msg_for_LLM)
    print_player(rep)

    for round in range(10): 
        # let us start with 10 round of games
        player_choice = input("what is your choice? ")
        print_player(player_choice)
        internal_msg_for_LLM = f"""
        i choose option {player_choice}
        {data.instr_choice}
        """
        print_internal(internal_msg_for_LLM)
        rep = conversation_mainGame.predict(input=internal_msg_for_LLM)
        print_player(rep)
        updatedStats = llm2(f"""
        {rep}
        retrieve from above message the player stats
        output a json format that can be run with 
        json.loads(json_string)
        only the stats part of the json string
        """)
        print_player("xxxxxxx"+updatedStats)
        
