# machine intelligence content

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


###
If getting the issue below, execute the following command in the frontend folder `./node_modules/.bin/eslint --init`
```
Module build failed (from ./node_modules/eslint-loader/index.js): 
Error: No ESLint configuration found
```

### Mongo Commands
Change specific document property. First parameter is query. Second parameter is property to change and its value.
```
db.users.updateOne({ email:'ch3njus@gmail.com' },{ $set: { user_type: 2 }})
```

Find and view specific property of a document. First parameter is query. Second parameter is property and 1 indicates to return it only. Can list more properties in the second parameter e.g. `{ user_type: 1, url: 1 }`. This will always return the `_id` with the result.
```
db.users.find({ email: 'ch3njus@gmail.com'}, { user_type: 1 })
```

To remove a record via Mongo shell
```
db.users.remove({ email: 'justin@machineintelligence.cc'})
```

To remove all records with empty titles:
```
db.paper.deleteMany({ title: '' })
```

To export collections as json files e.g:
```
mongoexport --db profile --collection conferences --out conf_reg.json
```
