# Platforma na monitorování uzlů v P2P síti DASH

### Projekt do předmětu BDA, VUT FIT

### Bc. Daniel Pátek

\
Tento program umožňuje zmapován všech dostupných uzlů v síti dash. Získáné informace ukládá do databáze `Mongo`. Program byl napsán v jazyce `Python 3.8`. Pro webovou aplikaci byl využit framework `Next.js`.

### Instalace

Pro spuštění programu je nutné nejprve stáhnout [`dashcore`](https://github.com/dashpay/dash/releases) ve verzi 18.0 a vyšší.
Následně nainstalovat databázi [`mongo`](https://www.mongodb.com/try/download/community).  
Pro instalaci samotného nástroje je nutné nainstalovat závislosti, ideálně následovně:

```sh
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

Pro využití webového dahboardu, který slouží k procházení nalezených klientů a pro zobrazení stavu běžícího programu, pokračujeme následovně:

```sh
cd web/dash-node-explorer
npm i
npm run build
cd ../..
```

### Spuštění nástroje 

Nejprve provedeme spuštění dashcore node.

```sh
bash run_node.bash
```

Následně můžeme spustit samotný program.

```sh
python3 main.py
```

Případně můžeme spustit webovou aplikaci pro dashboard.

```sh
cd web/dash-node-explorer
npm start
```

Webová aplikace bude dostupná na adrese [localhost:3000](http://localhost:3000/).