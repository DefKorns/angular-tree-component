#!/bin/bash
dist='dist'
output='/d/DATA_WINDOWS/documents/_projects/mega-app'
pkg='circlon-angular-tree-component-11.0.4.tgz'
# projects='projects'
ng build angular-tree-component
cd "$dist/angular-tree-component" || exit
npm pack

[ -f "$pkg" ] && cp -R "$pkg" "$output/$pkg"
cd ..

cd ..
