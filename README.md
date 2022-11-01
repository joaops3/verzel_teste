# verzel_teste

# alterar env com dados do banco para acessar

alterar onde fica root e password. O banco utilizado é  o mysql

DATABASE_URL="mysql://root:password@localhost:3306/verzel_teste"

# rodar comando para criar banco e models
npx prisma migrate dev 

# INSERIR DADOS 

colocar o comando no banco para inserir os dados, para fazer testar no front-end

INSERT INTO verzel_teste.users (id,name,password,admin,created_at) VALUES
	 ('6a030289-5237-41e9-a7b0-9e8d0254e619','client','$2b$04$izAsWKnUOzX88wXKPR2cUOe6lNnhLgM3oTx/lUp37IywvjuT2SwnG',0,'2022-10-29 22:08:19.463000000'),
	 ('8ac4c400-bb6a-4d0d-8da2-ae0f4b2f008f','admin','$2b$04$EL2B4W9KgQ1uiu2UgppeB.KMpcdHQokmoHeeUsM2B1.bXzBJthyIK',1,'2022-10-29 22:08:43.734000000');



INSERT INTO verzel_teste.cars (id,name,model,brand,price) VALUES
	 ('49c7ae64-f4dd-4bde-a795-3bd7b291e4ca','onix','2016','gm',30000),
	 ('8e3c7a62-e71c-42f8-8055-545b674e8a4d','Ka','2020','Ford',50000),
	 ('96929583-6e28-4886-bee3-77794a838e43','civic','2018','honda',70000),
	 ('e5bc8ed9-b583-46e3-a744-163adeb9b5ca','Clio','2020','renault',10000);

INSERT INTO verzel_teste.photos (url,carId) VALUES
	 ('photo1667174258766.jpg','e5bc8ed9-b583-46e3-a744-163adeb9b5ca'),
	 ('photo1667158522505.jpg','8e3c7a62-e71c-42f8-8055-545b674e8a4d'),
	 ('photo1667158856399.jpg','96929583-6e28-4886-bee3-77794a838e43'),
	 ('photo1667158962456.webp','49c7ae64-f4dd-4bde-a795-3bd7b291e4ca'); 

# rodar back-end

Para rodar o backend utilizar o comando:

npm run dev

# rodar frontend 

Para rodar o frontend utilziar o comando:

npm run dev