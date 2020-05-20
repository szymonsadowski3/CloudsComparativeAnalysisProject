import decimal
import random
from faker import Faker

from model_schema.models import *
from products import fakeproducts

faker = Faker()

# GENERATION_CFG = {
#     "sections": 3,
#     "threads": 50000,
#     "thread_followers": 10,
#     "posts": 200,
#     "private_msg": 200
# }

# GENERATION_CFG = {
#     "products": 4500,
#     "tags": 450,
#     "product_tags": 9000,
#     "orders": 3000,
#     "orders_products": 3000
# }

GENERATION_CFG = {
  "products": 1500,
  "tags": 150,
  "product_tags": 3000,
  "orders": 1000,
  "orders_products": 1000
}

def get_sentence():
    return faker.sentence(nb_words=6, variable_nb_words=True, ext_word_list=None)


def get_text():
    return faker.text(max_nb_chars=200, ext_word_list=None)


def random_dec():
    return decimal.Decimal(random.randrange(100, 9999)) / 100


def get_random_links():
    return ['https://i.picsum.photos/id/{0}/200/300.jpg'.format(random.randint(0, 300)) for _ in range(3)]


def save_dbobjs(dbobjs):
    for dbobj in dbobjs:
        dbobj.save()


def get_product():
    return random.choice(fakeproducts)


def get_tags():
    return [faker.company_suffix() for _ in range(5)]


products = [
    Product(
        name=get_product(),
        description=get_text(),
        currentPrice=random_dec(),
        illustrativeMediaUrl=get_random_links(),
        tags=get_tags()
    ) for _ in range(GENERATION_CFG["products"])]

users = [
    User(
        username=faker.name(),
        # avatar=None,
        # aboutMe=get_sencence(),
        # signature=get_sencence()
    ) for _ in range(10)
]

ratings = [
    Rating(
        rating=random.choice([1, 2, 3, 4, 5]),
        ratedBy=random.choice(users),
        comment=get_sentence(),
    ) for _ in range(10)
]

product_ratings = []
for product in products:
    for _ in range(3):
        product_ratings.append(ProductRating(product=product, rating=random.choice(ratings)))

orders = [
    Order(
        user=random.choice(users),
        status=random.choice(["awaiting_payment", "paid", "shipped", "received"]),
        shippingAddress=faker.address(),
    ) for _ in range(GENERATION_CFG["orders"])
]

orders_products = [
    OrderProduct(
        order=random.choice(orders),
        product=random.choice(products),
        quantity=random.randint(0, 10),
        singlePrice=random_dec(),
    ) for _ in range(GENERATION_CFG["orders_products"])
]

# private_message = [
#     PrivateMessage(
#         subject=faker.catch_phrase(),
#         message_content=get_text(),
#         sender=random.choice(users),
#         receiver=random.choice(users)
#     ) for _ in range(GENERATION_CFG["private_msg"])
# ]

for x in [
    products,
    users,
    orders,
    orders_products,
    ratings,
    product_ratings
]:
    save_dbobjs(x)
