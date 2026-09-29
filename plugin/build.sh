#!/usr/bin/env bash
# Gera build/HailLoja.jar com javac puro (mesmo padrão do MenuButtons).
# Uso: LIBS=<pasta com paper-api 1.21.4 + adventure-api/key/text-serializer-legacy,
#      examination-api, annotations, jspecify, guava, gson, joml, bungeecord-chat> ./build.sh
# (ou `mvn package`, que baixa tudo sozinho e gera target/HailLoja.jar)
set -euo pipefail
cd "$(dirname "$0")"
: "${LIBS:?defina LIBS com a pasta dos jars da API}"
JAVAC="${JAVA_HOME:+$JAVA_HOME/bin/}javac"
JAR="${JAVA_HOME:+$JAVA_HOME/bin/}jar"
SEP=":"; case "$(uname -s)" in MINGW*|MSYS*|CYGWIN*) SEP=";";; esac
CP=$(ls "$LIBS"/*.jar | tr '\n' "$SEP")
rm -rf build && mkdir -p build/classes
"$JAVAC" --release 21 -encoding UTF-8 -Xlint:-options -cp "$CP" -d build/classes $(find src/main/java -name '*.java')
cp src/main/resources/* build/classes/
"$JAR" --create --file build/HailLoja.jar -C build/classes .
echo "gerado build/HailLoja.jar"
