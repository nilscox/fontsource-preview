#!/usr/bin/env bash

set -euo pipefail

url='https://api.fontsource.org/fontlist'
dir='node_modules/@fontsource'
fonts_json='fonts.json'

count="${1:-}"

function install_fonts() {
  echo 'install fonts'

  list=($(curl "$url" | jq -r 'keys[]'))

  if [ -n "$count" ]; then
    list=("${list[@]:0:$count}")
  fi

  total="${#list[@]}"

  for i in $(seq 0 $(("$total" - 1))); do
    list["$i"]="@fontsource/${list[$i]}"
  done

  for i in $(seq 0 $(("$total" / 250))); do
    echo "$(($i * 250)) / $total"
    yarn add "${list[@]:$(($i * 250)):250}"
  done
}

function create_fonts_list() {
  echo 'create fonts list'

  fonts=$(for font in $(ls "$dir"); do cat "$dir/$font/metadata.json"; echo -n ','; done)
  fonts="[$(echo "$fonts" | sed 's/^,$//')]"
  echo "$fonts" | jq -r tostring > "$fonts_json"
}

install_fonts
create_fonts_list
