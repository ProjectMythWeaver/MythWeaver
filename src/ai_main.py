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
    def __init__(self,bg:str,player:PLAYER,creature:CREATURE,quest:str) -> None:
        self.bg = bg
        self.creature=creature
        self.quest=quest
        self.player=player
def print_player(text):
    print(text)

if __name__ == "__main__":
    print_player("\n\n\n***new game start\n\n\n")
    print_internal("\n\n\n***new game start\n\n\n")
    # llm = ChatOpenAI(temperature=0, model_name="gpt-4")
    # llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
    # llm = ChatAnthropic(model="claude-instant-v1-100k")
    llm = ChatAnthropic(model="claude-v1.3-100k")
    conv_mem = ConversationBufferMemory()
    conversation = ConversationChain(
        llm=llm,
        memory=conv_mem,
        verbose=False
    )
    rex_player = PLAYER(data.RexTraits,data.RexStats,"Rex")
    cigmon_creature = CREATURE(data.CigMon_Traits,data.CigMon_Stats,"CigMon",data.CigMon_bg,data.CigMon_Desc)
    dm_state = DM_STATE_SIMPLE(data.backgroundSetting,rex_player,cigmon_creature,data.Quest1)

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
    print_internal(initial_internal_msg_for_LLM)
    rep = conversation.predict(input=initial_internal_msg_for_LLM)
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
        rep = conversation.predict(input=internal_msg_for_LLM)
        print_player(rep)
        
