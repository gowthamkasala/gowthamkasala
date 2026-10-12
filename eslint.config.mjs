import parser from '@babel/eslint-parser';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import a11y from 'eslint-plugin-jsx-a11y';
import next from '@next/eslint-plugin-next';
export default [
  {ignores:['.next/**','.context/**','node_modules/**','next-env.d.ts']},
  {files:['src/**/*.{ts,tsx}'],languageOptions:{parser,parserOptions:{requireConfigFile:false,babelOptions:{plugins:[['@babel/plugin-syntax-typescript',{isTSX:true}],'@babel/plugin-syntax-jsx']},ecmaVersion:'latest',sourceType:'module'}},plugins:{react,'react-hooks':hooks,'jsx-a11y':a11y,'@next/next':next},settings:{react:{version:'detect'}},rules:{...react.configs.recommended.rules,...hooks.configs.recommended.rules,...a11y.configs.recommended.rules,...next.configs['core-web-vitals'].rules,'react/react-in-jsx-scope':'off','react/prop-types':'off'}},
  {files:['src/components/Header.tsx','src/components/Hero.tsx','src/components/Footer.tsx'],rules:{'@next/next/no-html-link-for-pages':'off'}}
];
