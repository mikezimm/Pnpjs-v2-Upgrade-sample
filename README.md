

## adjust these lint rules to find lots of areas of improvement:
@typescript-eslint/no-unused-vars - was 1, set to 0
'@typescript-eslint/no-explicit-any': 0,



## copied from default project
./HelpPanel
./CoreFPS
./fpsReferences
./IWebPartProps.ts
./component Copied in React component props
./component Updated React component



## additional installs
npm install @mikezimm/npmfunctions@2.1.84
npm install @pnp/sp@2.14.0 @pnp/graph@2.14.0 --save
npm install @pnp/spfx-controls-react@3.7.2 --save --save-exact
npm install @pnp/spfx-property-controls@3.6.0 --save --save-exact
npm install react-json-view@1.20.4

npm install --save-dev webpack-bundle-analyzer@3.9.0


## added 'as any' references:
Twice for this.context in main web part class
Updated the null return types in HelpPanel to be undefined per latest ESLint errors... BUT should this be reverted??