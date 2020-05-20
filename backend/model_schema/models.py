import datetime

from peewee import *

from db_configuration.db_config import pgdb

from playhouse.postgres_ext import ArrayField


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = pgdb


class User(BaseModel):
    username = CharField()
    avatarUrl = TextField(default='https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png')


class Product(BaseModel):
    name = CharField()
    description = TextField(null=True)
    # leftInStock = IntegerField()
    currentPrice = DecimalField()
    illustrativeMediaUrl = ArrayField(TextField)
    createdAt = DateTimeField(default=datetime.datetime.now)
    tags = ArrayField(TextField)
    brand = CharField(default='other')


class Rating(BaseModel):
    rating = IntegerField()
    ratedBy = ForeignKeyField(User)
    comment = TextField(null=True)
    createdAt = DateTimeField(default=datetime.datetime.now)


class ProductRating(BaseModel):  # JOIN TABLE
    product = ForeignKeyField(Product)
    rating = ForeignKeyField(Rating)


class Order(BaseModel):
    user = ForeignKeyField(User)
    status = CharField()
    shippingAddress = TextField()
    createdAt = DateTimeField(default=datetime.datetime.now)
    updatedAt = DateTimeField(default=datetime.datetime.now)


class OrderProduct(BaseModel):  # JOIN TABLE
    order = ForeignKeyField(Order)
    product = ForeignKeyField(Product)
    quantity = IntegerField()
    singlePrice = DecimalField()


if __name__ == '__main__':
    pgdb.create_tables([
        User,
        Product,
        Order,
        OrderProduct,
        Rating,
        ProductRating
    ])
