# scanner-s3-buckets


Isso é uma ferramenta em NodeJS pra fazer scanner em S3 de sites na internet

Tendo uma lista válida de sites, basta iniciar o scanner e ele irá retornar sites com S3 em aberto. 

Milhares talvez milhões de sites tem S3 públicos, alguns desses sites tem graves falhas que permitem usar o S3 como forma de escalar acesso


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

Em um desses buckets encontrei algo relacionado ao Banco Pan no qual expõe milhões de dados de usuários e aparentemente já tem reclamações a [respeito disso na Internet](https://www.reclameaqui.com.br/banco-pan/vazamento-de-dados_8MYIwYIvUCW1ZEMN/);
 é realmente preocupante esses dados serem vazados na internet. Lembrando que não são casos isolados e existe um projeto no Github só pra mostrar os vazamentos que já aconteceram [usando servidores S3](https://github.com/nagwww/s3-leaks) (alguns envolvendo NSA, CIA, Facebook e várias corporações grandes)


*e outros milhares ...*

## Isso chega a ser um problema de segurança?


Depende de cada caso, eu diria que geralmente sim. Ninguém deveria colocar seu bucket aberto pra todo público ver, pelo menos sem opção de listar ou adicionar arquivos. O acesso deve ser controlado. Muito dos buckets tem arquivos sensíveis que não deveriam ser aberto ao público.

O site buckets.grayhatwarfare.com mostra buckets possivelmente inseguros e é muito útil pra quem gosta de red team tests.

## Qual capacidade dessa ferramenta?

Utilizamos uma lista gigante de proxys pra AmazonAWS não bloquear nossas requisições, esses proxys geralmente são pegas em sites como ProxyDaily.com (onde todo dia são lançada milhares de proxy em texto puro). A lista de sites pode ser exportada através do Alexa.

A lista para fuzzer (brute force nos buckets) foi cedida pela ferramenta do [Subsolo](http://5ubtools.blogspot.com) (este mesmo que encontrou [10 milhões de dados do Buscapé dando sopa](http://abre.ai/buscapedados))

## Como rodar a ferramenta?

**proxyList.log** deverá ter sua lista de proxys (procure uma boa)<br/>
**sitesCheckout.log** irá ter os sites para verificar (já deixei os sites top da Alexa)<br/>
**sitesInicio.log** irá ter uma lista de fuzzers pra colocar no inicio do nosso brute force<br/>
**sitesFinal.log** irá ter uma lista de fuzzers pra colocar no final do nosso brute force<br/>
**subdomais.log** terá uma lista de subdomínios pra acrescentar em nosso bruteforce<br/>
<br/><br/>
Apenas dê **node index.js** após instalar as bibliotecas necessárias (**npm install requests**)

Vão ser gerado 2 arquivos doublefindUris e findUris

O **findUris** é a lista real de buckets encontrados, o **doubleFindUris** é uma lista de possíveis sites que podem ter retornado com falso positivo (algumas vezes as proxy de má qualidade retornam falsos positivos)


## Contato

Meu e-mail pra contato é email@brunodasilva.com, atualmente trabalho com consultoria e sou pesquisador da área de segurança da informação.

Obrigado
