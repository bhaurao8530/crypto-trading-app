from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
import requests
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


cache = {}
CACHE_TIME = 10  


@app.get("/")
def home():
    return {"message": "Crypto API running"}


def get_price(coin="bitcoin"):
    current_time = time.time()

    if coin in cache and current_time - cache[coin]["time"] < CACHE_TIME:
        return cache[coin]["price"]

    url = f"https://api.coingecko.com/api/v3/simple/price?ids={coin}&vs_currencies=usd"

    try:
        response = requests.get(url)
        data = response.json()

        if coin not in data or "usd" not in data[coin]:
            return 0 

        price = data[coin]["usd"]

    except Exception as e:
        print("API Error:", e)
        return 0

    cache[coin] = {
        "price": price,
        "time": current_time
    }

    return price

@app.get("/price")
def price(coin: str = "bitcoin"):
    return {
        "coin": coin,
        "price": get_price(coin)
    }


price_history = []


@app.get("/signal")
def signal(coin: str = "bitcoin"):
    current_price = get_price(coin)

    price_history.append(current_price)

    if len(price_history) > 5:
        price_history.pop(0)

    if len(price_history) < 2:
        return {
            "coin": coin,
            "price": current_price,
            "signal": "HOLD"
        }

    if price_history[-1] > price_history[-2]:
        trade_signal = "BUY"
    else:
        trade_signal = "SELL"

    return {
        "coin": coin,
        "price": current_price,
        "signal": trade_signal
    }