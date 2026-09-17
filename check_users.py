import sqlite3

conn = sqlite3.connect("govconnect.db")
cursor = conn.cursor()

cursor.execute("SELECT COUNT(*) FROM users")

print(cursor.fetchone())

conn.close()