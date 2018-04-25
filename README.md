# Asset Management API Test

Update config/config.json with your postgres credential

```
npm i -g sequelize
npm install
sequelize db:migrate
sequelize db:seed:all
```

### Run test with

```
npm run test
```

### Run server and test with Postman

```
npm run start
```

When making API request, you should include one header value for authorization otherwise, 401 will be returned.
2 tokens are seeded into database - `FIRST_APP_TOKEN`, `SECOND_APP_TOKEN`

{ token: 'FIRST_APP_TOKEN' }
