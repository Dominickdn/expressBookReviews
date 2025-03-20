# coding-project-template

# curl endpoint testing

curl localhost:5000/

curl localhost:5000/isbn/1

curl localhost:5000/author/Chinua%20Achebe

curl localhost:5000/title/Things%20Fall%20Apart

curl localhost:5000/review/1

curl --request POST 'http://localhost:5000/register' \
--header 'Content-Type: application/json' \
--data '{"username": "User", "password": "password"}'

curl --request POST 'http://localhost:5000/customer/login' \
--header 'Content-Type: application/json' \
--data '{"username": "User", "password": "password"}' \
-c cookies.txt

curl --request PUT 'http://localhost:5000/customer/auth/review/1' \
--header 'Content-Type: application/json' \
--cookie cookies.txt \
--data '{"review": "This is a review... very noice..."}'

curl --request DELETE 'http://localhost:5000/customer/auth/review/1' \
--header 'Content-Type: application/json' \
--cookie cookies.txt 


