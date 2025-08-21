#!/bin/bash

echo "🚀 Starting Sanity CMS..."
echo

echo "📁 Installing Sanity dependencies..."
cd sanity
npm install

echo
echo "🔥 Starting Sanity Studio..."
echo "🌐 Studio will be available at: http://localhost:3333"
echo
npm run dev
