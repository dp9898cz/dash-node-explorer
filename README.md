# Platforma na monitorování uzlů v P2P síti DASH

## Projekt do předmětu BDA, VUT FIT

### Bc. Daniel Pátek

\
Tento program umožňuje zmapován všech dostupných uzlů v síti dash. Získáné informace ukládá do databáze `Mongo`. Program byl napsán v jazyce `Python 3.8`.

### Instalace

Pro spuštění programu je nutné nejprve stáhnout [`dashcore`](https://github.com/dashpay/dash/releases) ve verzi 18.0 a vyšší.
Následně nainstalovat databázi [`mongo`](https://www.mongodb.com/try/download/community).

### Spuštění

Nejprve provedeme spuštění dashcore node.

```sh
bash run_node.bash
```

Následně můžeme spustit samotný program.

```sh
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
python3 main.py
```
