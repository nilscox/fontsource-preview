#!/usr/bin/env bash

set -euo pipefail

PATH="/usr/local/bin:$PATH"

url='https://api.fontsource.org/fontlist'
dir='node_modules/@fontsource'
fonts_json='src/fonts.json'
fonts_ts='src/fonts.ts'

count=''
skip=''

ignore=(
  '@fontsource/andada/400.css'
  '@fontsource/clear-sans/100-italic.css'
  '@fontsource/clear-sans/300-italic.css'
  '@fontsource/open-sauce-sans/900-italic.css'
  '@fontsource/pushster/400.css'
  '@fontsource/stix-two-math/400.css'
  '@fontsource/bona-nova/700-italic.css'
  '@fontsource/cardo/700-italic.css'
  '@fontsource/gudea/700-italic.css'
  '@fontsource/judson/700-italic.css'
  '@fontsource/lekton/700-italic.css'
  '@fontsource/libre-baskerville/700-italic.css'
  '@fontsource/libre-caslon-text/700-italic.css'
  '@fontsource/neuton/200-italic.css'
  '@fontsource/neuton/300-italic.css'
  '@fontsource/neuton/700-italic.css'
  '@fontsource/neuton/800-italic.css'
  '@fontsource/old-standard-tt/700-italic.css'
  '@fontsource/open-sans-condensed/700-italic.css'
  '@fontsource/titillium-web/900-italic.css'
  '@fontsource/trochut/700-italic.css'
)

while [ "$#" -gt 0 ]; do
  case "$1" in
    -h|--help)
      echo "usage: $0 [options]"
      echo
      echo "options:"
      echo "  -h | --help         show this help and exit"
      echo "  -s | --slim         install a subset of all the fonts"
      echo "  -c | --count <n>    install the first n fonts"
      echo "  -s | --skip <step>  skip some steps"
      exit 0;;

    -s|--slim)
      count=25
      shift;;

    -c|--count)
      count="$2"
      shift; shift;;

    -s|--skip)
      skip="$2"
      shift; shift;;

    *)
      echo "unknown option \"$1\""
      shift;;
  esac
done

function install_fonts() {
  echo 'install fonts'

  list=($(curl "$url" | jq -r 'keys[]'))

  if [ -n "$count" ]; then
    list=("${list[@]:0:$count}" clear-sans roboto)
  fi

  for i in $(seq 0 $(("${#list[@]}" - 1))); do
    list["$i"]="@fontsource/${list[$i]}"
  done

  yarn add "${list[@]}"
}

function create_fonts_list() {
  echo 'create fonts list'

  fonts=$(for font in $(ls "$dir"); do cat "$dir/$font/metadata.json"; echo -n ','; done)
  fonts="[$(echo "$fonts" | sed 's/^,$//')]"
  echo "$fonts" | jq -r tostring > "$fonts_json"
}

function create_imports() {
  echo 'create imports'

  echo -n > "$fonts_ts"

  for font in $(ls "$dir"); do
    json=$(cat "$dir/$font/metadata.json")

    for weight in $(echo "$json" | jq -r '.weights[]'); do
      for style in $(echo "$json" | jq -r '.styles[]'); do
        name="$font/$weight"

        if [ "$style" = 'italic' ]; then
          name="$name-italic"
        fi

        echo "import '@fontsource/$name.css';" >> "$fonts_ts"
      done
    done
  done
}

function ignore_imports() {
  echo 'ignore imports'

  for import in "${ignore[@]}"; do
    sed -i "s|^import '$import';$|// \0|" "$fonts_ts"
  done
}

[[ "$skip" != *install_fonts* ]] && install_fonts
[[ "$skip" != *create_fonts_list* ]] && create_fonts_list
[[ "$skip" != *create_imports* ]] && create_imports
[[ "$skip" != *ignore_imports* ]] && ignore_imports
