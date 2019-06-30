# scanner-s3-buckets


Isso é uma ferramenta em NodeJS pra fazer scanner em S3 de sites na internet

Tendo uma lista válida de sites, basta iniciar o scanner e ele irá retornar sites com S3 em aberto. Milhares talvez milhões de sites tem S3 públicos, alguns desses sites tem graves falhas que permitem usar o S3 como forma de ganhar escalar acesso


**Leia isso:**

https://hackersonlineclub.com/how-i-hacked-amazon-s3-bucket-misconfiguration-in-amazon/


**Alguns exemplos notáveis:**

https://thevoicebrasil.s3.amazonaws.com
https://oantagonista.s3-sa-east-1.amazonaws.com
https://tunein.s3.amazonaws.com
https://tickets.com.s3.amazonaws.com
https://leagueoflegends.com.s3.amazonaws.com
https://webmotors.s3.amazonaws.com
https://santander.s3.amazonaws.com
https://hotmart.com.s3.amazonaws.com
https://expedia.s3.amazonaws.com

*e outros milhares ...*

## Isso chega a ser um problema de segurança?


Depende de cada caso, eu diria que geralmente sim. Ninguém deveria colocar seu bucket aberto pra todo público ver, pelo menos sem opção de listar ou adicionar arquivos. O acesso deve ser controlado. Muito dos buckets tem arquivos sensíveis que não deveriam ser aberto ao público.

O site buckets.grayhatwarfare.com mostra buckets possivelmente inseguros e é muito útil pra quem gosta de red team tests.

## Qual capacidade dessa ferramenta?

Utilizamos uma lista gigante de proxys pra AmazonAWS não bloquear nossas requisições, esses proxys geralmente são pegas em sites como ProxyDaily.com (onde todo dia são lançada milhares de proxy em texto puro). A lista de sites pode ser exportada através do Alexa. 

A lista para fuzzer (brute force nos buckets) foi cedida pela ferramenta do Subsolo (este mesmo que encontrou 10 milhões de dados do Buscapé dando sopa http://abre.ai/buscapedados; blog pessoal dele aqui http://5ubtools.blogspot.com)

## Como rodar a ferramenta?
Apenas dê **node index.js** após instalar as bibliotecas necessárias (**npm install**)

## Contato

Meu e-mail pra contato é email@brunodasilva.com sou programador e atualmente trabalho com consultoria e segurança de informação.

Obrigado
