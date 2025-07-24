curl -X POST https://api.vault.chiatest.net/graphql \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_session=8wsuhxqpjo0hhp0d8xvuveh13v15he8h1nawd7gg" \
  -H "Cookie: _pk_id.4.4078=d2fc1814c13f0d09.1751700993." \
  -H "Cookie: _pk_ses.4.4078=1" \
  -d '{
    "operationName":"updateUser",
    "variables":{
      "input":{
        "id":"User_utcyjsacpxgct4qy0l796qpz",
        "name":"Bitsploitedmmm"
      }
    },
    "query":"mutation updateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    user { id updatedAt name email __typename }\n    __typename\n  }\n}"
  }'
