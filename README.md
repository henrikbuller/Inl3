## Författare

Henrik Büller
java 20

## Kort om inlämningen

Jag har utgått från koden (yrgohrm/kprog-fortune) och gjort en enkel webbapp som
kan visa fyra kategorier av fortunes samt en sökfunktion som visar de 10 bästa sökresultaten.

Den är designad mobile first och innehåller media queries för att hantera större enheter.

Händelser styrs av Event Listeners som reagerar på 'click' och 'keypress',
vad jag förstått och upplevt har dessa bra stöd även på mobila webbläsare med touch.

## Filer

index.html

Innehåller html kod med olika div-containers/-wrappers som gör att
elementen går att hantera med flex.

style.css

Enkel css kod med min-width brytpunkter på 768px & 912px.

script.js

Javascript koden bygger på async funktionen fortuneGenerator(API, action),
action=get genererar en fortune från givet API,
action=search söker efter en fortune.

# kprog-fortune

## General

This is a simple web service that can deliver "fortunes" similar to the old
Unix program `fortune`.

It is also a simple web server capable of delivering static file contents making
it possible to deliver web pages from the same domain as the web service thus
removing all possible problems with same-origin-policy.

## Running

Run with Java 11+ using the fat jar. The program takes two optional parameters
`-d <webroot>` and `-p <port>` to control where static content is located as
well as setting the web server port.

By default it uses the port 8080 and the directory webroot in the current
directory.

`java -jar kprog-fortune-1.0-all.jar`

The release contains a sample application so run the server and visit:
`http://localhost:8080/index.html`.

## API

The API is very simple and has five endpoints that return JSON data.

### GET /api/fortune

Returns a random fortune as a json-object.

{ fortune: '...' }

### GET /api/short

Returns a short random fortune (160 characters or less) as a json-object.
Same format as for `/api/fortune`.

### GET /api/showerthought

Returns a shower thought as a json-object.
Same format as for `/api/fortune`.

### GET /api/traditional

Returns a traditional (Unix) fortune as a json-object.
Same format as for `/api/fortune`.

### GET /api/query?q=<query>

Query all fortunes for matching fortunes. Will return a list of all fortunes
that contains the sent string as a substring (case sensitive). The query must
contain at least three characters.

Will return a list of fortunes in the same format as `/api/fortune`.
