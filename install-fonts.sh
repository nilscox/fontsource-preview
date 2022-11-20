#!/usr/bin/env sh

url='https://api.fontsource.org/fontlist'
dir='node_modules/@fontsource'
output='src/fonts.ts'

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

function install_fonts() {
  list=($(curl "$url" | jq -r 'keys[]'))

  for i in $(seq 0 $(("${#list[@]}" - 1))); do
    list["$i"]="@fontsource/${list[$i]}"
  done

  yarn add "${list[@]}"
}

function create_fonts_list() {
  fonts=$(for font in $(ls "$dir"); do cat "$dir/$font/metadata.json"; echo -n ','; done)
  fonts="[$(echo "$fonts" | sed 's/^,$//')]"
  echo "$fonts" | jq -r tostring > src/fonts.json
}

function create_imports() {
  echo -n > "$output"

  for font in $(ls "$dir"); do
    json=$(cat "$dir/$font/metadata.json")

    for weight in $(echo "$json" | jq -r '.weights[]'); do
      for style in $(echo "$json" | jq -r '.styles[]'); do
        name="$font/$weight"

        if [ "$style" = 'italic' ]; then
          name="$name-italic"
        fi

        echo "import '@fontsource/$name.css';" >> "$output"
      done
    done
  done
}

function ignore_imports() {
  for import in "${ignore[@]}"; do
    sed -i "s|^import '$import';$|// \0|" "$output"
  done
}

install_fonts
create_fonts_list
create_imports
ignore_imports
