import * as $ from 'jquery';
import Post from "@models/Post.js"
import '@/styles/styles.css';
import json from '@/assets/json.json';
import xml from '@/assets/data.xml';
import webpackLogo from '@/assets/22.png';

const post = new Post('Webpack post title', webpackLogo);

$('pre').addClass('code4').html(post.toString())

console.log('Post ti string', post.toString());
console.log('json - content', json);
console.log('xml - content', xml);