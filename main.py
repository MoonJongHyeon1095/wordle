from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# 순서실험결과 : 해당 fetch 경로가 html 마운트의 위에 있어야 한다. 밑으로 들어가면 html로드 이후로 밀려 못읽는다.
answer = 'train'
@app.get('/answer')
def get_answer():
    return answer

# https://www.starlette.io/staticfiles/
# html - Run in HTML mode. Automatically loads index.html for directories if such file exist.
app.mount("/", StaticFiles(directory="static", html=True), name="static")



# class Item(BaseModel):
#     id:int
#     content:str

# items = ['a', 'b', 'c','d']

# @app.get("/items/{id}")
# def read_id_item(id):
#     return items[int(id)]

# # 쿼리스트링 /items?skip=n&limit=n
# @app.get("/items")
# def read_item(skip:int=0, limit:int=10):
#     return items[skip:skip+limit]

# @app.post('/items')
# def post_item(item:Item):
#     items.append(item.content)
#     return 'success'