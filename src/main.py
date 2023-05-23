from fastapi import FastAPI
# (Include the provided code here, but remove the `if __name__ == "__main__"` block)
from ai_main import default_game_setting
dm_state = default_game_setting()

app = FastAPI()

@app.get("/start_game")
def start_game():
    dm_state = default_game_setting()
    rep = dm_state.start_game()
    return {"response": rep}

@app.get("/player_choice/{choice}")
def player_choice(choice: str):
    rep, updatedStats = dm_state.get_player_choice(choice)
    return {"response": rep, "updatedStats": updatedStats}


# haven't tested, do not know whether works
# uvicorn main:app --host 0.0.0.0 --port 8000 --reload