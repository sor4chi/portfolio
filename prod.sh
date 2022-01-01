exec docker-compose -f docker-compose.production.yml up -d --build
exec dockercompose -f docker-compose.production.yml run app rails db:setup