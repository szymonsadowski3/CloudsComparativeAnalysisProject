from peewee import PostgresqlDatabase

database_connection_mapping = {
    "local": lambda _: PostgresqlDatabase('postgres', user='postgres', password='admin', host='localhost', port=5432),
    "aws": lambda _: PostgresqlDatabase('postgres', user='postgres', password='sadowski608', host='database-2.cvbvtxjktmxu.eu-central-1.rds.amazonaws.com', port=5432),
    "gcp": lambda _: PostgresqlDatabase('postgres', user='postgres', password='postgres', host='35.198.161.68', port=5432),
    "azure": lambda _: PostgresqlDatabase('postgres', user='postgres@praca-mgr-db', password='Bimber123@', host='praca-mgr-db.postgres.database.azure.com', port=5432),
}

used_platform = "local"

pgdb = database_connection_mapping[used_platform]()