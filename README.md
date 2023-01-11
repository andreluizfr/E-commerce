# Nome-temporario

## server

### rodar em desenvolvimento (porta 5000)
```npm run dev```

### rodar em produção (porta 8080)
```npm start```

## web-app

### rodar em desenvolvimento (porta 3000)
```npm start```

### rodar em produção (porta 3000)
```npm run build```
```serve -s build```

## docker
Na raiz do projeto use o comando:
```docker-compose build --no-cache```
Em seguida:
```docker-compose up -d```

Para visualizar a aplicação web acesse http://localhost:3000/ .

Quando quiser descer aplicação use:
```docker-compose down```